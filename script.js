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

// ==========================================================================
// MÓDULO 4: POP-UP DE AVISO ACADÊMICO
// ==========================================================================
const popupOverlay = document.getElementById('academic-popup');
const closePopupBtn = document.getElementById('close-popup');

if (popupOverlay && closePopupBtn) {
    // Verifica se o usuário já fechou o pop-up nesta sessão
    const popupVisto = sessionStorage.getItem('popupAcademicoVisto');

    if (!popupVisto) {
        // Mostra o pop-up com um atraso de meio segundo (500ms) para um efeito suave
        setTimeout(function() {
            popupOverlay.classList.add('show');
            // Bloqueia a rolagem da página enquanto o pop-up estiver aberto
            document.body.style.overflow = 'hidden';
        }, 500);
    }

    // Ação ao clicar no botão "Ciente"
    closePopupBtn.addEventListener('click', function() {
        // Esconde o pop-up
        popupOverlay.classList.remove('show');
        // Libera a rolagem da página
        document.body.style.overflow = 'auto';
        
        // Salva no navegador que o aviso já foi lido nesta sessão
        sessionStorage.setItem('popupAcademicoVisto', 'true');
    });
}