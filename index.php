<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechService Pro - Mantenimiento y Servicio Tecnológico</title>
    <link rel="stylesheet" href="css/estiloM.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="nav-container">
            <a href="#" class="logo">
                <img src="img/logowhitefull.svg" alt="TechService Pro" class="logo-svg">
            </a>
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
            <div class="carousel-slide active" style="background-image: linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(118, 75, 162, 0)), url('img/banner.jpg');">
                
            </div>
            
            <!-- Slide 2 - Reemplaza 'images/banner2.jpg' con la ruta de tu imagen -->
            <div class="carousel-slide" style="background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0)), url('img/banner2.jpg');">
                <div class="carousel-content">
                    <h2>Tu PC merece atención</h2>
                    <p>Dale el mantenimiento que necesita y agenda tu cita fácilmente.</p>
                    <a href="#contacto" class="cta-btn">Contactar Ahora</a>
                </div>
            </div>
            
            <!-- Slide 3 - Reemplaza 'images/banner3.jpg' con la ruta de tu imagen -->
            <div class="carousel-slide" style="background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0)), url('img/banner3.jpg');">
                <div class="carousel-content">
                    <h2>Haz tu experiencia más fácil</h2>
                    <p>regístrate y solicita servicios personalizados desde nuestra web.</p>
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
            <form class="login-form" id="loginForm" action="php/auth.php" method="POST">
                <input type="hidden" name="action" value="login">
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
                    <a href="php/forgot_password.php">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="switch-form">
                    <p>¿No tienes cuenta? <a href="#" id="switchToRegister">Regístrate aquí</a></p>
                </div>
            </form>

            <!-- Register Form -->
            <form class="login-form" id="registerForm" action="php/auth.php" method="POST" style="display: none;">
                <input type="hidden" name="action" value="register">
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

    <script src="js/main.js"></script>
</body>
</html>