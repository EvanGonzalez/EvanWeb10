// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('quickContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                service: document.getElementById('contactService').value,
                message: document.getElementById('contactMessage').value.trim()
            };
            
            // Validate form
            if (!validateContactForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Enviando...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                // Option 1: Redirect to Gmail with pre-filled data
                redirectToGmail(formData);
                
                // Option 2: Send via WhatsApp (uncomment to use instead)
                // redirectToWhatsApp(formData);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('¡Mensaje preparado! Se abrirá tu cliente de email.', 'success');
            }, 1000);
        });
    }
});

// Form validation
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name) {
        errors.push('El nombre es requerido');
    }
    
    if (!data.email) {
        errors.push('El email es requerido');
    } else if (!isValidEmail(data.email)) {
        errors.push('El email no tiene un formato válido');
    }
    
    if (!data.service) {
        errors.push('Por favor selecciona un servicio');
    }
    
    if (!data.message) {
        errors.push('El mensaje es requerido');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Redirect to Gmail with pre-filled data
function redirectToGmail(data) {
    const subject = `Consulta sobre ${getServiceName(data.service)} - ${data.name}`;
    const body = `Hola,

Mi nombre es ${data.name} y estoy interesado/a en obtener más información sobre sus servicios de ${getServiceName(data.service)}.

${data.message}

Mis datos de contacto:
- Nombre: ${data.name}
- Email: ${data.email}
- Servicio de interés: ${getServiceName(data.service)}

Espero su respuesta.

Saludos cordiales,
${data.name}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=servicio.evanms@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank');
}

// Alternative: Redirect to WhatsApp
function redirectToWhatsApp(data) {
    const message = `Hola! 👋

Mi nombre es *${data.name}* y estoy interesado/a en sus servicios de *${getServiceName(data.service)}*.

📧 Mi email: ${data.email}

📝 Mi consulta:
${data.message}

¿Podrían proporcionarme más información?

Gracias! 😊`;

    const whatsappUrl = `https://wa.me/50768679680?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Get service name from value
function getServiceName(serviceValue) {
    const services = {
        'mantenimiento': 'Mantenimiento',
        'actualizacion': 'Actualización y Armado',
        'reparacion': 'Reparación y Diagnóstico',
        'desarrollo': 'Desarrollo y Soluciones Digitales'
    };
    
    return services[serviceValue] || 'Servicios Tecnológicos';
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message.replace(/\n/g, '<br>')}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: 10px;
                padding: 1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #f44336, #d32f2f);
                color: white;
            }
            
            .notification-info {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 0.5rem;
            }
            
            .notification-icon {
                font-size: 1.2rem;
                flex-shrink: 0;
                margin-top: 2px;
            }
            
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.8;
                padding: 0;
                margin-left: 0.5rem;
            }
            
            .notification-close:hover {
                opacity: 1;
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
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Quick contact buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    // Track clicks for analytics (optional)
    const emailButtons = document.querySelectorAll('a[href^="mailto"]');
    const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
    
    emailButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Email contact initiated');
            showNotification('Abriendo cliente de email...', 'info');
        });
    });
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp contact initiated');
            showNotification('Abriendo WhatsApp...', 'info');
        });
    });
});

// Smooth scroll for contact links
function scrollToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Auto-fill form from URL parameters (optional feature)
function autoFillFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service) {
        const serviceSelect = document.getElementById('contactService');
        if (serviceSelect) {
            serviceSelect.value = service;
        }
    }
}

// Initialize auto-fill on page load
document.addEventListener('DOMContentLoaded', autoFillFromURL);