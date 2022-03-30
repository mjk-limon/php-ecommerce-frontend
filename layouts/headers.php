<?php

namespace _ilmComm;

Head\DevInfo::getDevInfo();
$ogInfo = $this->HeadData['oginfo'];
$body_class = $this->mobileView ? 'class="htmlformb"' : '';

$BrandList = $this->extModel("Brands")->brandLists(true);
$BrandGroups = $this->extModel("Brands")->groupBrandList($BrandList);
$AllAboutBeauty = $this->extModel("Home")->getSliders(1);
$TopBrands = array_slice($BrandGroups, 0, 9);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title><?php echo $this->HeadData['title']; ?> Quality Gift Shop In Bangladesh</title>
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
    <div class="floating-sc">
        <div class="sc-btn">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <div><span id="fcTot"><?php echo $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
            <div class="fcamount"><?php echo Models::curr() ?><span id="fcAmnt" class="odometer"><?php echo $this->CartData->getSubTotal() ?></span></div>
        </div>
        <div class="sc-body">
            <div class="clearfix sc-body-top">
                <span class="floating-sc-close"><i class="pe-7s-close"></i></span>
                <h4>CART</h4>
            </div>
            <div id="fsc-content" class="fsc-content slimScroll"></div>
        </div>
    </div>

    <header id="header">
        <div class="site-branding-area">
            <div class="container">
                <div class="header_top_content_section">
                    <div class="row flex branding-flex deskv-hm">
                        <?php
                        if (!$this->mobileView) :
                            //Desktop view header middle
                        ?>
                            <div class="col-md-4 col-xs-5 cols logo-cols">
                                <div class="logo">
                                    <a href="/" id="home-btn">
                                        <img src="<?php echo Models::getLogo() ?>">
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-8 ht-right deskv-hm-movable">
                                <div class="serachbox">
                                    <form action="<?php echo PROJECT_FOLDER . 'search/' ?>" method="get">
                                        <div class="searchfld deskv">
                                            <input type="text" placeholder="Search for Proudcts, Brands..." name="q" autocomplete="off" class="input-text search-q" />
                                            <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
                                            <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="ht-right-icon icon-my-account">
                                    <a class="cb chp db" href="/my-account/"><i class="pe-7s-user"></i></a>
                                    <div class="header-floating-menu login-menu animated fadeInUp">
                                        <ul class="nav">
                                            <?php if (!$this->UserData) : ?>
                                                <li><a href="/login/">Login/Registration</a></li>
                                            <?php else : ?>
                                                <li><a href="/my-account/">Dashboard</a></li>
                                                <li><a href="/my-account/?c=90.03">Order History</a></li>
                                                <li><a href="/my-account/?c=90.02">Wishlists</a></li>
                                                <li><a href="/my-account/?logout">Logout</a></li>
                                            <?php endif; ?>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ht-right-icon icon-shopping-bag">
                                    <a class="cart-contents" href="/my-account/?c=90.04" title="Wishlists">
                                        <i class="pe-7s-bell"></i>
                                        <span class="count"><?php echo $this->NotificationBadge ?></span>
                                    </a>
                                </div>
                                <div class="ht-right-icon icon-shopping-bag">
                                    <a class="cart-contents sc-btn" href="javascript:;" title="View your shopping cart">
                                        <i class="pe-7s-shopbag"></i>
                                        <span class="count">0</span>
                                    </a>
                                </div>
                            </div>
                        <?php
                        else :
                            //Mobile view header top & middle
                        ?>
                            <div class="col-xs-12 head-right-col_">
                                <ul class="ht-right">
                                    <li>
                                        <div class="ht-right-icon icon-toggle-sidemenu">
                                            <a href="javascript:;">
                                                <i class="pe-7s-menu"></i>
                                            </a>
                                        </div>
                                    </li>
                                    <li style="width:70%">
                                        <div class="logo">
                                            <a href="/" id="home-btn">
                                                <img src="<?php echo Models::getLogo() ?>">
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="ht-right-icon icon-shopping-bag">
                                            <a class="cart-contents sc-btn" href="javascript:;" title="View your shopping cart">
                                                <i class="pe-7s-shopbag"></i>
                                                <span class="count">0</span>
                                            </a>
                                        </div>
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
                                            <li><a href="/track-order/">Track Order</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        <?php endif; ?>

                    </div>
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
                            <div class="col-md-12" id="all-dept-btn">
                                <div class="manue mainmenu cacaallpaje">
                                    <ul class="nav navbar-nav">
                                        <?php include "menu.php"; ?>
                                    </ul>
                                    <ul class="nav navbar-nav menunavright">
                                        <li class="dropdown">
                                            <a href="/search/?q=?q=&a_s_t=special_offer">
                                                discount
                                            </a>
                                        </li>
                                        <li class="dropdown">
                                            <a href="/brands/">
                                                brand
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        <?php
                        else :
                            //Mobile view header bottom
                        ?>
                            <div class="col-xs-12">
                                <div class="serachbox">
                                    <form action="<?php echo PROJECT_FOLDER . 'search/' ?>" method="get">
                                        <div class="searchfld deskv">
                                            <input type="text" placeholder="Search for Proudcts, Brands..." name="q" autocomplete="off" class="input-text search-q" />
                                            <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
                                            <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
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
        <section id="skmbcategories" style="display:none">
            <div class="clearfix sc-body-top">
                <span class="floating-sc-close icon-toggle-sidemenu"><i class="pe-7s-close"></i></span>
                <h4>Menu</h4>
            </div>

            <div class="mainmenu">
                <ul class="nav navbar-nav">

                    <?php
                    include "menu.php";
                    ?>

                </ul>
            </div>
        </section>
    <?php endif; ?>

    <div class="linear-activity" id="skeletenLoadActivity">
        <div class="indeterminate"></div>
    </div>
    <section id="skmbcontent" style="display:block">
        <?php
        if ($this->HeadData['content']) {
            echo $this->HeadData['content'];
        }
        ?>
