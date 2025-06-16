// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa as funcionalidades básicas
    iniciarMenuMobile();
    iniciarAlternadorTema();
    iniciarAcessibilidade();
    iniciarFormularioContato();
    iniciarVerificadorSenha();
    iniciarScrollSuave();
});

//MENU MOBILE
function iniciarMenuMobile() {
    const menuMobile = document.getElementById('menu-mobile');
    const linksNavegacao = document.querySelector('.links-navegacao');

    if (menuMobile && linksNavegacao) {
        menuMobile.addEventListener('click', function() {
            linksNavegacao.classList.toggle('active');
            menuMobile.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        const links = linksNavegacao.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                linksNavegacao.classList.remove('active');
                menuMobile.classList.remove('active');
            });
        });
    }
}

//BOTÃO DE TEMA 
function iniciarAlternadorTema() {
    const botaoTema = document.getElementById('botao-tema');
    const iconeTeam = botaoTema ? botaoTema.querySelector('.material-icons') : null;

    if (!botaoTema) return;

    // Tema padrão é claro
    let temaAtual = 'claro';

    // Clique no botão de tema
    botaoTema.addEventListener('click', function() {
        if (temaAtual === 'claro') {
            document.documentElement.setAttribute('data-theme', 'dark');
            temaAtual = 'escuro';
            if (iconeTeam) {
                iconeTeam.textContent = 'light_mode';
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            temaAtual = 'claro';
            if (iconeTeam) {
                iconeTeam.textContent = 'dark_mode';
            }
        }
    });
}

//BOTÃO DE ACESSIBILIDADE
function iniciarAcessibilidade() {
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    
    if (!botaoAcessibilidade) return;

    let tamanhoAtual = 'normal';
    
    // Clique no botão de acessibilidade
    botaoAcessibilidade.addEventListener('click', function() {
        // Remove classes anteriores
        document.body.classList.remove('fonte-normal', 'fonte-grande', 'fonte-extra-grande');
        
        // Ciclo entre tamanhos
        if (tamanhoAtual === 'normal') {
            document.body.classList.add('fonte-grande');
            tamanhoAtual = 'grande';
        } else if (tamanhoAtual === 'grande') {
            document.body.classList.add('fonte-extra-grande');
            tamanhoAtual = 'extra-grande';
        } else {
            document.body.classList.add('fonte-normal');
            tamanhoAtual = 'normal';
        }
    });
}

//FORMULÁRIO DE CONTATO
function iniciarFormularioContato() {
    const formularioContato = document.getElementById('formulario-contato');
    
    if (!formularioContato) return;

    // Envio do formulário
    formularioContato.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão
        
        // Mostra o alerta
        alert('Página em construção');
    });
}

//VERIFICADOR DE SENHA
function iniciarVerificadorSenha() {
    const entradaSenha = document.getElementById('entrada-senha');
    const preenchimentoForca = document.querySelector('.preenchimento-forca');
    const textoForca = document.getElementById('texto-forca');

    if (!entradaSenha || !preenchimentoForca) return;

    // Evento de digitação na senha
    entradaSenha.addEventListener('input', function() {
        const senha = this.value;
        verificarSenha(senha);
    });

    // Função para verificar a senha
    function verificarSenha(senha) {
        let nivel = 0;
        
        if (senha.length === 0) {
            preenchimentoForca.style.width = '0%';
            if (textoForca) textoForca.textContent = 'Digite uma senha';
            return;
        }
        
        // Critérios básicos
        if (senha.length >= 6) nivel = 1;
        if (senha.length >= 8) nivel = 2;
        if (senha.length >= 10 && /[0-9]/.test(senha)) nivel = 3;
        if (senha.length >= 12 && /[A-Z]/.test(senha) && /[0-9]/.test(senha)) nivel = 4;
        
        // Atualiza a barra
        const larguras = ['20%', '40%', '60%', '80%', '100%'];
        const cores = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];
        const textos = ['Muito fraca', 'Fraca', 'Regular', 'Forte', 'Muito forte'];
        
        if (nivel > 0) {
            preenchimentoForca.style.width = larguras[nivel - 1];
            preenchimentoForca.style.backgroundColor = cores[nivel - 1];
            if (textoForca) textoForca.textContent = textos[nivel - 1];
        }
    }
}

//SCROLL SUAVE
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

// Console básico para desenvolvimento
console.log('CyberSafe carregado!');