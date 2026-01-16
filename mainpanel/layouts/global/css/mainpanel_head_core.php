<style type="text/css">
    :root {
        --accent: <?php echo $this->ColrData['accent'] ?>;
        --accentsec: <?php echo $this->ColrData['accentsec'] ?>;
        --secondary: <?php echo $this->ColrData['secondary'] ?>;
        --mainbody: <?php echo $this->ColrData['mainbody'] ?>;
        --innerpage: <?php echo $this->ColrData['innerpage'] ?>;
        --header: <?php echo $this->ColrData['header'] ?>;
        --menubar: <?php echo $this->ColrData['menubar'] ?>;
    }

    /* Make clicks pass-through */
    #nprogress {
        pointer-events: none;
    }

    #nprogress .bar {
        background: var(--accent);

        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px var(--accent), 0 0 5px var(--accentsec);
        opacity: 1.0;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
    }

    #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: var(--accent);
        border-left-color: var(--accent);
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes nprogress-spinner {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>

<link href="<?php echo asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/boo_tslider/__ilm_boo_tslider.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/anim/_ilm_anim.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/flexslider/_ds_flex.css") ?>" rel="stylesheet" />

<link href="<?php echo asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">

<?php $this->layout('style_additional', [], static::LAYOUT_ASSETS_CSS); ?>

<?php if ($this->mobileView) : ?>
    <link href="<?php echo asset("assets/_ilm_own/css/__des_respon_sive.css") ?>" rel="stylesheet">
    <?php $this->layout('style_responsive_additional', [], static::LAYOUT_ASSETS_CSS); ?>
<?php endif; ?>
