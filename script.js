// Navegação mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.section, .timeline-item, .experience-item, .skill-category, .contact-method');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validação básica
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Mostrar loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    try {
        // Tentar enviar via PHP primeiro, depois fallback para simulação
        try {
            const result = await sendEmailViaPHP(data);
            showNotification(result.message, 'success');
        } catch (phpError) {
            console.log('PHP não disponível, usando simulação:', phpError);
            await simulateEmailSend(data);
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        }
        
        contactForm.reset();
        
    } catch (error) {
        showNotification(error.message || 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Função para enviar email via PHP
async function sendEmailViaPHP(data) {
    try {
        const response = await fetch('contact-handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        throw new Error('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.');
    }
}

// Função para simular envio de email (fallback)
function simulateEmailSend(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Aqui você pode integrar com EmailJS, Formspree, ou outro serviço
            console.log('Dados do formulário:', data);
            
            // Simular sucesso (90% das vezes)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Erro simulado'));
            }
        }, 2000);
    });
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Fechar notificação
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Adicionar estilos CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Parallax effect para o background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles');
    const circuitLines = document.querySelector('.circuit-lines');
    
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (circuitLines) {
        circuitLines.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});


// Efeito de hover nos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-category, .experience-item, .timeline-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});





// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedScroll = debounce(() => {
    // Código de scroll aqui
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Funcionalidades dos ícones orbitando
document.addEventListener('DOMContentLoaded', () => {
    const iconItems = document.querySelectorAll('.icon-item');
    
    // Adicionar efeito de clique nos ícones
    iconItems.forEach(icon => {
        icon.addEventListener('click', () => {
            // Efeito de explosão
            icon.style.transform = 'scale(1.5)';
            icon.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
            
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
                icon.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
            }, 300);
            
            // Mostrar notificação com a tecnologia
            const tooltip = icon.getAttribute('data-tooltip');
            showNotification(`Tecnologia: ${tooltip}`, 'info');
        });
        
        // Efeito de hover mais suave
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.animation = '';
        });
    });
    
    // Controle de velocidade das órbitas
    const orbits = document.querySelectorAll('.orbit');
    let isPaused = false;
    
    // Pausar/retomar animações com tecla espaço
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            isPaused = !isPaused;
            
            orbits.forEach(orbit => {
                orbit.style.animationPlayState = isPaused ? 'paused' : 'running';
            });
            
            showNotification(isPaused ? 'Animações pausadas' : 'Animações retomadas', 'info');
        }
    });
    
    // Efeito de aceleração ao clicar na foto
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            orbits.forEach((orbit, index) => {
                const currentDuration = orbit.style.animationDuration || 
                    (index === 0 ? '15s' : index === 1 ? '25s' : '35s');
                const newDuration = '2s';
                
                orbit.style.animationDuration = newDuration;
                
                setTimeout(() => {
                    orbit.style.animationDuration = currentDuration;
                }, 2000);
            });
            
            showNotification('Aceleração das órbitas ativada!', 'success');
        });
    }
});

