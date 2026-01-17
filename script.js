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
/* =========================================
   ADD THIS TO THE BOTTOM OF YOUR SCRIPT.JS
   ========================================= */

// --- FEATURE 2: GENERATED SOUND EFFECTS (No files needed) ---
// We use the Web Audio API to create beeps so you don't need .mp3 files
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume(); // Wake up audio engine
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'hover') {
        // High pitched short blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'click') {
        // Lower mechanical "clack"
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }
}

// Attach sounds to all buttons and links
const interactiveElements = document.querySelectorAll('button, a, .report-row');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => playSound('hover'));
    el.addEventListener('click', () => playSound('click'));
});


// --- FEATURE 3: WASD KONAMI CODE ---
// Sequence: W, W, S, S, A, D, A, D, B, A
const cheatCode = ['w', 'w', 'a', 'a', 's', 's', 'd', 'd'];
let cheatProgress = 0;

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    // Check if key matches the next required key in sequence
    if (key === cheatCode[cheatProgress]) {
        cheatProgress++;
        
        // If complete
        if (cheatProgress === cheatCode.length) {
            activateGodMode();
            cheatProgress = 0; // Reset
        }
    } else {
        cheatProgress = 0; // Reset if wrong key
    }
});

function activateGodMode() {
    playSound('click'); 
    document.body.classList.toggle('god-mode'); 
    
    const cmdLine = document.querySelector('.cmd-line');
    const isGod = document.body.classList.contains('god-mode');

    if(isGod) {
        alert(">> SYSTEM OVERRIDE: GOD MODE ACTIVATED");
        if(cmdLine) cmdLine.innerText = ">> ROOT_ACCESS_GRANTED";
        
        // START THE RAIN
        if(matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 50);

    } else {
        if(cmdLine) cmdLine.innerText = ">> USER_MODE_RESTORED";
        
        // STOP THE RAIN
        clearInterval(matrixInterval);
        ctx.clearRect(0,0,canvas.width, canvas.height); // Clear screen
    }
}


// --- FEATURE 4: LIVE SYSTEM STATS ---
function updateSystemStats() {
    // 1. Time Update
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('sys-time').innerText = `TIME: ${timeString}`;

    // 2. Battery Update (Check if API is supported)
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const level = Math.floor(battery.level * 100);
            const charging = battery.charging ? "[CHG]" : "[BAT]";
            
            // Color logic: Red if low, normal if high
            const batEl = document.getElementById('sys-battery');
            batEl.innerText = `PWR: ${level}% ${charging}`;
            
            if(level < 20 && !battery.charging) {
                batEl.style.color = 'red';
                batEl.classList.add('status-blink');
            } else {
                batEl.style.color = ''; // Reset
                batEl.classList.remove('status-blink');
            }
        });
    } else {
        document.getElementById('sys-battery').innerText = "PWR: EXTERNAL";
    }
}

// Run immediately and then every second
updateSystemStats();
setInterval(updateSystemStats, 1000);

/* --- MATRIX RAIN LOGIC --- */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to rain down (Binary + Katakana + Hacker text)
const matrixChars = "010101XYZ<>/\\|ELAX_DEV";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for(let x = 0; x < columns; x++) drops[x] = 1;

let matrixInterval;

function drawMatrix() {
    // Semi-transparent black to create "trail" effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color (Cyan for God Mode)
    ctx.fillStyle = "#00ffff"; 
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
