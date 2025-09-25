// ================================
// CONFIGURACIÓN Y VARIABLES
// ================================
class ModernNavbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.highlightCurrentPage();
        this.handleScrollEffect();
    }
    
    // ================================
    // EVENT LISTENERS
    // ================================
    setupEventListeners() {
        // Toggle menú móvil
        this.mobileMenu?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Cerrar menú móvil al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleLinkClick(e);
                this.closeMobileMenu();
            });
        });
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            this.handleScrollEffect();
        });
        
        // Cerrar menú móvil al redimensionar ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
        
        // Cerrar menú móvil al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    // ================================
    // FUNCIONES DEL MENÚ MÓVIL
    // ================================
    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ================================
    // MANEJO DE NAVEGACIÓN
    // ================================
    handleLinkClick(e) {
        // Remover clase active de todos los enlaces
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Agregar clase active al enlace clickeado
        e.target.closest('.nav-link').classList.add('active');
        
        // Guardar página activa en localStorage
        const page = e.target.closest('.nav-link').getAttribute('data-page');
        if (page) {
            try {
                localStorage.setItem('currentPage', page);
            } catch (error) {
                // Fallback si localStorage no está disponible
                console.log('LocalStorage no disponible');
            }
        }
        
        // Efecto de ripple (opcional)
        this.createRippleEffect(e);
    }
    
    // ================================
    // DESTACAR PÁGINA ACTUAL
    // ================================
    highlightCurrentPage() {
        // Intentar obtener página actual de localStorage
        let currentPage = null;
        try {
            currentPage = localStorage.getItem('currentPage');
        } catch (error) {
            console.log('LocalStorage no disponible');
        }
        
        // Si no hay página guardada, usar URL actual
        if (!currentPage) {
            const currentPath = window.location.pathname;
            const fileName = currentPath.split('/').pop().replace('.html', '');
            currentPage = fileName || 'inicio';
        }
        
        // Destacar enlace actual
        this.navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // ================================
    // EFECTOS VISUALES
    // ================================
    handleScrollEffect() {
        if (window.scrollY > 20) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // ================================
    // UTILIDADES
    // ================================
    
    // Smooth scroll para enlaces internos (si los tienes)
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Actualizar badge de notificaciones (ejemplo)
    updateNotificationBadge(count) {
        // Esta función puede ser útil para mostrar notificaciones
        // en el menú de usuario
        console.log(`Notificaciones: ${count}`);
    }
}

// ================================
// ESTILOS DINÁMICOS
// ================================

// Añadir estilos para el efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navbar
    const navbar = new ModernNavbar();
    
    // Funciones globales disponibles
    window.ModernNavbar = {
        instance: navbar,
        
        // Función para cambiar tema (si necesitas tema oscuro/claro)
        toggleTheme() {
            document.documentElement.classList.toggle('dark-theme');
            const isDark = document.documentElement.classList.contains('dark-theme');
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (error) {
                console.log('No se puede guardar tema');
            }
        },
        
        // Función para actualizar el logo
        updateLogo(src, alt = 'Logo') {
            const logoImg = document.querySelector('.logo-img');
            if (logoImg && src) {
                logoImg.src = src;
                logoImg.alt = alt;
            }
        },
        
        // Función para actualizar texto del logo
        updateLogoText(text) {
            const logoText = document.querySelector('.logo-text');
            if (logoText) {
                logoText.textContent = text;
            }
        }
    };
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Throttle para eventos de scroll
function throttle(func, limit) {
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

// Aplicar throttle al scroll
const originalHandleScroll = ModernNavbar.prototype.handleScrollEffect;
ModernNavbar.prototype.handleScrollEffect = throttle(originalHandleScroll, 16);