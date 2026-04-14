// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// 滚动渐显效果
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

function checkScroll() {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 按钮悬停效果
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 卡片悬停效果
const cards = document.querySelectorAll('.value-card, .feature-item, .scenario-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 页面加载动画
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('fade-in');
});

// 响应式导航
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

function toggleNav() {
    if (window.innerWidth <= 768) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.marginTop = '15px';
        navLinks.style.marginBottom = '15px';
        navButtons.style.width = '100%';
        navButtons.style.justifyContent = 'space-between';
    } else {
        navLinks.style.flexDirection = 'row';
        navLinks.style.marginTop = '0';
        navLinks.style.marginBottom = '0';
        navButtons.style.width = 'auto';
        navButtons.style.justifyContent = 'flex-end';
    }
}

window.addEventListener('resize', toggleNav);
window.addEventListener('load', toggleNav);