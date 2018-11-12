<!DOCTYPE html>
<html>
<head>

    <!-- meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- title -->
    <title>IP</title>

<?php

$google_fonts = [
    'Abel',
    'Amaranth',
    'Archivo',
    'Archivo Black',
    'Armata',
    'Athiti',
    'Bai Jamjuree',
    'Bungee Hairline',
    'Bungee Inline',
    'Bungee Outline',
    'Bungee Shade',
    'Coda',
    'Contrail One',
    'Dokdo',
    'Gochi Hand',
    'Gruppo',
];

$google_fonts_url = 'https://fonts.googleapis.com/css?family=';
foreach ( $google_fonts as $font )
    $google_fonts_url .= str_replace( ' ', '+', $font ).'|';

?>
    <link rel="stylesheet" href="<?=$google_fonts_url;?>" />
    <style>
    h1 { font-family: <?=$google_fonts[6];?>; }
    #visitor-ip { font-family: <?=$google_fonts[11];?>; }
    </style>

    <!-- site css -->
    <link rel="stylesheet" href="/assets/css/ip-theme.min.css" />

</head>
<body>

<div class="vc">

    <div class="container">

        <h1>Your IP</h1>

        <div class="input-copy-wrapper">

            <div class="left">

                <input id="visitor-ip" class="" type="text" value="<?=$_SERVER['SERVER_ADDR'];?>">

            </div><!-- left -->

            <div class="right">

                <button class="button-copy js-clipboard" data-clipboard-target="#visitor-ip" title="Copy to clipboard"><?php include './assets/images/copy-light.svg'; ?></button>

            </div><!-- right -->

        </div><!-- input-copy-wrapper -->

    </div><!-- container -->

</div><!-- center -->

<!-- Clipboard.JS -->
<script src="/assets/js/vendor/clipboard.js-2.0.0/dist/clipboard.min.js"></script>
<!-- site js -->
<script src="/assets/js/ip-theme.min.js"></script>

<?php if ( in_array( substr( $_SERVER['SERVER_ADDR'], 0, 3 ), array( '127', '192', '172', '10.' ) ) ): ?>
<!-- Livereload -->
<script src="http://<?=$_SERVER['HTTP_HOST'];?>:35729/livereload.js"></script>
<?php endif; // Livereload ?>

</body>
</html>