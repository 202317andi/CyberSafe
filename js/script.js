// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    iniciarMenuMobile();
    iniciarAlternadorTema();
    iniciarAcessibilidade();
    iniciarFormularioContato();
    iniciarVerificadorSenha();
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

    // Carrega o tema salvo
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    aplicarTema(temaSalvo);

    // Clique no botão de tema
    botaoTema.addEventListener('click', function() {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'claro' : 'escuro';
        aplicarTema(novoTema);
    });

    // Função para aplicar o tema
    function aplicarTema(tema) {
        if (tema === 'escuro') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('tema', 'escuro');
            if (iconeTeam) {
                iconeTeam.textContent = 'light_mode';
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('tema', 'claro');
            if (iconeTeam) {
                iconeTeam.textContent = 'dark_mode';
            }
        }
    }
}

//BOTÃO DE ACESSIBILIDADE
function iniciarAcessibilidade() {
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    
    if (!botaoAcessibilidade) return;

    let tamanhoAtual = 'normal'; // normal, grande, extra-grande
    
    // Carrega o tamanho salvo
    const tamanhoSalvo = localStorage.getItem('tamanho-fonte') || 'normal';
    aplicarTamanhoFonte(tamanhoSalvo);

    // Clique no botão de acessibilidade
    botaoAcessibilidade.addEventListener('click', function() {
        const tamanhos = ['normal', 'grande', 'extra-grande'];
        const indiceAtual = tamanhos.indexOf(tamanhoAtual);
        const proximoIndice = (indiceAtual + 1) % tamanhos.length;
        aplicarTamanhoFonte(tamanhos[proximoIndice]);
    });

    // Função para aplicar tamanho da fonte
    function aplicarTamanhoFonte(tamanho) {
        // Remove classes anteriores
        document.body.classList.remove('fonte-normal', 'fonte-grande', 'fonte-extra-grande');
        
        // Adiciona nova classe
        document.body.classList.add('fonte-' + tamanho);
        
        tamanhoAtual = tamanho;
        localStorage.setItem('tamanho-fonte', tamanho);
    }
}

//FORMULÁRIO DE CONTATO
function iniciarFormularioContato() {
    const formularioContato = document.getElementById('formulario-contato');
    
    if (!formularioContato) return;

    // Evento de envio do formulário
    formularioContato.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão
        
        // Mostra o alerta conforme solicitado no trabalho
        alert('Página em construção');
        
        // Opcional: resetar o formulário
        // formularioContato.reset();
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
        const forca = verificarForcaSenha(senha);
        atualizarBarraForca(forca, senha.length);
    });

    // Função para verificar a força da senha
    function verificarForcaSenha(senha) {
        let pontos = 0;
        
        if (senha.length === 0) return 0;
        
        // Critérios básicos
        if (senha.length >= 8) pontos += 1;
        if (senha.length >= 12) pontos += 1;
        if (/[a-z]/.test(senha)) pontos += 1; // letra minúscula
        if (/[A-Z]/.test(senha)) pontos += 1; // letra maiúscula
        if (/[0-9]/.test(senha)) pontos += 1; // número
        if (/[^A-Za-z0-9]/.test(senha)) pontos += 1; // símbolo
        
        return Math.min(pontos, 5);
    }

    // Função para atualizar a barra de força
    function atualizarBarraForca(forca, comprimento) {
        const cores = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];
        const textos = ['Muito fraca', 'Fraca', 'Regular', 'Forte', 'Muito forte'];
        const larguras = ['20%', '40%', '60%', '80%', '100%'];
        
        if (comprimento === 0) {
            preenchimentoForca.style.width = '0%';
            preenchimentoForca.style.backgroundColor = '#e5e7eb';
            if (textoForca) textoForca.textContent = 'Digite uma senha';
            return;
        }
        
        const indice = Math.max(0, forca - 1);
        preenchimentoForca.style.width = larguras[indice];
        preenchimentoForca.style.backgroundColor = cores[indice];
        if (textoForca) textoForca.textContent = textos[indice];
    }
}

//SCROLL SUAVE
// Adiciona scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const alvo = document.querySelector(href);
        
        if (alvo) {
            const alturaHeader = 80; // altura do header fixo
            const posicaoAlvo = alvo.offsetTop - alturaHeader;
            
            window.scrollTo({
                top: posicaoAlvo,
                behavior: 'smooth'
            });
        }
    });
});

//ANIMAÇÕES SIMPLES
// Adiciona uma animação de entrada básica aos cards
function adicionarAnimacaoScroll() {
    const cartoes = document.querySelectorAll('.cartao-recurso, .cartao-dica, .membro-equipe');
    
    const opcoeObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, opcoeObservador);

    cartoes.forEach(cartao => {
        cartao.style.opacity = '0';
        cartao.style.transform = 'translateY(20px)';
        cartao.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observador.observe(cartao);
    });
}

// Inicializa as animações
adicionarAnimacaoScroll();

//UTILITÁRIOS

// Função para mostrar alertas (versão simples)
function mostrarAlerta(mensagem, tipo = 'info') {
    // Cria um alerta simples
    const divAlerta = document.createElement('div');
    divAlerta.textContent = mensagem;
    divAlerta.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--cor-primaria);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 9999;
        box-shadow: var(--sombra);
    `;
    
    if (tipo === 'sucesso') {
        divAlerta.style.background = 'var(--cor-sucesso)';
    } else if (tipo === 'erro') {
        divAlerta.style.background = 'var(--cor-perigo)';
    }
    
    document.body.appendChild(divAlerta);
    
    // Remove após 3 segundos
    setTimeout(() => {
        divAlerta.remove();
    }, 3000);
}

// Função para detectar dispositivo móvel
function ehMobile() {
    return window.innerWidth <= 768;
}

// Console log para desenvolvimento
console.log('🛡️ CyberSafe carregado com sucesso!');
console.log('✅ Menu mobile: OK');
console.log('✅ Tema claro/escuro: OK');
console.log('✅ Acessibilidade: OK');
console.log('✅ Formulário: OK');
console.log('✅ Verificador de senha: OK');