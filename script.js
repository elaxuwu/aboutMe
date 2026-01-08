document.addEventListener('DOMContentLoaded', () => {
    // --- 1. BOOT SEQUENCE ---
    const logData = [
        "LOADING ELAX_OS_KERNEL...",
        "MOUNTING VIRTUAL_DRIVE/PROJECTS...",
        "INITIALIZING GRAPHICS_ADAPTER...",
        "ESTABLISHING SECURE_CONNECTION...",
        "LOADING SKILLS_MODULE...",
        "SYSTEM CHECK: OK",
        "ACCESS GRANTED: WELCOME ADMINISTRATOR"
    ];
    
    const logBox = document.getElementById('boot-log');
    const fill = document.getElementById('boot-fill');
    const percent = document.getElementById('boot-percent');
    const loader = document.getElementById('boot-loader');
    
    let p = 0;
    let lIndex = 0;

    const interval = setInterval(() => {
        p += Math.floor(Math.random() * 7) + 2;
        if (p > 100) p = 100;
        
        fill.style.width = p + "%";
        percent.innerText = p + "%";

        if (p > (lIndex * 15) && lIndex < logData.length) {
            const line = document.createElement('div');
            line.innerText = "> " + logData[lIndex];
            logBox.appendChild(line);
            lIndex++;
        }

        if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loaded-complete');
                setTimeout(() => loader.remove(), 800);
                // Bắt đầu gõ chữ slogan sau khi boot xong
                typeWriterEffect(); 
            }, 500);
        }
    }, 100);

    // --- 2. LANGUAGE SWITCHER ---
    const langBtn = document.getElementById('lang-toggle');
    const body = document.body;

    langBtn.addEventListener('click', () => {
        if (body.classList.contains('lang-en')) {
            body.classList.replace('lang-en', 'lang-vi');
            langBtn.innerText = "MODE: VI";
        } else {
            body.classList.replace('lang-vi', 'lang-en');
            langBtn.innerText = "MODE: EN";
        }
        // System flash effect
        body.style.opacity = "0.7";
        setTimeout(() => body.style.opacity = "1", 50);
        
        // Gõ lại slogan khi đổi ngôn ngữ
        typeWriterEffect();
    });

    // --- 3. NEW: MOUSE GLOW FOLLOWER ---
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // --- 4. NEW: SCROLL REVEAL ANIMATION ---
    const hiddenElements = document.querySelectorAll('.hidden-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, { threshold: 0.1 }); // Hiện khi thấy 10%

    hiddenElements.forEach((el) => observer.observe(el));

    // --- 5. NEW: TYPEWRITER EFFECT FOR SLOGAN ---
    function typeWriterEffect() {
        const isEnglish = body.classList.contains('lang-en');
        const targetClass = isEnglish ? '.content-en' : '.content-vi';
        const sloganElement = document.querySelector(`.slogan-box ${targetClass}`);
        
        if (!sloganElement) return;

        // Reset text
        const fullText = sloganElement.getAttribute('data-type');
        sloganElement.innerText = ''; 
        sloganElement.style.display = 'inline'; // Đảm bảo nó hiện ra để gõ

        let i = 0;
        function type() {
            if (i < fullText.length) {
                sloganElement.innerText += fullText.charAt(i);
                i++;
                setTimeout(type, 50); // Tốc độ gõ
            }
        }
        type();
    }
});
