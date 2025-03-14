document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor(x, y, size, color, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.velocityX = -this.velocityX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.velocityY = -this.velocityY;
            }

            this.x += this.velocityX;
            this.y += this.velocityY;

            this.draw();
        }
    }

    function init() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * (canvas.width - size * 2) + size;
            const y = Math.random() * (canvas.height - size * 2) + size;
            const color = '#000000'; 
            const velocityX = (Math.random() - 0.5) * 2;
            const velocityY = (Math.random() - 0.5) * 2;

            particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
});

document.addEventListener('wheel', function (event) {
    if (!document.getElementById('intro').classList.contains('hidden')) {
        event.preventDefault();
    }
}, { passive: false });

document.body.classList.add('intro-active');
function openWeb() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
    document.getElementById('content').classList.add('visible');
    document.body.classList.remove('intro-active');
    window.scrollTo(0, 0); 
    document.getElementById('audio').play();
    document.getElementById('music-icon').classList.add('rotate');
}

function updateTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = now.toLocaleTimeString('id-ID', options);
    document.getElementById('time').textContent = timeString;

    const clock = document.getElementById('clock');
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    clock.style.backgroundColor = randomColor;
}

setInterval(updateTime, 1000);
updateTime();

function toggleMusic() {
    const audio = document.getElementById('audio');
    const icon = document.getElementById('music-icon');
    if (audio.paused) {
        audio.play();
        icon.classList.add('rotate');
    } else {
        audio.pause();
        icon.classList.remove('rotate');
    }
}


document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            section.classList.add('visible');
        }
    });

    const footerTop = footer.getBoundingClientRect().top;
    const footerBottom = footer.getBoundingClientRect().bottom;

    if (footerTop < window.innerHeight && footerBottom > 0) {
        footer.classList.add('visible');
    }
});