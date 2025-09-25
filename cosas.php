<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Sitio Web Responsive</title>
   
</head>
<body>

    <header>
        <div class="container">
            <div class="logo">
                <a href="#">Tu Logo</a>
            </div>
            <ul class="nav-links">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#acerca-de">Acerca de</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </div>
    </header>

    <main>

        <section id="inicio" class="hero">
            <div class="hero-content">
                <h1>Bienvenido a mi sitio web</h1>
                <p>Contenido destacado para captar la atención de tus visitantes.</p>
                <a href="#contacto" class="btn">Contáctanos</a>
            </div>
        </section>

        <section id="acerca-de" class="about">
            <div class="container">
                <h2>Acerca de nosotros</h2>
                <p>Aquí puedes hablar sobre tu empresa, tu misión y tus valores.</p>
            </div>
        </section>

        <section id="servicios" class="services">
            <div class="container">
                <h2>Nuestros servicios</h2>
                <div class="service-container">
                    <div class="service-item">
                        <h3>Servicio 1</h3>
                        <p>Descripción breve del servicio 1.</p>
                    </div>
                    <div class="service-item">
                        <h3>Servicio 2</h3>
                        <p>Descripción breve del servicio 2.</p>
                    </div>
                    <div class="service-item">
                        <h3>Servicio 3</h3>
                        <p>Descripción breve del servicio 3.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="contacto" class="contact">
            <div class="container">
                <h2>Contáctanos</h2>
                <form action="#" method="POST">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="mensaje">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" rows="4" required></textarea>

                    <button type="submit" class="btn">Enviar</button>
                </form>
            </div>
        </section>

    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
            <div class="social-links">
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
            </div>
        </div>
    </footer>

</body>
</html>