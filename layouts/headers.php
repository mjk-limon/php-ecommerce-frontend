<?php

namespace _ilmComm;

Head\DevInfo::getDevInfo();
$ogInfo = $this->HeadData['oginfo'];
$body_class = $this->mobileView ? 'class="htmlformb"' : '';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title><?= $this->HeadData['title']; ?></title>
    <meta charset="utf-8">
    <meta name="title" content="<?= $this->HeadData['title'];  ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="<?= COMPANY_NAME ?> top online shopping in bangladesh. Browse our latest products and order online with cash on delivery payment system.">
    <meta name="author" content="<?= Head\DevInfo::getAuthor(); ?>">
    <meta property="og:url" content="<?= $_SERVER['REQUEST_URI'] ?>" />
    <meta property="og:title" content="<?= $ogInfo["title"] ?>" />
    <meta property="og:description" content="<?= $ogInfo["description"] ?>" />
    <meta property="og:image" content="<?= $ogInfo["image"] ?>" />
    <meta property="og:image:type" content="<?= $ogInfo["image_ext"] ?>" />
    <meta property="og:image:width" content="<?= $ogInfo["image_width"] ?>" />
    <meta property="og:image:height" content="<?= $ogInfo["image_height"] ?>" />
    <meta property="og:site_name" content="<?= $_SERVER['HTTP_HOST'] ?>" />
    <meta name="keywords" content="<?= $ogInfo["description"] ?>">

    <link rel="icon" href="<?= Models::asset("favicon.ico") ?>">
    <link href="<?= Models::asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
    <link href="<?= Models::asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
    <link href="<?= Models::asset("assets/vendors/boo_tslider/__ilm_boo_tslider.css") ?>" rel="stylesheet">
    <link href="<?= Models::asset("assets/vendors/anim/_ilm_anim.css") ?>" rel="stylesheet">
    <link href="<?= Models::asset("assets/vendors/flexslider/_ds_flex.css") ?>" rel="stylesheet" />

    <link href="<?= Models::asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">
    <link href="<?= Models::asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
    <link href="<?= Models::asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">

    <script src="<?= Models::asset("assets/vendors/_jquery/jqu_ilm_plugin.js") ?>"></script>
    <script src="<?= Models::asset("assets/vendors/flexslider/__ds_jqu_flex.js") ?>"></script>

    <?php if ($this->mobileView) : ?>
        <link href="<?= Models::asset("assets/_ilm_own/css/__des_respon_sive.css") ?>" rel="stylesheet">
    <?php else : ?>
        <script src="<?= Models::asset("assets/vendors/imagezoom/__ds_details_zoom.js") ?>"></script>
    <?php endif; ?>

    <?php
    Head\AdditionalHead::getAdditionalScripts();
    ?>

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
</head>

<body <?= $body_class ?>>
    <div class="floating-sc">
        <div class="sc-btn">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <div><span id="fcTot"><?php echo $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
            <div><span id="fcAmnt"><?php echo Models::curr($this->CartData->getSubTotal()) ?></span></div>
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
                            <div class="col-md-2 col-xs-5 cols logo-cols">
                                <div class="logo">
                                    <a href="/" id="home-btn">
                                        <img src="<?php echo Models::getLogo() ?>">
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mainmenu-area-quicklinks">
                                    <ul class="m-a-links">
                                        <li><a href="/">CATEGORIES</a></li>
                                        <li>
                                            <a href="/">BRANDS</a>
                                            <div class="header-floating-menu animated fadeInUp slimScroll">
                                                <div class="hfm-brands">
                                                    <h5 class="hfm-title">ALL BRANDS</h5>

                                                    <?php
                                                    $BrandList = $this->extModel("Brands")->brandLists(true);
                                                    $BrandGroups = $this->extModel("Brands")->groupBrandList($BrandList);
                                                    foreach ($BrandGroups as $GK => $GK_Val) :
                                                    ?>
                                                        <div class="brand-group" style="margin-bottom: 1rem">
                                                            <div class="bc-cat-name" style="color:var(--accent)"><?php echo $GK ?></div>
                                                            <div class="flex brand-flex">

                                                                <?php
                                                                foreach ($GK_Val as $BrName) :
                                                                    $BrLink = $BrandList[$BrName]['link'];
                                                                    $BrImg = $BrandList[$BrName]['image'];
                                                                ?>
                                                                    <div class="single-brand">
                                                                        <div class="single-brand-info">
                                                                            <a href="<?php echo $BrLink ?>">
                                                                                <div class="sb-brand-image-placeholder">
                                                                                    <div class="sb-brand-image" style="background-image:url('<?php echo $BrImg ?>')"></div>
                                                                                </div>
                                                                                <div class="sb-brand-title"><?php echo $BrName ?></div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                <?php endforeach; ?>

                                                            </div>
                                                        </div>
                                                    <?php endforeach; ?>

                                                </div>
                                            </div>
                                        </li>
                                        <!--li>
                                            <a href="/">ALL ABOUT BEAUTY</a>
                                            <div class="header-floating-menu animated fadeInUp slimScroll">
                                                <div class="hfm-brands">
                                                    <div class="flex">
                                                        <div class="flex-item">
                                                            <div class="single-layout-grid">
                                                                <div class="slg-image">
                                                                    <a href="">
                                                                        <img src="" />
                                                                    </a>
                                                                </div>
                                                                <div class="slg-text">
                                                                    <h5>Hello</h5>
                                                                    <p>Hanji</p>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li-->
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4 ht-right deskv-hm-movable">
                                <div class="serachbox">
                                    <form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
                                        <div class="searchfld deskv">
                                            <input type="text" placeholder="Search for Proudcts, Brands..." name="q" autocomplete="off" class="input-text search-q" />
                                            <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
                                            <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="ht-right-icon icon-my-account">
                                    <a class="cb chp db" href="https://shop.shajgoj.com/my-account/">
                                        <i class="pe-7s-user"></i>
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
                                                    <li id="cur_BDT"><a href="<?= Models::baseUrl('?cur=BDT') ?>">BDT</a></li>
                                                    <li id="cur_USD"><a href="<?= Models::baseUrl('?cur=USD') ?>">USD</a></li>
                                                    <li id="cur_INR"><a href="<?= Models::baseUrl('?cur=INR') ?>">INR</a></li>
                                                    <li id="cur_GBP"><a href="<?= Models::baseUrl('?cur=GBP') ?>">GBP</a></li>
                                                </ul>
                                            </li>
                                            <?php if (!$this->UserData) : ?>
                                                <li><a class="_ph_RegBtn" href="/register/?ref=<?= urlencode($this->HeadData['ref']) ?>">Join free</a></li>
                                                <li><a class="_ph_LoginBtn" href="/login/?ref=<?= urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
                                            <?php else : ?>
                                                <li><a href="/my-account/?c=90.04">Notifications (<?= $this->NotificationBadge ?>)</a></li>
                                                <li><a href="/my-account/">Update Account</a></li>
                                                <li><a href="/my-account/?c=90.02">My Wishlists</a></li>
                                                <li><a href="/my-account/?c=90.03">Order History</a></li>
                                                <li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?= urlencode($this->HeadData['ref']) ?>">Sign Out</a></li>
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

                                        <?php
                                        include "menu.php";
                                        ?>

                                    </ul>
                                </div>
                            </div>
                        <?php
                        else :
                            //Mobile view header bottom
                        ?>
                            <div class="col-xs-12">
                                <div class="serachbox">
                                    <form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
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
        <?php if ($this->HeadData['content']) echo $this->HeadData['content'] ?>
