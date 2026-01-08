document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('lang-toggle');
    const body = document.body;

    btn.addEventListener('click', () => {
        if (body.classList.contains('lang-vi')) {
            body.classList.replace('lang-vi', 'lang-en');
            btn.textContent = 'MODE: EN';
        } else {
            body.classList.replace('lang-en', 'lang-vi');
            btn.textContent = 'MODE: VI';
        }
        
        // Hiệu ứng nháy nhẹ khi chuyển đổi hệ thống
        body.style.opacity = '0.5';
        setTimeout(() => body.style.opacity = '1', 100);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // --- BOOT SEQUENCE LOGIC ---
    const logs = [
        "INITIALIZING_KERNEL...",
        "MOUNTING_FILE_SYSTEM...",
        "LOADING_ASSETS...",
        "CHECKING_INTEGRITY...",
        "CONNECTING_TO_SERVER...",
        "DECRYPTING_PROFILE...",
        "ACCESS_GRANTED."
    ];
    
    const logContainer = document.getElementById('boot-log');
    const progressBar = document.getElementById('boot-fill');
    const percentText = document.getElementById('boot-percent');
    const loader = document.getElementById('boot-loader');
    
    let progress = 0;
    let logIndex = 0;

    // Hàm tạo dòng log mới
    function addLog(text) {
        const p = document.createElement('div');
        p.className = 'log-line';
        p.innerText = `>> ${text}`;
        logContainer.appendChild(p);
    }

    // Chạy giả lập loading
    const interval = setInterval(() => {
        // Tăng phần trăm ngẫu nhiên
        progress += Math.floor(Math.random() * 10) + 2; 
        
        if (progress > 100) progress = 100;
        
        // Cập nhật thanh bar và số %
        progressBar.style.width = `${progress}%`;
        percentText.innerText = `${progress}%`;

        // Logic hiện text log dựa trên %
        if (progress > 15 && logIndex === 0) { addLog(logs[0]); logIndex++; }
        if (progress > 30 && logIndex === 1) { addLog(logs[1]); logIndex++; }
        if (progress > 45 && logIndex === 2) { addLog(logs[2]); logIndex++; }
        if (progress > 60 && logIndex === 3) { addLog(logs[3]); logIndex++; }
        if (progress > 75 && logIndex === 4) { addLog(logs[4]); logIndex++; }
        if (progress > 90 && logIndex === 5) { addLog(logs[5]); logIndex++; }
        if (progress === 100 && logIndex === 6) { addLog(logs[6]); logIndex++; }

        // Kết thúc loading
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loaded-complete');
                // Xóa loader khỏi DOM sau khi animation fade-out xong để nhẹ web
                setTimeout(() => loader.remove(), 500); 
            }, 500); // Dừng 0.5s ở 100% rồi mới ẩn
        }
    }, 150); // Tốc độ chạy (càng nhỏ càng nhanh)
    
    
    // --- (GIỮ NGUYÊN CODE CHUYỂN NGÔN NGỮ CŨ CỦA BẠN Ở DƯỚI) ---
    const btn = document.getElementById('lang-toggle');
    // ... code cũ ...
});
