/**
 * Clase principal para manejar el footer
 */
class ModernFooter {
    constructor(options = {}) {
        // Configuración por defecto
        this.config = {
            enableNewsletter: true,
            enableBackToTop: true,
            enableSocialTracking: true,
            backToTopOffset: 300,
            animationDelay: 100,
            ...options
        };
        
        // Elementos del DOM
        this.footer = document.getElementById('mainFooter');
        this.backToTopBtn = document.getElementById('backToTop');
        this.newsletterForm = document.getElementById('newsletterForm');
        this.emailInput = document.getElementById('emailInput');
        this.socialLinks = document.querySelectorAll('.social-btn');
        this.footerLinks = document.querySelectorAll('.footer-link');
        
        // Estado
        this.isVisible = false;
        this.lastScrollY = 0;
        
        this.init();
    }
    
    /**
     * Inicializar el footer
     */
    init() {
        this.setupEventListeners();
        this.initBackToTop();
        this.initNewsletter();
        this.initSocialTracking();
        this.initAnimations();
        
        console.log('✅ Footer moderno inicializado');
    }
    
    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Scroll para botón back-to-top
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));
        
        // Back to top click
        this.backToTopBtn?.addEventListener('click', () => {
            this.scrollToTop();
        });
        
        // Newsletter form
        this.newsletterForm?.addEventListener('submit', (e) => {
            this.handleNewsletterSubmit(e);
        });
        
        // Social links tracking
        this.socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackSocialClick(e);
            });
        });
        
        // Footer links tracking
        this.footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackFooterLink(e);
            });
        });
        
        // Resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Intersection Observer para animaciones
        this.setupIntersectionObserver();
    }
    
    /**
     * Manejar evento de scroll
     */
    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Back to top button
        if (scrollY > this.config.backToTopOffset) {
            this.showBackToTop();
        } else {
            this.hideBackToTop();
        }
        
        this.lastScrollY = scrollY;
    }
    
    /**
     * Mostrar botón back to top
     */
    showBackToTop() {
        if (!this.isVisible && this.backToTopBtn) {
            this.backToTopBtn.classList.add('visible');
            this.isVisible = true;
        }
    }
    
    /**
     * Ocultar botón back to top
     */
    hideBackToTop() {
        if (this.isVisible && this.backToTopBtn) {
            this.backToTopBtn.classList.remove('visible');
            this.isVisible = false;
        }
    }
    
    /**
     * Scroll suave hacia arriba
     */
    scrollToTop() {
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
        
        // Alternativa moderna (mejor soporte)
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Inicializar funcionalidad del newsletter
     */
    initNewsletter() {
        if (!this.config.enableNewsletter || !this.newsletterForm) return;
        
        // Validación en tiempo real
        this.emailInput?.addEventListener('input', (e) => {
            this.validateEmail(e.target.value);
        });
        
        // Enter key en el input
        this.emailInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.newsletterForm.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    /**
     * Manejar envío del newsletter
     */
    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput?.value.trim();
        
        if (!email) {
            this.showNotification('Por favor ingresa tu email', 'error');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío (aquí conectarías con tu API)
        this.submitNewsletter(email);
    }
    
    /**
     * Enviar newsletter (simulated)
     */
    async submitNewsletter(email) {
        const submitBtn = this.newsletterForm.querySelector('.newsletter-btn');
        const originalText = submitBtn.textContent;
        
        // Loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Simular API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Aquí harías la llamada real a tu API
            // const response = await fetch('/api/newsletter', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // });
            
            this.showNotification('¡Gracias por suscribirte!', 'success');
            this.emailInput.value = '';
            
            // Analytics tracking
            this.trackEvent('newsletter_signup', { email });
            
        } catch (error) {
            this.showNotification('Error al suscribirse. Intenta de nuevo.', 'error');
            console.error('Newsletter error:', error);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    /**
     * Validar formato de email
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `footer-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Cerrar">×</button>
            </div>
        `;
        
        // Añadir estilos si no existen
        this.addNotificationStyles();
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-cerrar
        const autoClose = setTimeout(() => this.closeNotification(notification), 5000);
        
        // Cerrar manualmente
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn?.addEventListener('click', () => {
            clearTimeout(autoClose);
            this.closeNotification(notification);
        });
    }
    
    /**
     * Cerrar notificación
     */
    closeNotification(notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    /**
     * Añadir estilos para notificaciones
     */
    addNotificationStyles() {
        if (document.getElementById('notification-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .footer-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                transform: translateX(100%);
                transition: all 0.3s ease;
                max-width: 400px;
                border-left: 4px solid #3b82f6;
            }
            
            .footer-notification.success { border-left-color: #10b981; }
            .footer-notification.error { border-left-color: #ef4444; }
            
            .footer-notification.show { transform: translateX(0); }
            .footer-notification.hide { transform: translateX(100%); opacity: 0; }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification-message {
                flex: 1;
                color: #374151;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.15s ease;
            }
            
            .notification-close:hover {
                background: #f3f4f6;
                color: #374151;
            }
            
            @media (max-width: 640px) {
                .footer-notification {
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    /**
     * Inicializar tracking de redes sociales
     */
    initSocialTracking() {
        if (!this.config.enableSocialTracking) return;
        
        // Tracking de impresiones de redes sociales
        this.trackEvent('social_links_viewed');
    }
    
    /**
     * Track social media clicks
     */
    trackSocialClick(e) {
        const socialNetwork = this.getSocialNetworkName(e.currentTarget.href);
        
        this.trackEvent('social_click', {
            social_network: socialNetwork,
            location: 'footer'
        });
        
        console.log(`📱 Social click: ${socialNetwork}`);
    }
    
    /**
     * Track footer link clicks
     */
    trackFooterLink(e) {
        const linkText = e.currentTarget.textContent.trim();
        const linkHref = e.currentTarget.href;
        
        this.trackEvent('footer_link_click', {
            link_text: linkText,
            link_url: linkHref
        });
        
        console.log(`🔗 Footer link click: ${linkText}`);
    }
    
    /**
     * Obtener nombre de red social desde URL
     */
    getSocialNetworkName(url) {
        if (url.includes('facebook.com')) return 'facebook';
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('twitter.com')) return 'twitter';
        if (url.includes('linkedin.com')) return 'linkedin';
        if (url.includes('youtube.com')) return 'youtube';
        if (url.includes('tiktok.com')) return 'tiktok';
        return 'unknown';
    }
    
    /**
     * Configurar Intersection Observer para animaciones
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos del footer
        const footerSections = document.querySelectorAll('.footer-section, .footer-newsletter');
        footerSections.forEach(section => {
            observer.observe(section);
        });
    }
    
    /**
     * Inicializar animaciones
     */
    initAnimations() {
        // Añadir clases CSS para animaciones
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .footer-section,
            .footer-newsletter {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .footer-section.animate-in,
            .footer-newsletter.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .footer-section,
                .footer-newsletter {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        
        document.head.appendChild(animationStyles);
    }
    
    /**
     * Manejar cambio de tamaño de ventana
     */
    handleResize() {
        // Ajustar posición del botón back-to-top en móvil
        if (window.innerWidth <= 768) {
            this.config.backToTopOffset = 200;
        } else {
            this.config.backToTopOffset = 300;
        }
    }
    
    /**
     * Track custom events (integración con analytics)
     */
    trackEvent(eventName, properties = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, properties);
        }
        
        // Custom analytics
        if (window.analytics && typeof window.analytics.track === 'function') {
            window.analytics.track(eventName, properties);
        }
        
        // Console log para desarrollo
        console.log('📊 Event tracked:', eventName, properties);
    }
    
    /**
     * Función throttle para optimizar eventos
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Función debounce para optimizar eventos
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    /**
     * Actualizar información de contacto
     */
    updateContact(contactInfo) {
        const contactItems = document.querySelectorAll('.contact-item');
        
        if (contactInfo.address) {
            const addressItem = Array.from(contactItems).find(item => 
                item.querySelector('.contact-icon').textContent === '📍'
            );
            if (addressItem) {
                addressItem.querySelector('span:last-child').textContent = contactInfo.address;
            }
        }
        
        if (contactInfo.phone) {
            const phoneItem = Array.from(contactItems).find(item => 
                item.querySelector('.contact-icon').textContent === '📞'
            );
            if (phoneItem) {
                const link = phoneItem.querySelector('.contact-link');
                link.href = `tel:${contactInfo.phone}`;
                link.textContent = contactInfo.phone;
            }
        }
        
        if (contactInfo.email) {
            const emailItem = Array.from(contactItems).find(item => 
                item.querySelector('.contact-icon').textContent === '✉️'
            );
            if (emailItem) {
                const link = emailItem.querySelector('.contact-link');
                link.href = `mailto:${contactInfo.email}`;
                link.textContent = contactInfo.email;
            }
        }
    }
    
    /**
     * Actualizar enlaces de redes sociales
     */
    updateSocialLinks(socialLinks) {
        Object.entries(socialLinks).forEach(([platform, url]) => {
            const socialBtn = document.querySelector(`.social-btn.${platform}`);
            if (socialBtn) {
                socialBtn.href = url;
            }
        });
    }
    
    /**
     * Actualizar logo del footer
     */
    updateLogo(logoSrc, logoText, logoAlt = 'Logo') {
        const logoImg = document.querySelector('.footer-logo-img');
        const logoTextEl = document.querySelector('.footer-logo-text');
        
        if (logoImg && logoSrc) {
            logoImg.src = logoSrc;
            logoImg.alt = logoAlt;
        }
        
        if (logoTextEl && logoText) {
            logoTextEl.textContent = logoText;
        }
    }
    
    /**
     * Toggle tema claro/oscuro
     */
    toggleTheme() {
        this.footer?.classList.toggle('light-theme');
        const isLight = this.footer?.classList.contains('light-theme');
        
        // Guardar preferencia
        try {
            localStorage.setItem('footer-theme', isLight ? 'light' : 'dark');
        } catch (e) {
            console.log('No se puede guardar tema en localStorage');
        }
        
        return isLight;
    }
    
    /**
     * Destruir instancia del footer (cleanup)
     */
    destroy() {
        // Remover event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Limpiar timers
        if (this.scrollTimer) clearTimeout(this.scrollTimer);
        
        console.log('🗑️ Footer destruido');
    }
}

// ================================
// UTILIDADES GLOBALES
// ================================
const FooterUtils = {
    /**
     * Crear instancia del footer
     */
    create(options = {}) {
        return new ModernFooter(options);
    },
    
    /**
     * Configuraciones predefinidas
     */
    presets: {
        minimal: {
            enableNewsletter: false,
            enableBackToTop: true,
            enableSocialTracking: false
        },
        
        complete: {
            enableNewsletter: true,
            enableBackToTop: true,
            enableSocialTracking: true,
            backToTopOffset: 300
        },
        
        business: {
            enableNewsletter: true,
            enableBackToTop: true,
            enableSocialTracking: true,
            backToTopOffset: 200
        }
    },
    
    /**
     * Validar configuración
     */
    validateConfig(config) {
        const requiredFields = ['enableNewsletter', 'enableBackToTop'];
        return requiredFields.every(field => field in config);
    }
};

// ================================
// INICIALIZACIÓN AUTOMÁTICA
// ================================
let footerInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Detectar tema guardado
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('footer-theme') || 'dark';
    } catch (e) {
        console.log('No se puede acceder a localStorage');
    }
    
    // Aplicar tema
    const footer = document.getElementById('mainFooter');
    if (footer && savedTheme === 'light') {
        footer.classList.add('light-theme');
    }
    
    // Crear instancia del footer
    footerInstance = new ModernFooter({
        enableNewsletter: true,
        enableBackToTop: true,
        enableSocialTracking: true,
        backToTopOffset: 300
    });
    
    // API global
    window.Footer = {
        instance: footerInstance,
        utils: FooterUtils,
        
        // Métodos de conveniencia
        updateLogo(src, text, alt) {
            return footerInstance.updateLogo(src, text, alt);
        },
        
        updateContact(info) {
            return footerInstance.updateContact(info);
        },
        
        updateSocial(links) {
            return footerInstance.updateSocialLinks(links);
        },
        
        toggleTheme() {
            return footerInstance.toggleTheme();
        },
        
        scrollToTop() {
            return footerInstance.scrollToTop();
        }
    };
    
    console.log('🚀 Footer moderno cargado y listo');
});

// ================================
// EVENTOS PERSONALIZADOS
// ================================
document.addEventListener('footer:newsletter-signup', (e) => {
    console.log('📧 Newsletter signup:', e.detail);
});

document.addEventListener('footer:social-click', (e) => {
    console.log('📱 Social click:', e.detail);
});

document.addEventListener('footer:back-to-top', (e) => {
    console.log('⬆️ Back to top clicked');
});

// ================================
// EXPORT PARA MÓDULOS ES6
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernFooter, FooterUtils };
}

if (typeof window !== 'undefined') {
    window.ModernFooter = ModernFooter;
    window.FooterUtils = FooterUtils;
}