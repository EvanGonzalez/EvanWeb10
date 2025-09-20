// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance carousel
setInterval(nextSlide, 7000);

// Carousel controls
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Login modal
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Login form submission (AJAX version)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    
    fetch('php/auth.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirigir al dashboard o página principal
            window.location.href = data.redirect || 'dashboard.php';
        } else {
            alert(data.message || 'Error en el login');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error de conexión');
    });
});

// Register form submission (AJAX version)
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    const formData = new FormData(registerForm);
    
    fetch('php/auth.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cuenta creada exitosamente');
            switchToLoginForm();
            registerForm.reset();
        } else {
            alert(data.message || 'Error en el registro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error de conexión');
    });
});

// Switch between login and register forms
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const modalTitle = document.getElementById('modalTitle');

function switchToRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    modalTitle.textContent = 'Crear Cuenta';
}

function switchToLoginForm() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    modalTitle.textContent = 'Iniciar Sesión';
}

switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    switchToRegisterForm();
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchToLoginForm();
});

// Smooth scrolling for navigation links
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

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

// Real-time form validation
document.getElementById('registerEmail').addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});

document.getElementById('registerPassword').addEventListener('blur', function() {
    if (!validatePassword(this.value)) {
        this.style.borderColor = '#ff6b6b';
        // Opcional: mostrar mensaje de ayuda
    } else {
        this.style.borderColor = '#e1e5e9';
    }
});