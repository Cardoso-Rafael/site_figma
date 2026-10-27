// ==========================================================================
// MÓDULO 3: INTERATIVIDADE (NEWSLETTER, TEMA E MENU MOBILE)
// ==========================================================================

// --- 1. VALIDAÇÃO DE FORMULÁRIO COM REGEX E FEEDBACK VISUAL ---
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
        return regexEmail.test(email); // Retorna true ou false
    }

    // ESCUTADOR DE EVENTO 'SUBMIT'
    formNewsletter.addEventListener('submit', function(event) {
        // Bloqueia o envio do formulário enquanto validamos
        event.preventDefault();

        const emailValor = inputEmail.value.trim();

        // CHECAGEM DE ERRO: Campo vazio ou e-mail fora do padrão
        if (!validarEmail(emailValor)) {
            // Aplica o feedback visual de ERRO
            feedbackText.textContent = '❌ Por favor, digite um e-mail válido (ex: nome@dominio.com).';
            feedbackText.style.color = '#ef4444'; // Vermelho
            inputEmail.style.borderColor = '#ef4444';
            inputEmail.focus(); // Coloca o cursor de volta no campo
        } else {
            // Aplica o feedback visual de SUCESSO
            feedbackText.textContent = '✅ Inscrição realizada com sucesso!';
            feedbackText.style.color = '#22c55e'; // Verde
            inputEmail.style.borderColor = '#22c55e';

            // Limpa o campo de entrada
            inputEmail.value = '';

            console.log(`[Sucesso] E-mail cadastrado: ${emailValor}`);

            // Oculta a mensagem de sucesso após 4 segundos
            setTimeout(function() {
                feedbackText.textContent = '';
                inputEmail.style.borderColor = ''; // Restaura a borda padrão do CSS
            }, 4000);
        }
    });
}

// --- 2. LÓGICA DO MENU MOBILE ---
const menuToggle = document.querySelector('#menu-toggle');
const headerNav = document.querySelector('#header-nav');
// Seleciona todos os links dentro do menu
const navLinks = document.querySelectorAll('#header-nav a');

if (menuToggle && headerNav) {
    // Abre/fecha o menu ao clicar no botão hambúrguer
    menuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('nav--active');
    });

    // Fecha o menu ao clicar em qualquer link
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
        // Verifica se o corpo já tem o tema claro
        const isLight = document.body.classList.contains('light-theme');

        if (isLight) {
            // Se está claro, remove o claro e força o escuro
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.textContent = '🌙';
        } else {
            // Se não está claro, remove o escuro e força o claro
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
        }
    });
}