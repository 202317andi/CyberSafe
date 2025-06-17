// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    iniciarTema();
    iniciarMenuMobile();
    iniciarFormularioContato();
    iniciarVerificadorSenha();
    iniciarScrollSuave();
});

// TEMA SIMPLES E FUNCIONAL
function iniciarTema() {
    const botaoTema = document.getElementById('botao-tema');
    const icone = botaoTema ? botaoTema.querySelector('.material-icons') : null;

    // Verifica tema salvo ao carregar
    const temaSalvo = localStorage.getItem('tema-cybersafe');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('modo-escuro');
        if (icone) icone.textContent = 'light_mode';
    } else {
        document.body.classList.remove('modo-escuro');
        if (icone) icone.textContent = 'dark_mode';
    }

    // Clique no botão
    if (botaoTema) {
        botaoTema.addEventListener('click', function() {
            if (document.body.classList.contains('modo-escuro')) {
                // Volta para claro
                document.body.classList.remove('modo-escuro');
                localStorage.setItem('tema-cybersafe', 'claro');
                if (icone) icone.textContent = 'dark_mode';
            } else {
                // Vai para escuro
                document.body.classList.add('modo-escuro');
                localStorage.setItem('tema-cybersafe', 'escuro');
                if (icone) icone.textContent = 'light_mode';
            }
        });
    }
}

// MENU MOBILE
function iniciarMenuMobile() {
    const menuMobile = document.getElementById('menu-mobile');
    const linksNavegacao = document.querySelector('.links-navegacao');

    if (menuMobile && linksNavegacao) {
        menuMobile.addEventListener('click', function() {
            linksNavegacao.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        const links = linksNavegacao.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                linksNavegacao.classList.remove('active');
            });
        });
    }
}

// FORMULÁRIO DE CONTATO
function iniciarFormularioContato() {
    const formulario = document.getElementById('formulario-contato');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pela mensagem! Este é um projeto acadêmico.');
        });
    }
}

// VERIFICADOR DE SENHA
function iniciarVerificadorSenha() {
    const entradaSenha = document.getElementById('entrada-senha');
    const barraForca = document.querySelector('.preenchimento-forca');
    const textoForca = document.getElementById('texto-forca');

    if (entradaSenha && barraForca) {
        entradaSenha.addEventListener('input', function() {
            const senha = this.value;
            let nivel = 0;
            
            if (senha.length === 0) {
                barraForca.style.width = '0%';
                if (textoForca) textoForca.textContent = 'Digite uma senha';
                return;
            }
            
            // Critérios de força
            if (senha.length >= 6) nivel = 1;
            if (senha.length >= 8) nivel = 2;
            if (senha.length >= 10 && /[0-9]/.test(senha)) nivel = 3;
            if (senha.length >= 12 && /[A-Z]/.test(senha) && /[0-9]/.test(senha)) nivel = 4;
            
            const larguras = ['20%', '40%', '60%', '80%', '100%'];
            const cores = ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#198754'];
            const textos = ['Muito fraca', 'Fraca', 'Regular', 'Forte', 'Muito forte'];
            
            if (nivel > 0) {
                barraForca.style.width = larguras[nivel - 1];
                barraForca.style.backgroundColor = cores[nivel - 1];
                if (textoForca) textoForca.textContent = textos[nivel - 1];
            }
        });
    }
}

// SCROLL SUAVE
function iniciarScrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const alvo = document.querySelector(href);
            
            if (alvo) {
                alvo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

console.log('CyberSafe carregado!');