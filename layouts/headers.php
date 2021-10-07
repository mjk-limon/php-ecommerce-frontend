<?php

namespace _ilmComm;

Head\DevInfo::getDevInfo();
$ogInfo = $this->HeadData['oginfo'];
$body_class = $this->mobileView ? 'class="htmlformb"' : '';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title><?php echo $this->HeadData['title']; ?></title>
    <meta charset="utf-8">
    <meta name="title" content="<?php echo $this->HeadData['title'];  ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="<?php echo COMPANY_NAME ?> top online shopping in bangladesh. Browse our latest products and order online with cash on delivery payment system.">
    <meta name="author" content="<?php echo Head\DevInfo::getAuthor(); ?>">
    <meta property="og:url" content="<?php echo $_SERVER['REQUEST_URI'] ?>" />
    <meta property="og:title" content="<?php echo $ogInfo["title"] ?>" />
    <meta property="og:description" content="<?php echo $ogInfo["description"] ?>" />
    <meta property="og:image" content="<?php echo $ogInfo["image"] ?>" />
    <meta property="og:image:type" content="<?php echo $ogInfo["image_ext"] ?>" />
    <meta property="og:image:width" content="<?php echo $ogInfo["image_width"] ?>" />
    <meta property="og:image:height" content="<?php echo $ogInfo["image_height"] ?>" />
    <meta property="og:site_name" content="<?php echo $_SERVER['HTTP_HOST'] ?>" />
    <meta name="keywords" content="<?php echo $ogInfo["description"] ?>">

    <link rel="icon" href="<?php echo Models::asset("favicon.ico") ?>">
    <link href="<?php echo Models::asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/vendors/boo_tslider/__ilm_boo_tslider.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/vendors/anim/_ilm_anim.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/vendors/flexslider/_ds_flex.css") ?>" rel="stylesheet" />

    <link href="<?php echo Models::asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
    <link href="<?php echo Models::asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">

    <script src="<?php echo Models::asset("assets/vendors/_jquery/jqu_ilm_plugin.js") ?>"></script>
    <script src="<?php echo Models::asset("assets/vendors/flexslider/__ds_jqu_flex.js") ?>"></script>

    <?php if ($this->mobileView) : ?>
        <link href="<?php echo Models::asset("assets/_ilm_own/css/__des_respon_sive.css") ?>" rel="stylesheet">
    <?php else : ?>
        <script src="<?php echo Models::asset("assets/vendors/imagezoom/__ds_details_zoom.js") ?>"></script>
    <?php endif; ?>

    <?php
    Head\AdditionalHead::getAdditionalScripts();
    ?>

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
    </style>
</head>

<body <?php echo $body_class ?>>

    <?php if (!$this->mobileView) : ?>
        <div class="floating-sc">
            <div class="sc-btn">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <div><span id="fcTot"><?php echo $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
            </div>
            <div class="sc-body">
                <div class="clearfix sc-body-top">
                    <span class="floating-sc-close">&times;</span>
                    <h4>Shopping Cart</h4>
                    <span class="scb-ct"><?php echo $this->CartData->getTotalItem() ?> ITEM(S)</span>
                </div>
                <div id="fsc-content" class="fsc-content slimScroll"></div>
            </div>
        </div>
    <?php endif; ?>

    <header id="header">
        <?php
        if (!$this->mobileView) :
            //Desktop view header top
        ?>
            <div class="header_top">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 hidden-xs">
                            <div class="top-user-nav">
                                <ul class="nav nav-pills">
                                    <li>
                                        <a href="#" onclick="window.open('tel:<?php echo Models::getContactInformation("mobile1") ?>')">
                                            Hotline: <span><?php echo Models::getContactInformation("mobile1") ?></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="window.open('mailto:<?php echo Models::getContactInformation("email") ?>')">
                                            Mail Us: <span><?php echo Models::getContactInformation("email") ?></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-12">
                            <div class="header-right">
                                <ul class="list-unstyled list-inline">

                                    <?php if ($this->UserData) : ?>
                                        <li class="dropdown">
                                            <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">
                                                <span class="key"><i class="fa fa-user"></i> My Account</span><b class="caret"></b></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="/my-account/">Update Account</a></li>
                                                <li><a href="/my-account/?c=90.02">My Wishlists</a></li>
                                                <li><a href="/my-account/?c=90.03">Order History</a></li>
                                                <li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?php echo urlencode($this->HeadData['ref']) ?>">Logout</a></li>
                                            </ul>
                                        </li>
                                    <?php endif; ?>

                                    <li><a href="/my-account/?c=90.02">Wishlists</a></li>
                                    <li class="dropdown dropdown-small">
                                        <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">
                                            <span class="key">English (US)</span><b class="caret"></b></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="?lang=en">English</a></li>
                                            <!--li><a href="?lang=bn">বাংলা</a></li-->
                                        </ul>
                                    </li>
                                    <li class="dropdown dropdown-small">
                                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                            <span class="key"><?php echo Models::curr(); ?></span><b class="caret"></b>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li id="cur_BDT"><a href="<?php echo Models::baseUrl('?cur=BDT') ?>">BDT</a></li>
                                            <li id="cur_USD"><a href="<?php echo Models::baseUrl('?cur=USD') ?>">USD</a></li>
                                            <li id="cur_INR"><a href="<?php echo Models::baseUrl('?cur=INR') ?>">INR</a></li>
                                            <li id="cur_GBP"><a href="<?php echo Models::baseUrl('?cur=GBP') ?>">GBP</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <div class="site-branding-area">
            <div class="container">
                <div class="row flex branding-flex deskv-hm">
                    <div class="col-md-3 col-xs-5 cols logo-cols">
                        <div class="logo">
                            <a href="/" id="home-btn"><img src="<?php echo Models::asset("images/logo.svg") ?>"></a>
                        </div>
                    </div>

                    <?php
                    if (!$this->mobileView) :
                        //Desktop view header middle
                    ?>
                        <div class="col-md-9 deskv-hm-movable">
                            <div class="row">
                                <div class="col-md-9 hidden-xs">
                                    <div class="serachbox">
                                        <form action="<?php echo PROJECT_FOLDER . 'search/' ?>" method="get">
                                            <div class="searchfld deskv">
                                                <input type="text" placeholder="Search here" name="q" autocomplete="off" class="input-text search-q" />
                                                <button type="submit" class="subs"><i class="fa fa-search subsi"></i></button>
                                                <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-md-3 hidden-xs">
                                    <ul class="wishlistall">
                                        <li><a href="/my-account/?c=90.04" title="Notification"><i class="fa fa-bell"></i> <span class="badge"><?php echo $this->NotificationBadge ?></span></a></li>
                                        <li><a href="/contact/" title="Support"><i class="fa fa-question-circle"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    <?php
                    else :
                        //Mobile view header top & middle
                    ?>
                        <div class="col-xs-7 head-right-col_">
                            <ul class="ht-right">
                                <li><input type="text" class="m-ht-search tsearch-icon" placeholder="Search for products" />
                                </li>
                                <li class="dropdown ht-top-shortcut">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-right animated slideDown">
                                        <li>
                                            <a href="javascript:;" onclick="$('#ht-currency').collapse('toggle');event.stopPropagation()">Currency <span class="caret"></span></a>
                                            <ul class="collapse" id="ht-currency">
                                                <li id="cur_BDT"><a href="<?php echo Models::baseUrl('?cur=BDT') ?>">BDT</a></li>
                                                <li id="cur_USD"><a href="<?php echo Models::baseUrl('?cur=USD') ?>">USD</a></li>
                                                <li id="cur_INR"><a href="<?php echo Models::baseUrl('?cur=INR') ?>">INR</a></li>
                                                <li id="cur_GBP"><a href="<?php echo Models::baseUrl('?cur=GBP') ?>">GBP</a></li>
                                            </ul>
                                        </li>
                                        <?php if (!$this->UserData) : ?>
                                            <li><a class="_ph_RegBtn" href="/register/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Join free</a></li>
                                            <li><a class="_ph_LoginBtn" href="/login/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
                                        <?php else : ?>
                                            <li><a href="/my-account/?c=90.04">Notifications (<?php echo $this->NotificationBadge ?>)</a></li>
                                            <li><a href="/my-account/">Update Account</a></li>
                                            <li><a href="/my-account/?c=90.02">My Wishlists</a></li>
                                            <li><a href="/my-account/?c=90.03">Order History</a></li>
                                            <li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?php echo urlencode($this->HeadData['ref']) ?>">Sign Out</a></li>
                                        <?php endif; ?>

                                        <li><a href="/brands/">Brands</a></li>
                                        <li><a href="/search/?q=?q=&a_s_t=special_offer"><?php echo $this->OfferText ?></a></li>
                                        <li><a href="/track-order/">Track Order</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    <?php endif; ?>

                </div>
            </div>
        </div>

        <div class="sticky-wrapper">
            <div class="mainmenu-area1">
                <div class="container">
                    <div class="row deskv-hb">
                        <?php
                        if (!$this->mobileView) :
                            //Desktop view header bottom
                        ?>
                            <div class="col-md-3" id="all-dept-btn" style="padding-right:0px">
                                <div class="manue dropdown mainmenu cacaallpaje">
                                    <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="javascript:;">
                                        <i class="fa fa-list-ul" aria-hidden="true"></i> ALL DEPARTMENTS
                                    </a>
                                    <ul class="nav navbar-nav dropdown-menu">
                                        <?php include "menu.php"; ?>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-9 cols hidden-xs">
                                <div class="mainmenu-area-quicklinks">
                                    <ul class="m-a-links">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/brands/">Brands</a></li>
                                        <li><a href="/search/?q=?q=&a_s_t=special_offer"><?php echo $this->OfferText ?></a></li>
                                        <li><a href="/track-order/">Track Order</a></li>

                                        <?php if (!$this->UserData) : ?>
                                            <li><a class="_ph_RegBtn" href="/register/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Join free</a></li>
                                            <li><a class="_ph_LoginBtn" href="/login/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
                                        <?php else : ?>
                                            <li><a href="/my-account/">User Account</a></li>
                                        <?php endif; ?>

                                        <li><a href="/contact/">Support</a></li>
                                    </ul>
                                </div>
                            </div>
                        <?php
                        else :
                            //Mobile view header bottom
                        ?>
                            <div class="col-xs-4 m-hb-grid cntntTab active" data-target="#skmbcontent">
                                <div class="m-hb-grid-menu">
                                    <i class="fa fa-th-large"></i> Main
                                </div>
                            </div>

                            <div class="col-xs-4 m-hb-grid tb-2" data-target="#skmbcategories">
                                <div class="m-hb-grid-menu">
                                    <i class="fa fa-th-list"></i> Categories
                                </div>
                            </div>

                            <div class="col-xs-4 m-hb-grid tb-3" data-target="#skmbcart">
                                <div class="m-hb-grid-menu sc-btn">
                                    <span id="fcTot" class="badge"><?php echo $this->CartData->getTotalItem() ?></span>
                                    <i class="fa fa-shopping-cart "></i> Cart
                                </div>
                            </div>
                            <div class="tabbed-section__highlighter"></div>
                        <?php endif; ?>

                    </div>
                </div>
            </div>
        </div>
    </header>
    <div id="skbc-top-margin"></div>

    <?php
    if ($this->mobileView) :
        //Mobile view header toggle tabs
    ?>
        <div class="mb-top-search">
            <div class="search-area">
                <form method="GET" action="<?php echo PROJECT_FOLDER . 'search/' ?>">
                    <div class="m-flex">
                        <a href="javascript:;" class="tclose-icon tsearch-icon"><i class="fa fa-arrow-left"></i></a>
                        <input type="text" class="search-q" name="q" placeholder="Type product id, name, category..." />
                        <button type="submit" class="tsearch-btn"><i class="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div class="mb-ts-backdrop srch-datalist" id="search-suggestions"></div>
        </div>

        <section id="skmbcategories" style="display:none">
            <div class="mainmenu">
                <ul class="nav navbar-nav">
                    <?php include "menu.php"; ?>
                </ul>
            </div>
        </section>

        <section id="skmbcart" class="mbl-tab-sc" style="display:none">
            <div class="sc-body">
                <div class="sc-body-top">
                    <h4>Shopping Cart</h4>
                    <span class="scb-ct"><?php echo $this->CartData->getTotalItem() ?> ITEM(S)</span>
                </div>
                <div id="fsc-content" class="fsc-content slimScroll"></div>
            </div>
        </section>
    <?php endif; ?>

    <section id="skmbcontent" style="display:block">
        <?php
        if ($this->HeadData['content']) {
            echo $this->HeadData['content'];
        }
        ?>