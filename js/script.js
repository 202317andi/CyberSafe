// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initThemeToggle();
    initAccessibility();
    initContactForm();
    initPasswordChecker();
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// ===== BOTÃO DE TEMA =====
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn ? themeBtn.querySelector('.material-icons') : null;

    if (!themeBtn) return;

    // Carrega o tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Clique no botão de tema
    themeBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Função para aplicar o tema
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
    }
}

// ===== BOTÃO DE ACESSIBILIDADE =====
function initAccessibility() {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    
    if (!accessibilityBtn) return;

    let currentSize = 'normal'; // normal, large, extra-large
    
    // Carrega o tamanho salvo
    const savedSize = localStorage.getItem('font-size') || 'normal';
    applyFontSize(savedSize);

    // Clique no botão de acessibilidade
    accessibilityBtn.addEventListener('click', function() {
        const sizes = ['normal', 'large', 'extra-large'];
        const currentIndex = sizes.indexOf(currentSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        applyFontSize(sizes[nextIndex]);
    });

    // Função para aplicar tamanho da fonte
    function applyFontSize(size) {
        // Remove classes anteriores
        document.body.classList.remove('font-normal', 'font-large', 'font-extra-large');
        
        // Adiciona nova classe
        document.body.classList.add('font-' + size);
        
        currentSize = size;
        localStorage.setItem('font-size', size);
    }
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    // Evento de envio do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão
        
        // Mostra o alerta conforme solicitado no trabalho
        alert('Página em construção');
        
        // Opcional: resetar o formulário
        // contactForm.reset();
    });
}

// ===== VERIFICADOR DE SENHA =====
function initPasswordChecker() {
    const passwordInput = document.getElementById('password-input');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.getElementById('strength-text');

    if (!passwordInput || !strengthFill) return;

    // Evento de digitação na senha
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        updateStrengthBar(strength, password.length);
    });

    // Função para verificar a força da senha
    function checkPasswordStrength(password) {
        let score = 0;
        
        if (password.length === 0) return 0;
        
        // Critérios básicos
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[a-z]/.test(password)) score += 1; // letra minúscula
        if (/[A-Z]/.test(password)) score += 1; // letra maiúscula
        if (/[0-9]/.test(password)) score += 1; // número
        if (/[^A-Za-z0-9]/.test(password)) score += 1; // símbolo
        
        return Math.min(score, 5);
    }

    // Função para atualizar a barra de força
    function updateStrengthBar(strength, length) {
        const colors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];
        const texts = ['Muito fraca', 'Fraca', 'Regular', 'Forte', 'Muito forte'];
        const widths = ['20%', '40%', '60%', '80%', '100%'];
        
        if (length === 0) {
            strengthFill.style.width = '0%';
            strengthFill.style.backgroundColor = '#e5e7eb';
            if (strengthText) strengthText.textContent = 'Digite uma senha';
            return;
        }
        
        const index = Math.max(0, strength - 1);
        strengthFill.style.width = widths[index];
        strengthFill.style.backgroundColor = colors[index];
        if (strengthText) strengthText.textContent = texts[index];
    }
}

// ===== SCROLL SUAVE =====
// Adiciona scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = 80; // altura do header fixo
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMAÇÕES SIMPLES =====
// Adiciona uma animação de entrada básica aos cards
function addScrollAnimation() {
    const cards = document.querySelectorAll('.feature-card, .tip-card, .team-member');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Inicializa as animações
addScrollAnimation();

// ===== UTILITÁRIOS =====

// Função para mostrar alertas (versão simples)
function showAlert(message, type = 'info') {
    // Cria um alerta simples
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 9999;
        box-shadow: var(--shadow);
    `;
    
    if (type === 'success') {
        alertDiv.style.background = 'var(--success-color)';
    } else if (type === 'error') {
        alertDiv.style.background = 'var(--danger-color)';
    }
    
    document.body.appendChild(alertDiv);
    
    // Remove após 3 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Console log para desenvolvimento
console.log('🛡️ CyberSafe carregado com sucesso!');
console.log('✅ Menu mobile: OK');
console.log('✅ Tema claro/escuro: OK');
console.log('✅ Acessibilidade: OK');
console.log('✅ Formulário: OK');
console.log('✅ Verificador de senha: OK');