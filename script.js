document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HIỆU ỨNG BOOT LOADER (LOADING SCREEN) ---
    const bootLogs = [
        "LOADING ELAX_OS_KERNEL...",
        "MOUNTING VIRTUAL_DRIVE/PROJECTS...",
        "INITIALIZING GRAPHICS_ADAPTER...",
        "ESTABLISHING SECURE_CONNECTION...",
        "LOADING SKILLS_MODULE...",
        "SYSTEM CHECK: OK",
        "ACCESS GRANTED: WELCOME TO MY E-PORTFOLIO"
    ];
    
    const logContainer = document.getElementById('boot-log');
    const progressBar = document.getElementById('boot-fill');
    const percentText = document.getElementById('boot-percent');
    const loader = document.getElementById('boot-loader');
    
    let progress = 0;
    let logIndex = 0;

    function addLog(text) {
        const line = document.createElement('div');
        line.style.marginBottom = "4px";
        line.innerText = `> ${text}`;
        logContainer.appendChild(line);
    }

    // Giả lập tiến trình tải
    const bootInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2; 
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(bootInterval);
            
            // Hiện log cuối và tắt loader
            addLog(bootLogs[bootLogs.length - 1]);
            setTimeout(() => {
                loader.classList.add('loaded-complete');
                setTimeout(() => loader.remove(), 600);
            }, 800);
        }
        
        progressBar.style.width = `${progress}%`;
        percentText.innerText = `${progress}%`;

        // Đẩy log ra màn hình dựa theo %
        const triggerPoint = Math.floor(100 / bootLogs.length);
        if (progress > (logIndex * triggerPoint) && logIndex < bootLogs.length - 1) {
            addLog(bootLogs[logIndex]);
            logIndex++;
        }
    }, 120);


    // --- 2. LOGIC CHUYỂN ĐỔI NGÔN NGỮ ---
    const langBtn = document.getElementById('lang-toggle');
    const body = document.body;

    langBtn.addEventListener('click', () => {
        if (body.classList.contains('lang-vi')) {
            // Sang English
            body.classList.remove('lang-vi');
            body.classList.add('lang-en');
            langBtn.textContent = 'MODE: EN';
        } else {
            // Sang Tiếng Việt
            body.classList.remove('lang-en');
            body.classList.add('lang-vi');
            langBtn.textContent = 'MODE: VI';
        }
        
        // Hiệu ứng "glitch" nhẹ khi chuyển vùng dữ liệu
        body.style.filter = 'invert(1)';
        setTimeout(() => {
            body.style.filter = 'none';
        }, 80);
    });

    // --- 3. CONSOLE LOG TRICK (Dành cho nhà tuyển dụng xem Inspect Element) ---
    console.log("%c SYSTEM ACCESS: DO NGOC THIEN BAO ", "background: #00ff41; color: #000; font-weight: bold;");
    console.log("Status: Looking for new challenges.");
});
