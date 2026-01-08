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

    // --- 3. MOUSE GLOW FOLLOWER ---
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // --- 4. SCROLL REVEAL ANIMATION ---
    const hiddenElements = document.querySelectorAll('.hidden-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, { threshold: 0.1 }); 

    hiddenElements.forEach((el) => observer.observe(el));

    // --- 5. FIXED: TYPEWRITER EFFECT (LOGIC MỚI) ---
    // Khai báo biến toàn cục để kiểm soát timeout
    let typingTimeout; 

    function typeWriterEffect() {
        const sloganElement = document.getElementById('slogan-text');
        
        if (!sloganElement) return;
        
        const isEnglish = document.body.classList.contains('lang-en');
        
        // Nội dung slogan
        const textVi = '"Không có đường tắt nào dẫn đến thành công."';
        const textEn = '"There\'s no shortcut to success."';
        
        const textToType = isEnglish ? textEn : textVi;
        
        // 1. Dừng ngay lập tức việc gõ cũ nếu có (Fix lỗi dính chữ)
        if (typingTimeout) clearTimeout(typingTimeout);
        
        // 2. Xóa sạch chữ cũ
        sloganElement.innerText = '';
        
        // 3. Chạy hàm đệ quy mới
        let i = 0;
        function type() {
            if (i < textToType.length) {
                sloganElement.innerText += textToType.charAt(i);
                i++;
                // Gán timeout vào biến toàn cục để có thể clear sau này
                typingTimeout = setTimeout(type, 50); 
            }
        }
        
        type();
    }
});

// --- 6. REPORT PAGE LOGIC (TOGGLE DETAILS) ---
function toggleDetail(element) {
    // 1. Toggle class active cho dòng được click
    element.classList.toggle('active');

    // 2. Tìm dòng detail ngay phía sau nó
    const detailRow = element.nextElementSibling;

    if (detailRow.style.maxHeight) {
        // Nếu đang mở thì đóng lại
        detailRow.style.maxHeight = null;
    } else {
        // Nếu đang đóng thì mở ra (gán chiều cao bằng chiều cao nội dung)
        detailRow.style.maxHeight = detailRow.scrollHeight + "px";
    }
}
