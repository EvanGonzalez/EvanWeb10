// Portfolio Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filter === 'all') {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                if (itemCategory === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Portfolio Modal functionality
const portfolioData = {
    1: {
        image: 'img/mantenimiento.jpg',
        category: 'Mantenimiento',
        title: 'Mantenimiento Preventivo Servidor Empresarial',
        description: 'Proyecto completo de mantenimiento preventivo realizado en los servidores principales de una empresa multinacional. Incluye limpieza física de componentes, actualización de drivers, optimización de sistema operativo, verificación de integridad de datos y configuración de respaldos automáticos. El proyecto se ejecutó durante horarios no laborales para evitar interrupciones en las operaciones comerciales.'
    },
    2: {
        image: 'images/portfolio/mantenimiento2.jpg',
        category: 'Mantenimiento',
        title: 'Optimización de Red Empresarial',
        description: 'Mantenimiento integral de la infraestructura de red de una oficina corporativa. Se realizó diagnóstico de conectividad, reconfiguración de switches y routers, optimización de ancho de banda, implementación de QoS y documentación completa de la topología de red. Como resultado, se mejoró la velocidad de conexión en un 40% y se eliminaron las desconexiones intermitentes.'
    },
    3: {
        image: 'images/portfolio/armado1.jpg',
        category: 'Actualización y Armado',
        title: 'PC Gaming de Alto Rendimiento',
        description: 'Diseño y armado de una workstation gaming personalizada para un streamer profesional. Se seleccionaron componentes de última generación optimizados para streaming y gaming simultáneo. Incluye tarjeta gráfica RTX 4070, procesador AMD Ryzen 7, 32GB de RAM DDR4, SSD NVMe de 2TB y sistema de refrigeración líquida personalizado. Se realizó overclock seguro y stress testing completo.'
    },
    4: {
        image: 'images/portfolio/upgrade1.jpg',
        category: 'Actualización y Armado',
        title: 'Upgrade Masivo de Laptops',
        description: 'Proyecto de actualización masiva de 25 laptops empresariales para mejorar el rendimiento del equipo de trabajo. Cada equipo recibió una unidad SSD NVMe para reemplazar los discos duros tradicionales, upgrade de memoria RAM a 16GB, migración completa de datos y optimización del sistema operativo. El proyecto resultó en una mejora del 300% en tiempos de arranque y 200% en rendimiento general.'
    },
    5: {
        image: 'images/portfolio/reparacion1.jpg',
        category: 'Reparación y Diagnóstico',
        title: 'Recuperación de Datos Críticos',
        description: 'Caso crítico de recuperación de datos de un disco duro con falla mecánica que contenía 5 años de registros contables de una empresa. Utilizando técnicas avanzadas de forensia digital y hardware especializado, se logró recuperar el 98% de la información. El proceso incluyó clonado bit a bit del disco, reconstrucción de sectores dañados y verificación de integridad de archivos. Tiempo total de recuperación: 72 horas.'
    },
    6: {
        image: 'images/portfolio/diagnostico1.jpg',
        category: 'Reparación y Diagnóstico',
        title: 'Diagnóstico Avanzado de Sistema',
        description: 'Diagnóstico complejo de una workstation profesional con fallas intermitentes que afectaban la productividad. Se utilizaron herramientas avanzadas de testing de hardware, análisis de logs del sistema, monitoreo de temperaturas y voltajes, y testing de estrés prolongado. Se identificó un problema de inestabilidad en la fuente de poder que causaba reinicios aleatorios. La reparación incluyó reemplazo de componentes y optimización completa del sistema.'
    },
    7: {
        image: 'images/portfolio/web1.jpg',
        category: 'Desarrollo y Soluciones Digitales',
        title: 'Plataforma Web Corporativa',
        description: 'Desarrollo completo de una plataforma web corporativa para una empresa de consultoría. La solución incluye sistema de gestión de contenidos personalizado, portal de clientes, sistema de tickets de soporte, integración con CRM existente y panel de analytics. Desarrollado con tecnologías modernas: PHP 8, MySQL, JavaScript ES6 y diseño responsive. La plataforma maneja más de 1000 usuarios activos mensuales.'
    },
    8: {
        image: 'images/portfolio/app1.jpg',
        category: 'Desarrollo y Soluciones Digitales',
        title: 'Sistema de Inventario Inteligente',
        description: 'Aplicación web innovadora para gestión automática de inventarios utilizando códigos QR y tecnología de scanning móvil. El sistema permite tracking en tiempo real, generación automática de órdenes de compra, reportes avanzados con gráficos interactivos y alertas inteligentes. Desarrollado con React para el frontend, Node.js para el backend y MongoDB como base de datos. Incluye API REST y aplicación móvil complementaria.'
    }
};

function openModal(id) {
    const modal = document.getElementById('portfolioModal');
    const data = portfolioData[id];
    
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('portfolioModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('portfolioModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Smooth animations on scroll for portfolio items
const portfolioObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, portfolioObserverOptions);

// Initialize portfolio animations
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        portfolioObserver.observe(item);
    });
});