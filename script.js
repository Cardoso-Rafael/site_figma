// ==========================================================================
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
    });
}