<?php

namespace _ilmComm;

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="<?php echo Head\DevInfo::getAuthor(); ?>">
    <title>Merchant Panel || <?php echo COMPANY_NAME ?></title>

    <style type="text/css">
    :root {
        --accent: <?= $this->ColrData['accent'] ?>;
        --accentsec: <?= $this->ColrData['accentsec'] ?>;
        --secondary: <?= $this->ColrData['secondary'] ?>;
        --mainbody: <?= $this->ColrData['mainbody'] ?>;
        --innerpage: <?= $this->ColrData['innerpage'] ?>;
        --header: <?= $this->ColrData['header'] ?>;
        --menubar: <?= $this->ColrData['menubar'] ?>;
    }

    </style>

    <link rel="icon" href="<?php echo Models::asset("favicon.ico") ?>">
    <link href="<?php echo Models::asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/_ilm_own/css/__ilm_marc_hant_design.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">

    <script src="<?php echo Models::asset("assets/vendors/_jquery/jqu_ilm_plugin.js") ?>"></script>
    <script src="<?php echo Models::asset("assets/vendors/__boo_tstrap/__ilm_boot_min.js") ?>"></script>

    <?php
    Head\AdditionalHead::getAdditionalScripts();
    ?>
</head>

<body>
    <div class="page-alert" data-close="pageAlert">
        <div class="alertClose" data-close="pageAlert">&times;</div>
        <div class="alert-text"></div>
    </div>

    <header id="header">
        <div class="fixed-header-menu">
            <div class="site-branding-area marchant-brading">
                <div class="container-fluid">
                    <div class="row flex" style="align-items:center;">
                        <div class="col-md-3 col-sm-4 col-xs-12 ">
                            <div class="logo">
                                <a href="">
                                    <img src="<?php echo Models::getLogo(2) ?>">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-5 col-xs-12">
                            <div class="searchfld deskv">
                                <input type="text" placeholder="Search here" name="q" autocomplete="off" class="input-text search-q" />
                                <button type="submit" class="subs"><i class="fa fa-search subsi"></i></button>
                                <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3 col-xs-12 ">
                            <ul class="wishlistall">
                                <li>
                                    <a href="<?php echo Models::baseUrl('sellercorner/user-account/') ?>" title="User Panel">
                                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo Models::baseUrl('sellercorner/user-account/?logout') ?>" title="Logout">
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sidebar">
                <?php
                include "merchant-sidebar-menu.php";
                ?>
            </div>
        </div>
    </header>
    <div class="header-top-margin"></div>

    <div class="main-body">
        <div class="container-fluid">
            <?php
            if ($this->HeadData['content']) {
                echo $this->HeadData['content'];
            }
            ?>
