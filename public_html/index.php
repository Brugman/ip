<!DOCTYPE html>
<html>
<head>

    <!-- meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- title -->
    <title>Your IP</title>

    <!-- favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="manifest" href="./site.webmanifest">

    <!-- IP CSS -->
    <link rel="stylesheet" href="./assets/css/ip-theme.min.css" />

</head>
<body>

<div class="vc">

    <div class="container">

        <h1>Your IP</h1>

        <div class="input-copy-wrapper">

            <div class="left">

                <input id="visitor-ip" class="" type="text" value="<?=$_SERVER['REMOTE_ADDR'];?>">

            </div><!-- left -->

            <div class="right">

                <button class="button-copy js-clipboard" data-clipboard-target="#visitor-ip" title="Copy to clipboard"><?php include './assets/images/copy-solid.svg'; ?></button>

            </div><!-- right -->

        </div><!-- input-copy-wrapper -->

    </div><!-- container -->

</div><!-- center -->

<!-- Clipboard.JS -->
<script src="./assets/vendor/clipboard.js-2.0.4/clipboard.min.js"></script>
<!-- IP JS -->
<script src="./assets/js/ip-theme.min.js"></script>

</body>
</html>