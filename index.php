<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechService Pro - Mantenimiento y Servicio Tecnológico</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: white;
            text-decoration: none;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-menu a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s ease;
        }

        .nav-menu a:hover {
            opacity: 0.8;
        }

        .login-btn {
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .login-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }

        /* Main Content */
        .main-content {
            margin-top: 80px;
        }

        /* Carousel */
        .carousel-container {
            position: relative;
            max-width: 100%;
            overflow: hidden;
            height: 500px;
        }

        .carousel-slide {
            display: none;
            height: 500px;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .carousel-slide.active {
            display: block;
        }

        .carousel-slide::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
        }

        .carousel-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
            z-index: 2;
        }

        .carousel-content h2 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .carousel-content p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .cta-btn {
            background: #ff6b6b;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .cta-btn:hover {
            background: #ff5252;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255,107,107,0.4);
        }

        .carousel-nav {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 3;
        }

        .carousel-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .carousel-dot.active {
            background: white;
        }

        .carousel-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 2rem;
            padding: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
            z-index: 3;
        }

        .carousel-arrow:hover {
            background: rgba(255,255,255,0.3);
        }

        .carousel-arrow.prev {
            left: 20px;
        }

        .carousel-arrow.next {
            right: 20px;
        }

        /* Services Section */
        .services {
            padding: 5rem 2rem;
            background: white;
        }

        .services-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #333;
        }

        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 3rem;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .service-card {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 5px 25px rgba(0,0,0,0.1);
            border: 1px solid #f0f0f0;
        }

        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .service-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
            font-size: 2rem;
        }

        .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
        }

        .service-card p {
            color: #666;
            line-height: 1.6;
        }

        /* Login Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.6);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 20px;
            width: 90%;
            max-width: 400px;
            position: relative;
            animation: slideIn 0.3s ease;
            overflow: hidden;
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            text-align: center;
        }

        .modal-header h2 {
            margin: 0;
            font-size: 1.8rem;
        }

        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            color: white;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .close:hover {
            opacity: 0.7;
        }

        .login-form {
            padding: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
        }

        .form-group input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .login-submit {
            width: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .login-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .forgot-password {
            text-align: center;
            margin-top: 1rem;
        }

        .forgot-password a {
            color: #667eea;
            text-decoration: none;
            font-size: 0.9rem;
        }

        .forgot-password a:hover {
            text-decoration: underline;
        }

        .switch-form {
            text-align: center;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid #e1e5e9;
        }

        .switch-form p {
            color: #666;
            margin: 0;
        }

        .switch-form a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }

        .switch-form a:hover {
            text-decoration: underline;
        }

        /* Footer */
        .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                flex-direction: column;
                padding: 1rem;
            }

            .nav-menu.active {
                display: flex;
            }

            .mobile-menu-btn {
                display: block;
            }

            .carousel-content h2 {
                font-size: 2rem;
            }

            .carousel-content p {
                font-size: 1rem;
            }

            .carousel-arrow {
                display: none;
            }

            .services {
                padding: 3rem 1rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }

            .nav-container {
                padding: 0 1rem;
            }
        }

        @media (max-width: 480px) {
            .carousel-container {
                height: 400px;
            }

            .carousel-slide {
                height: 400px;
            }

            .carousel-content h2 {
                font-size: 1.8rem;
            }

            .service-card {
                padding: 1.5rem;
            }

            .modal-content {
                margin: 10% auto;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="nav-container">
            <a href="#" class="logo">TechService Pro</a>
            <nav>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#servicios">Servicios</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </nav>
            <a href="#" class="login-btn" id="loginBtn">Iniciar Sesión</a>
            <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Carousel -->
        <section class="carousel-container" id="inicio">
            <!-- Slide 1 - Reemplaza 'images/banner1.jpg' con la ruta de tu imagen -->
            <div class="carousel-slide active" style="background-image: linear-gradient(135deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6)), url('images/banner1.jpg');">
                <div class="carousel-content">
                    <h2>Mantenimiento Tecnológico Profesional</h2>
                    <p>Servicios especializados para mantener tu tecnología funcionando al 100%</p>
                    <a href="#servicios" class="cta-btn">Ver Servicios</a>
                </div>
            </div>
            
            <!-- Slide 2 - Reemplaza 'images/banner2.jpg' con la ruta de tu imagen -->
            <div class="carousel-slide" style="background-image: linear-gradient(135deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6)), url('images/banner2.jpg');">
                <div class="carousel-content">
                    <h2>Soporte Técnico 24/7</h2>
                    <p>Estamos aquí cuando nos necesites, todos los días del año</p>
                    <a href="#contacto" class="cta-btn">Contactar Ahora</a>
                </div>
            </div>
            
            <!-- Slide 3 - Reemplaza 'images/banner3.jpg' con la ruta de tu imagen -->
            <div class="carousel-slide" style="background-image: linear-gradient(135deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6)), url('images/banner3.jpg');">
                <div class="carousel-content">
                    <h2>Soluciones Personalizadas</h2>
                    <p>Cada negocio es único, por eso nuestros servicios se adaptan a tus necesidades</p>
                    <a href="#servicios" class="cta-btn">Conoce Más</a>
                </div>
            </div>

            <button class="carousel-arrow prev" id="prevBtn">‹</button>
            <button class="carousel-arrow next" id="nextBtn">›</button>
            
            <div class="carousel-nav">
                <span class="carousel-dot active" data-slide="0"></span>
                <span class="carousel-dot" data-slide="1"></span>
                <span class="carousel-dot" data-slide="2"></span>
            </div>
        </section>

        <!-- Services Section -->
        <section class="services" id="servicios">
            <div class="services-container">
                <h2 class="section-title">Nuestros Servicios</h2>
                <p class="section-subtitle">Ofrecemos soluciones tecnológicas completas para tu negocio</p>
                
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">🖥️</div>
                        <h3>Mantenimiento de Equipos</h3>
                        <p>Mantenimiento preventivo y correctivo de computadoras, laptops y servidores para garantizar su óptimo funcionamiento.</p>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">🔧</div>
                        <h3>Reparación Técnica</h3>
                        <p>Diagnóstico y reparación especializada de hardware y software con técnicos certificados y repuestos originales.</p>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">🛡️</div>
                        <h3>Seguridad Informática</h3>
                        <p>Implementación de sistemas de seguridad, antivirus empresarial y respaldo de datos para proteger tu información.</p>
                    </div>
                    
                    <div class="service-card">
                        <div class="service-icon">☁️</div>
                        <h3>Consultoría IT</h3>
                        <p>Asesoramiento tecnológico personalizado para optimizar tus procesos y mejorar la eficiencia de tu negocio.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Login Modal -->
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" id="closeModal">&times;</span>
                <h2 id="modalTitle">Iniciar Sesión</h2>
            </div>
            
            <!-- Login Form -->
            <form class="login-form" id="loginForm">
                <div class="form-group">
                    <label for="loginUsername">Usuario o Email:</label>
                    <input type="text" id="loginUsername" name="username" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Contraseña:</label>
                    <input type="password" id="loginPassword" name="password" required>
                </div>
                <button type="submit" class="login-submit">Ingresar</button>
                <div class="forgot-password">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="switch-form">
                    <p>¿No tienes cuenta? <a href="#" id="switchToRegister">Regístrate aquí</a></p>
                </div>
            </form>

            <!-- Register Form -->
            <form class="login-form" id="registerForm" style="display: none;">
                <div class="form-group">
                    <label for="registerName">Nombre Completo:</label>
                    <input type="text" id="registerName" name="fullname" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email:</label>
                    <input type="email" id="registerEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="registerUsername">Usuario:</label>
                    <input type="text" id="registerUsername" name="username" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Contraseña:</label>
                    <input type="password" id="registerPassword" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirmar Contraseña:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <button type="submit" class="login-submit">Crear Cuenta</button>
                <div class="switch-form">
                    <p>¿Ya tienes cuenta? <a href="#" id="switchToLogin">Inicia sesión aquí</a></p>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2024 TechService Pro. Todos los derechos reservados.</p>
    </footer>

    <script>
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
        setInterval(nextSlide, 5000);

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

        // Login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            // Aquí puedes enviar los datos a tu archivo login.php
            const formData = new FormData();
            formData.append('action', 'login');
            formData.append('username', username);
            formData.append('password', password);
            
            // Ejemplo de cómo enviar a PHP:
            // fetch('auth.php', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         window.location.href = 'dashboard.php';
            //     } else {
            //         alert(data.message);
            //     }
            // });
            
            console.log('Login attempt:', { username, password });
            alert('Datos enviados - Conectar con login.php');
            loginModal.style.display = 'none';
        });

        // Register form submission
        const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullname = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Aquí puedes enviar los datos a tu archivo register.php
            const formData = new FormData();
            formData.append('action', 'register');
            formData.append('fullname', fullname);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            
            // Ejemplo de cómo enviar a PHP:
            // fetch('auth.php', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         alert('Cuenta creada exitosamente');
            //         switchToLoginForm();
            //     } else {
            //         alert(data.message);
            //     }
            // });
            
            console.log('Register attempt:', { fullname, email, username, password });
            alert('Datos de registro enviados - Conectar con register.php');
            loginModal.style.display = 'none';
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
    </script>
</body>
</html>