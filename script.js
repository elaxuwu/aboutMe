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
