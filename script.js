// Preloader
window.addEventListener('load', function() {
    document.querySelector('.preloader').classList.add('fade');
});

// Theme Toggle
document.querySelector('.theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    updateChartTheme();
});

// Load theme from localStorage
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Mobile Navigation
document.querySelector('.toggle').addEventListener('click', function() {
    const header = document.querySelector('header');
    header.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('header').classList.remove('active');
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', function() {
    cursor.classList.add('grow');
});

document.addEventListener('mouseup', function() {
    cursor.classList.remove('grow');
});

// Hover effect for links and buttons
const links = document.querySelectorAll('a, button, .skill-item');

links.forEach(link => {
    link.addEventListener('mouseenter', function() {
        cursor.classList.add('grow');
    });
    
    link.addEventListener('mouseleave', function() {
        cursor.classList.remove('grow');
    });
});

// Scroll Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal();

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project Filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const tags = card.getAttribute('data-tags').split(',');
            if (filter === 'all' || tags.includes(filter)) {
                card.style.display = 'block';
                gsap.to(card, { opacity: 1, y: 0, duration: 0.5 });
            } else {
                gsap.to(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    onComplete: () => { card.style.display = 'none'; }
                });
            }
        });
    });
});

// Skills Radar Chart with Debugging
let skillsChart;

function initializeChart() {
    const canvas = document.getElementById('skills-chart');
    if (!canvas) {
        return;
    }

    if (typeof Chart === 'undefined') {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (document.body.classList.contains('light-theme')) {
        gradient.addColorStop(0, 'rgba(0, 102, 204, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 102, 204, 0.1)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 102, 102, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 102, 102, 0.1)');
    }

    skillsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Wireshark', 'Steghide', 'AutoPy', 'Burp Suite', 'Metasploit', 'Nmap', 'Nessus', 'Python'],
            datasets: [{
                label: 'Proficiency',
                data: [95, 85, 75, 80, 85, 90, 80, 90],
                backgroundColor: gradient,
                borderColor: getThemeColor('borderColor'),
                pointBackgroundColor: getThemeColor('pointBackgroundColor'),
                pointBorderColor: getThemeColor('pointBorderColor'),
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: getThemeColor('pointHoverBackgroundColor'),
                borderWidth: 3
            }]
        },
        options: {
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        color: getThemeColor('tickColor'),
                        font: {
                            size: 12,
                            family: "'Segoe UI', sans-serif"
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            family: "'Segoe UI', sans-serif",
                            weight: '500'
                        },
                        color: getThemeColor('pointLabelColor')
                    },
                    grid: {
                        color: getThemeColor('gridColor'),
                        lineWidth: 1
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "'Segoe UI', sans-serif",
                            size: 14
                        },
                        color: getThemeColor('legendColor')
                    }
                }
            },
            elements: {
                line: { tension: 0.3 },
                point: {
                    hoverRadius: 8,
                    hoverBorderWidth: 3
                }
            }
        }
    });
}

function getThemeColor(type) {
    const isLightTheme = document.body.classList.contains('light-theme');
    const colors = {
        borderColor: isLightTheme ? '#0066cc' : '#ff6666',
        pointBackgroundColor: isLightTheme ? '#ffffff' : '#ffffff',
        pointBorderColor: isLightTheme ? '#0066cc' : '#cc0000',
        pointHoverBackgroundColor: isLightTheme ? '#0066cc' : '#ff6666',
        tickColor: isLightTheme ? '#333333' : 'rgba(255, 255, 255, 0.7)',
        pointLabelColor: isLightTheme ? '#333333' : 'rgba(255, 102, 102, 0.9)',
        gridColor: isLightTheme ? 'rgba(51, 51, 51, 0.2)' : 'rgba(255, 102, 102, 0.2)',
        legendColor: isLightTheme ? '#333333' : '#ffffff'
    };
    return colors[type];
}

function updateChartTheme() {
    if (skillsChart) {
        const ctx = skillsChart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        if (document.body.classList.contains('light-theme')) {
            gradient.addColorStop(0, 'rgba(0, 102, 204, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 102, 204, 0.1)');
        } else {
            gradient.addColorStop(0, 'rgba(255, 102, 102, 0.4)');
            gradient.addColorStop(1, 'rgba(255, 102, 102, 0.1)');
        }

        skillsChart.data.datasets[0].backgroundColor = gradient;
        skillsChart.data.datasets[0].borderColor = getThemeColor('borderColor');
        skillsChart.data.datasets[0].pointBackgroundColor = getThemeColor('pointBackgroundColor');
        skillsChart.data.datasets[0].pointBorderColor = getThemeColor('pointBorderColor');
        skillsChart.data.datasets[0].pointHoverBackgroundColor = getThemeColor('pointHoverBackgroundColor');
        skillsChart.options.scales.r.ticks.color = getThemeColor('tickColor');
        skillsChart.options.scales.r.pointLabels.color = getThemeColor('pointLabelColor');
        skillsChart.options.scales.r.grid.color = getThemeColor('gridColor');
        skillsChart.options.plugins.legend.labels.color = getThemeColor('legendColor');
        skillsChart.update();
    } else {
        initializeChart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
});

document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.dispatchEvent(new Event('themeChange'));
});

document.body.addEventListener('themeChange', updateChartTheme);

// Form Submission with Security
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const csrfToken = document.getElementById('csrfToken').value;
    
    if (!name || !email || !subject || !message) {
        alert('All fields are required.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const sanitizeInput = (input) => {
        return input.replace(/[<>]/g, '');
    };
    
    const sanitizedData = {
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        subject: sanitizeInput(subject),
        message: sanitizeInput(message),
        csrfToken
    };
    
    try {
        this.reset();
        alert('Thank you for your message! I will get back to you soon.');
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
});

document.getElementById('csrfToken').value = Math.random().toString(36).substring(2, 15);

// Code Flowing Animation
const canvas = document.getElementById('code-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const codeSnippets = ['0', '1', '{ }', 'if()', 'else', 'while()', 'function', '//', '/* */', 'var', 'let', 'const'];
const codes = [];

class Code {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.fontSize = Math.random() * 20 + 14;
    }

    draw() {
        ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(204, 0, 0, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }

    update() {
        this.y -= this.speed;
        this.opacity -= 0.002;
        if (this.y < -20 || this.opacity <= 0) {
            this.y = canvas.height + Math.random() * 100;
            this.x = Math.random() * canvas.width;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.speed = Math.random() * 2 + 1;
        }
        this.draw();
    }
}

function initCodes() {
    const count = Math.floor(window.innerWidth / 20);
    for (let i = 0; i < count; i++) {
        codes.push(new Code());
    }
}

initCodes();

function animateCodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    codes.forEach(code => code.update());
    requestAnimationFrame(animateCodes);
}

animateCodes();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    codes.length = 0;
    initCodes();
});

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    codes.forEach(code => {
        const dx = code.x - mouseX;
        const dy = code.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            gsap.to(code, {
                duration: 0.5,
                x: code.x + (dx / distance) * 50,
                y: code.y + (dy / distance) * 50,
                ease: 'power2.out'
            });
        } else {
            gsap.to(code, {
                duration: 0.5,
                x: code.x,
                y: code.y,
                ease: 'power2.out'
            });
        }
    });
});

const projectCards = document.querySelectorAll('.project-card');
const aboutContainer = document.querySelector('.about-container');
const timelineItems = document.querySelectorAll('.timeline-item');

function updateParallax() {
    if (window.innerWidth <= 991) return;

    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollY = window.scrollY;
            const cardCenterY = rect.top + rect.height / 2;
            const offsetY = (cardCenterY - windowHeight / 2) / windowHeight;
            
            const rotateX = offsetY * 10;
            const rotateY = (mouseX - window.innerWidth / 2) / window.innerWidth * 10;
            const translateZ = -Math.abs(offsetY) * 30;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        }
    });

    if (aboutContainer) {
        const rect = aboutContainer.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const offsetY = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
            const rotateX = offsetY * 5;
            const translateZ = -Math.abs(offsetY) * 20;
            aboutContainer.style.transform = `rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
        }
    }

    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const offsetY = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
            const rotateX = offsetY * 5;
            const translateZ = -Math.abs(offsetY) * 20;
            item.style.transform = `rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
        }
    });

    requestAnimationFrame(updateParallax);
}

updateParallax();

window.addEventListener('scroll', updateParallax);
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateParallax();
});

document.queryAll('[data-track]').forEach(element => {
    element.addEventListener('click', function() {
        const eventName = this.getAttribute('data-track');
        console.log(`Tracked event: ${eventName}`);
    });
});
