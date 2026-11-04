// ==========================================================================
// MÓDULO 1: VALIDAÇÃO DE FORMULÁRIO COM REGEX EM TEMPO REAL
// ==========================================================================
const formNewsletter = document.querySelector('.newsletter-form');
const inputEmail = document.querySelector('.newsletter-input');

if (formNewsletter && inputEmail) {
    const feedbackText = document.createElement('small');
    feedbackText.style.display = 'block';
    feedbackText.style.marginTop = '8px';
    feedbackText.style.fontSize = '0.85rem';
    feedbackText.style.fontWeight = '600';
    inputEmail.parentNode.appendChild(feedbackText);

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // Validação enquanto digita
    inputEmail.addEventListener('input', function() {
        const emailValor = inputEmail.value.trim();

        if (emailValor === '') {
            feedbackText.textContent = '';
            inputEmail.style.borderColor = '';
        } else if (!validarEmail(emailValor)) {
            feedbackText.textContent = '❌ Formato de e-mail inválido.';
            feedbackText.style.color = '#ef4444';
            inputEmail.style.borderColor = '#ef4444';
        } else {
            feedbackText.textContent = '✅ E-mail no formato correto!';
            feedbackText.style.color = '#22c55e';
            inputEmail.style.borderColor = '#22c55e';
        }
    });

    // Validação ao enviar
    formNewsletter.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailValor = inputEmail.value.trim();

        if (!validarEmail(emailValor)) {
            feedbackText.textContent = '❌ Por favor, digite um e-mail válido para continuar.';
            feedbackText.style.color = '#ef4444';
            inputEmail.style.borderColor = '#ef4444';
            inputEmail.focus(); 
        } else {
            feedbackText.textContent = '✅ Inscrição confirmada com sucesso! 🎉';
            feedbackText.style.color = '#22c55e';
            inputEmail.style.borderColor = '#22c55e';
            
            console.log(`[Sucesso] E-mail cadastrado: ${emailValor}`);
            inputEmail.value = '';

            setTimeout(function() {
                feedbackText.textContent = '';
                inputEmail.style.borderColor = ''; 
            }, 4000);
        }
    });
}

// ==========================================================================
// MÓDULO 2: LÓGICA DO MENU MOBILE
// ==========================================================================
const menuToggle = document.querySelector('#menu-toggle');
const headerNav = document.querySelector('#header-nav');
const navLinks = document.querySelectorAll('#header-nav a');

if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('nav--active');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            headerNav.classList.remove('nav--active');
        });
    });
}

// ==========================================================================
// MÓDULO 3: PERSISTÊNCIA E SOBREPOSIÇÃO DO TEMA (LOCALSTORAGE)
// ==========================================================================
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    // 1. LER A PREFERÊNCIA SALVA AO CARREGAR A PÁGINA
    const temaSalvo = localStorage.getItem('temaPreferido');

    // Força o tema salvo ignorando o sistema operacional
    if (temaSalvo === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeIcon.textContent = '☀️';
    } else if (temaSalvo === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.textContent = '🌙';
    }

    // 2. ALTERNAR O TEMA AO CLICAR NO BOTÃO
    themeToggle.addEventListener('click', function() {
        // Verifica qual tema está ativo agora. 
        // Se não tiver classe, checamos se o sistema operacional é claro.
        const isLightClass = document.body.classList.contains('light-theme');
        const isDarkClass = document.body.classList.contains('dark-theme');
        const sistemaEClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

        let novoTema;

        // Lógica: se o site está claro, muda para escuro. Senão, muda para claro.
        if (isLightClass || (!isLightClass && !isDarkClass && sistemaEClaro)) {
            // Mudando para o Escuro
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.textContent = '🌙';
            novoTema = 'dark';
        } else {
            // Mudando para o Claro
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
            novoTema = 'light';
        }

        // Salva a escolha no navegador
        localStorage.setItem('temaPreferido', novoTema);
        console.log(`[LocalStorage] Preferência atualizada para: ${novoTema}`);
    });
}








/*// ==========================================================================
// MÓDULO 3: INTERATIVIDADE (NEWSLETTER, TEMA E MENU MOBILE)
// ==========================================================================

// --- 1. VALIDAÇÃO DE FORMULÁRIO COM REGEX EM TEMPO REAL ---
const formNewsletter = document.querySelector('.newsletter-form');
const inputEmail = document.querySelector('.newsletter-input');

if (formNewsletter && inputEmail) {
    // CRIAÇÃO DINÂMICA DA MENSAGEM DE FEEDBACK
    const feedbackText = document.createElement('small');
    feedbackText.style.display = 'block';
    feedbackText.style.marginTop = '8px';
    feedbackText.style.fontSize = '0.85rem';
    feedbackText.style.fontWeight = '600';

    // Insere o elemento <small> logo abaixo do input de e-mail
    inputEmail.parentNode.appendChild(feedbackText);

    // FUNÇÃO QUE VALIDA O FORMULÁRIO VIA REGEX
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    // 💡 VALIDAÇÃO EM TEMPO REAL (Enquanto digita)
    inputEmail.addEventListener('input', function() {
        const emailValor = inputEmail.value.trim();

        if (emailValor === '') {
            // Se o campo estiver vazio, limpa as mensagens
            feedbackText.textContent = '';
            inputEmail.style.borderColor = '';
        } else if (!validarEmail(emailValor)) {
            // E-mail inválido enquanto digita
            feedbackText.textContent = '❌ Formato de e-mail inválido.';
            feedbackText.style.color = '#ef4444'; // Vermelho
            inputEmail.style.borderColor = '#ef4444';
        } else {
            // E-mail válido enquanto digita
            feedbackText.textContent = '✅ E-mail no formato correto!';
            feedbackText.style.color = '#22c55e'; // Verde
            inputEmail.style.borderColor = '#22c55e';
        }
    });

    // ESCUTADOR DE EVENTO 'SUBMIT' (Quando clica no botão)
    formNewsletter.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailValor = inputEmail.value.trim();

        // Se tentar enviar com erro ou vazio
        if (!validarEmail(emailValor)) {
            feedbackText.textContent = '❌ Por favor, digite um e-mail válido para continuar.';
            feedbackText.style.color = '#ef4444';
            inputEmail.style.borderColor = '#ef4444';
            inputEmail.focus(); 
        } else {
            // SUCESSO AO ENVIAR
            feedbackText.textContent = '✅ Inscrição confirmada com sucesso! 🎉';
            feedbackText.style.color = '#22c55e';
            inputEmail.style.borderColor = '#22c55e';
            
            console.log(`[Sucesso] E-mail cadastrado: ${emailValor}`);
            
            // Limpa o campo
            inputEmail.value = '';

            // Restaura o visual após 4 segundos
            setTimeout(function() {
                feedbackText.textContent = '';
                inputEmail.style.borderColor = ''; 
            }, 4000);
        }
    });
}

// --- 2. LÓGICA DO MENU MOBILE ---
const menuToggle = document.querySelector('#menu-toggle');
const headerNav = document.querySelector('#header-nav');
const navLinks = document.querySelectorAll('#header-nav a');

if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('nav--active');
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            headerNav.classList.remove('nav--active');
        });
    });
}

// --- 3. LÓGICA DO ALTERNADOR DE TEMA (DARK / LIGHT MODE) ---
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-theme');

        if (isLight) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.textContent = '🌙';
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
        }

        // Salva a preferência na memória do navegador (Front-End)
        localStorage.setItem('temaPreferido', novoTema);
       
        console.log(`[LocalStorage] Preferência atualizada para: ${novoTema}`);
    
    });
}*/

/*/=============================================================================================

// MÓDULO 3 - PERSISTÊNCIA DO TEMA COM LOCALSTORAGE

// 1. SELEÇÃO DOS ELEMENTOS DO DOM
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// 2. RECUPERAÇÃO DO TEMA SALVO (Executado assim que a página carrega)
const temaSalvo = localStorage.getItem('temaPreferido');

if (temaSalvo === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
        themeIcon.textContent = '☀️';
    }
}

// 3. ALTERNÂNCIA E GRAVAÇÃO DA PREFERÊNCIA
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        // Alterna a classe 'light-theme' no <body>
        document.body.classList.toggle('light-theme');

        let novoTema = 'dark';

        // Verifica se a classe está presente após o toggle
        if (document.body.classList.contains('light-theme')) {
            novoTema = 'light';
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
        }

        // Salva a preferência na memória do navegador (Front-End)
        localStorage.setItem('temaPreferido', novoTema);
       
        console.log(`[LocalStorage] Preferência atualizada para: ${novoTema}`);
    });
}*/