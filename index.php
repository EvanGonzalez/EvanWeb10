<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evan | MSP</title>
    <link rel="stylesheet" href="css/estiloM.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/carrusel.css">
    <link rel="stylesheet" href="css/info.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="shortcut icon" href="img/logoofical.png" />
</head>

<body class="holy-grail">

    <header>
        <?php include 'components/menu.php'; ?>
    </header>

    <div class="holy-grail-body">

        <section class="holy-grail-content">
             <?php include 'components/carrusel.php'; ?>
            <!-- separación -->
            <?php include 'components/infoindex.php'; ?>
        </section>

        <!-- <div class="holy-grail-sidebar-1 hg-sidebar">
            <p>Sidebar 1</p>
        </div>

        <div class="holy-grail-sidebar-2 hg-sidebar">
            <p>Sidebar 2</p>
        </div> -->

    </div>

    <footer>
        <?php include 'components/footer.php'; ?>
    </footer>
    <script src="js/menu.js"></script>
    <script src="js/carrusel.js"></script>
    <script src="js/footer.js"></script>
</body>

</html>

