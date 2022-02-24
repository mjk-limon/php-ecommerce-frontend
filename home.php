<?php

namespace _ilmComm;

$sp = $this->SingleProduct;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
$slideSize = array(($this->HomeGridNumber * 100), (($this->HomeGridNumber + 1) * 100));
?>

<div class="homepage-top-section">
    <div id="slider">
        <div class="banner-slider" id="sliderb_container" style="position: relative;left: 0px; width: 1920px;height: 490px; overflow: hidden;">
            <div data-u="loading" style="position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-position:50% 50%;background-repeat:no-repeat;background-image:url('images/puff-x.svg');background-color:rgba(0, 0, 0, 0.7);background-size:30px 30px;"></div>
            <div u="slides" style="cursor: move; position: absolute;left: 0px;top: 0px; width:1920px; height: 490px;overflow: hidden;">

                <?php
                $Slider = $this->TopSlider;
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div>
                        <a href="<?php echo $ArrSlider['image_link'] ?>">
                            <img u="image" src="<?php echo Models::asset($ArrSlider['image']) ?>" />
                        </a>
                    </div>
                <?php
                endwhile;
                $Slider->free();
                ?>

            </div>
            <div data-u="navigator" class="jssorb061" style="position:absolute;bottom:12px;right:12px;" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">
                <div data-u="prototype" class="i" style="width:12px;height:12px;">
                    <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                        <circle class="b" cx="8000" cy="8000" r="5800"></circle>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="main-body">
    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="prgrid-ads-section">
                    <a href="<?php echo $this->TopSticker1['image_link'] ?>" class="prgrid-ad-img">
                        <img src="<?php echo $this->TopSticker1['image'] ?>" alt="Banner 1">
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="row">

                    <?php
                    $Slider = $this->getSliders(3);
                    while ($ArrSlider = $Slider->fetch_array()) :
                    ?>
                        <div class="col-md-3">
                            <div class="single-layout-grid">
                                <div class="slg-image">
                                    <a href="<?php echo $ArrSlider['image_link'] ?>">
                                        <img src="<?php echo Models::asset($ArrSlider['image']) ?>" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php
                    endwhile;
                    $Slider->free();
                    ?>

                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">NEW ARRIVALS</div>
                </div>
                <div class="row">
                    <?php
                    $Slider = $this->getSliders(5);
                    while ($ArrSlider = $Slider->fetch_array()) :
                    ?>
                        <div class="col-md-4">
                            <div class="single-layout-grid">
                                <div class="slg-image">
                                    <a href="<?php echo $ArrSlider['image_link'] ?>">
                                        <img src="<?php echo Models::asset($ArrSlider['image']) ?>" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php
                    endwhile;
                    $Slider->free();
                    ?>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">Browse Our Categories</div>
                </div>
                <div class="bc-product-area">

                    <?php
                    $Cat = new Category\FetchCategories;
                    $MainCats = $Cat->fetchMain();

                    while ($ArrMain = $MainCats->fetch_assoc()) :
                        $Cat->setCatId($ArrMain['id']);
                        $Cat->setMain($ArrMain['main']);
                        $Cat->setSubGroup(null);
                        $Cat->setSub(null);

                        $BrowseCatProducts = $this->browseCatProducts($Cat->CatId);
                        if ($BrowseCatProducts->num_rows) :
                    ?>
                            <div class="bc-single">
                                <div class="bc-cat-all">
                                    <a href="<?php echo $Cat->getHref() ?>">View All</a>
                                    <span class="bc-cat-name"><?php echo htmlspecialchars($Cat->Mainc) ?></span>
                                </div>
                                <div class="grid-row">

                                    <?php
                                    while ($TrPr = $BrowseCatProducts->fetch_assoc()) :
                                        $sp->setPrInfo($TrPr);
                                        $sp->processDiscount();
                                        $sp->processStock();
                                    ?>
                                        <div class="grids">
                                            <div class="bc-products">
                                                <div class="single-product <?php echo $spAddClass ?>">
                                                    <div class="sp-image">

                                                        <?php if ($sp->getDiscount()) : ?>
                                                            <span class="sp-dis">-<?php echo round($sp->getDiscount()) ?>%</span>
                                                        <?php endif; ?>

                                                        <a href="<?php echo $sp->getHref() ?>">
                                                            <img src="<?php echo $sp->getProductImage() ?>" />
                                                        </a>
                                                    </div>
                                                    <div class="has-sp-nav">
                                                        <div class="sp-pr">
                                                            <div class="sp-pr-info">
                                                                <a href="<?php echo $sp->getHref() ?>">
                                                                    <h5><?php echo $sp->getName() ?></h5>
                                                                </a>
                                                                <p>
                                                                    <strong class="price"><?php echo Models::curr($sp->getPrice()) ?></strong>

                                                                    <?php if ($sp->getDiscount()) : ?>
                                                                        <strong class="p-old"><?php echo Models::curr($sp->getPrice(0)) ?></strong>
                                                                    <?php endif; ?>

                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="sp-nav">
                                                            <em data-prid="<?php echo $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
                                                            <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
                                                            <a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php
                                    endwhile;
                                    ?>

                                </div>
                            </div>
                    <?php
                        endif;
                    endwhile;
                    ?>

                </div>
            </div>
        </div>
    </div>
</section>


<link href="<?php echo Models::asset("assets/vendors/jssor/jssor-additional.css") ?>" rel="stylesheet" />
<script type="text/javascript">
slideSize = {
    width: <?php echo $slideSize[0] ?>,
    height: <?php echo $slideSize[1] ?>
};
</script>
<script src="<?php echo Models::asset("assets/vendors/jssor/jssor.js") ?>"></script>
<script src="<?php echo Models::asset("assets/vendors/jssor/jssor.slider.js") ?>"></script>
<script defer src="<?php echo Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>
<script defer src="<?php echo Models::asset('assets/_ilm_own/js/app/_ilm_Otp_login.js') ?>"></script>
