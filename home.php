<?php

namespace _ilmComm;

$sp = $this->SingleProduct;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
$slideSize = array(($this->HomeGridNumber * 125), (($this->HomeGridNumber + 1) * 125));
?>

<?php if (!$this->mobileView) : ?>
    <div class="container home-floating-menu-container">

    </div>
<?php endif; ?>

<script type="text/javascript">
    slideSize = {
        width: <?php echo $slideSize[0] ?>,
        height: <?php echo $slideSize[1] ?>
    };
</script>
<div class="homepage-top-section">
    <div class="container">
        <div class="row">
            <div class="col-md-3 menu-selection hidden-xs">
                <div id="all-dept-menus" class="all-dept-menus">
                    <div class="manue mainmenu index-menu">
                        <ul class="nav navbar-nav slimScroll">

                            <?php
                            include "layouts/menu.php";
                            ?>

                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9 slider-section">
                <div class="banner-slider-holder">
                    <div id="slider">
                        <div class="banner-slider" id="sliderb_container" style="position: relative;left: 0px; width: 1349px;height: 415px; overflow: hidden;">
                            <div u="slides" style="cursor: move; position: absolute;left: 0px;top: 0px; width:1349px; height: 415px;overflow: hidden;">

                                <?php
                                $Slider1 = $this->TopSlider;
                                while ($ArrSlider = $Slider1->fetch_array()) :
                                ?>
                                    <div>
                                        <a href="<?php echo $ArrSlider['image_link'] ?>">
                                            <img u="image" src="<?php echo Models::asset($ArrSlider['image']) ?>" />
                                        </a>
                                    </div>
                                <?php
                                endwhile;
                                $Slider1->free();
                                ?>

                            </div>
                            <div data-u="navigator" class="jssorb034" style="position:absolute;bottom:16px;right:16px;" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">
                                <div data-u="prototype" class="i" style="width:13px;height:13px;">
                                    <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                        <path class="b" d="M11400,13800H4600c-1320,0-2400-1080-2400-2400V4600c0-1320,1080-2400,2400-2400h6800 c1320,0,2400,1080,2400,2400v6800C13800,12720,12720,13800,11400,13800z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="main-body">
    <div class="spd">
        <div class="container">
            <div class="section-mb" style="background-color: transparent;">
                <div class="ft-pr-sliders home-product-categories">
                    <ul class="products columns-5">
                        <?php
                        $remi = 0;
                        $Cat = new Category\FetchCategories;
                        $MainCats = $Cat->fetchMain();

                        while ($ArrMain = $MainCats->fetch_assoc()) :
                            $Cat->setCatId($ArrMain['id']);
                            $Cat->setMain($ArrMain['main']);
                            $Cat->setSubGroup(null);
                            $Cat->setSub(null);

                            $BrowseCatProducts = $this->browseCatProducts($Cat->CatId, 9999);
                            $ProductInCategory = $BrowseCatProducts->num_rows;
                            $CatImg = Models::baseUrl('images/category-slides/' . Models::restyleUrl($Cat->Mainc) . '-2.png?rand=' . rand());

                            if ($remi >= 12) {
                                continue;
                            }

                        ?>
                            <li class="product-category product first">
                                <a href="<?php echo $Cat->getHref() ?>">
                                    <img src="<?php echo $CatImg ?>" alt="<?php echo htmlspecialchars($Cat->Mainc) ?>">
                                    <h2 class="ds-loop-category__title">
                                        <?php echo htmlspecialchars($Cat->Mainc) ?>
                                    </h2>
                                </a>
                            </li>
                        <?php

                            $remi++;
                        endwhile;
                        ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-product-area">

                    <?php
                    $St_i = 1;
                    $Cat = new Category\FetchCategories;
                    $MainCats = $Cat->fetchMain();

                    while ($ArrMain = $MainCats->fetch_assoc()) :
                        $Cat->setCatId($ArrMain['id']);
                        $Cat->setMain($ArrMain['main']);
                        $Cat->setSubGroup(null);
                        $Cat->setSub(null);

                        $BrowseCatProducts = $this->browseCatProducts($Cat->CatId, 10);
                        if ($BrowseCatProducts->num_rows) :
                    ?>
                            <div class="bc-single">
                                <div class="bc-cat-all">
                                    <a href="<?php echo $Cat->getHref() ?>">View All</a>
                                    <span class="bc-cat-name"><?php echo htmlspecialchars($Cat->Mainc) ?></span>
                                </div>
                                <div class="grid-row">

                                    <?php
                                    include "layouts/home-page-browse-category-products.php";
                                    ?>

                                </div>
                            </div>
                    <?php
                            $St_i++;
                        endif;
                    endwhile;
                    ?>

                </div>
            </div>
        </div>
    </div>
</section>

<link href="<?php echo Models::asset("assets/vendors/jssor/jssor-additional.css") ?>" rel="stylesheet" />
<script src="<?= Models::asset("assets/vendors/jssor/jssor.js") ?>"></script>
<script src="<?= Models::asset("assets/vendors/jssor/jssor.slider.js") ?>"></script>
<script defer src="<?php echo Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>