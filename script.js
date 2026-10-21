// ==========================================================================
// MÓDULO 3: INTERATIVIDADE (NEWSLETTER, TEMA E MENU MOBILE)
// ==========================================================================

// --- 1. INTERATIVIDADE DO FORMULÁRIO DE NEWSLETTER ---
const formNewsletter = document.querySelector('.newsletter-form');
const inputEmail = document.querySelector('.newsletter-input');
const btnSubmit = document.querySelector('.btn-newsletter');

if (formNewsletter && inputEmail && btnSubmit) {
    formNewsletter.addEventListener('submit', function(event) {
        // Impede o recarregamento padrão da página
        event.preventDefault();

        // Captura o e-mail digitado e remove espaços extras
        const emailValor = inputEmail.value.trim();

        // Validação: verifica se o campo não está vazio
        if (emailValor !== '') {
            // Altera o texto e a cor do botão dinamicamente
            btnSubmit.textContent = 'Inscrição Confirmada! 🎉';
            btnSubmit.style.backgroundColor = '#22c55e'; // Verde de Sucesso

            // Limpa o campo de entrada
            inputEmail.value = '';

            // Exibe o registro no Console do DevTools
            console.log(`[SUCESSO] E-mail cadastrado: ${emailValor}`);

            // Retorna o botão ao estado original após 3 segundos (3000ms)
            setTimeout(function() {
                btnSubmit.textContent = 'Quero Desconto 🎁';
                btnSubmit.style.backgroundColor = ''; // Restaura a cor do CSS original
            }, 3000);
        }
    });
}

// --- 2. LÓGICA DO MENU MOBILE ---
const menuToggle = document.querySelector('#menu-toggle');
const headerNav = document.querySelector('#header-nav');
// 💡 Seleciona todos os links dentro do menu
const navLinks = document.querySelectorAll('#header-nav a');

if (menuToggle && headerNav) {
    // Abre/fecha o menu ao clicar no botão hambúrguer
    menuToggle.addEventListener('click', function() {
        headerNav.classList.toggle('nav--active');
    });

    // 💡 DESAFIO EXTRA: Fecha o menu ao clicar em qualquer link
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