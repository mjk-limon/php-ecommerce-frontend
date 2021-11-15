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

<div class="homepage-top-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 slider-section">
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
            <div class="trending-categories">
                <div class="tc-list">
                    <a href="<?php echo $this->TopSticker3['image_link'] ?>" style="margin-right:10px;">
                        <img src="<?php echo $this->TopSticker3['image'] ?>" class="img-responsive" alt="Banner image">
                    </a>
                    <a href="<?php echo $this->TopSticker4['image_link'] ?>">
                        <img src="<?php echo $this->TopSticker4['image'] ?>" class="img-responsive" alt="Banner image">
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-mb bg-main">
                <div class="ft-title">
                    <div class="ft-title-left">
                        <span class="ft-ft-title">TRENDING PACKAGES</span>
                    </div>
                </div>
                <div class="ft-pr-sliders">
                    <div <?php echo !$this->mobileView ? 'id="trendsale" style="position:relative;margin:0 auto;top:0px;left:0px;width:1200px;height:' . $slideSize[1] . 'px;overflow:hidden;visibility:hidden;"' : null ?>>
                        <div <?php echo !$this->mobileView ? 'data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1200px;height:' . $slideSize[1] . 'px;overflow:hidden;"' : 'class="m-flex ft-pr-mbl"' ?>>

                            <?php
                            $TrendingProducts = $this->Trendings;
                            while ($TrPr = $TrendingProducts->fetch_assoc()) :
                                $sp->setPrInfo($TrPr);
                                $sp->processDiscount();
                                $sp->processStock();
                            ?>
                                <div class="single-product" style="background-color:#fff">
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
                                            <a href="<?php echo $sp->getHref() ?>" class="buy-now">View Package</a>
                                        </div>
                                    </div>
                                </div>
                            <?php endwhile; ?>

                        </div>

                        <?php if (!$this->mobileView) : ?>
                            <div data-u="arrowleft" class="jssora082" style="width:30px;height:40px;top:0px;left:30px;" data-autocenter="2" data-scale="0.75" data-scale-left="0.75">
                                <svg viewbox="2000 0 12000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                    <path class="c" d="M4800,14080h6400c528,0,960-432,960-960V2880c0-528-432-960-960-960H4800c-528,0-960,432-960,960 v10240C3840,13648,4272,14080,4800,14080z"></path>
                                    <path class="a" d="M6860.8,8102.7l1693.9,1693.9c28.9,28.9,63.2,43.4,102.7,43.4s73.8-14.5,102.7-43.4l379-379 c28.9-28.9,43.4-63.2,43.4-102.7c0-39.6-14.5-73.8-43.4-102.7L7926.9,8000l1212.2-1212.2c28.9-28.9,43.4-63.2,43.4-102.7 c0-39.6-14.5-73.8-43.4-102.7l-379-379c-28.9-28.9-63.2-43.4-102.7-43.4s-73.8,14.5-102.7,43.4L6860.8,7897.3 c-28.9,28.9-43.4,63.2-43.4,102.7S6831.9,8073.8,6860.8,8102.7L6860.8,8102.7z"></path>
                                </svg>
                            </div>
                            <div data-u="arrowright" class="jssora082" style="width:30px;height:40px;top:0px;right:30px;" data-autocenter="2" data-scale="0.75" data-scale-right="0.75">
                                <svg viewbox="2000 0 12000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                    <path class="c" d="M11200,14080H4800c-528,0-960-432-960-960V2880c0-528,432-960,960-960h6400 c528,0,960,432,960,960v10240C12160,13648,11728,14080,11200,14080z"></path>
                                    <path class="a" d="M9139.2,8102.7L7445.3,9796.6c-28.9,28.9-63.2,43.4-102.7,43.4c-39.6,0-73.8-14.5-102.7-43.4 l-379-379c-28.9-28.9-43.4-63.2-43.4-102.7c0-39.6,14.5-73.8,43.4-102.7L8073.1,8000L6860.8,6787.8 c-28.9-28.9-43.4-63.2-43.4-102.7c0-39.6,14.5-73.8,43.4-102.7l379-379c28.9-28.9,63.2-43.4,102.7-43.4 c39.6,0,73.8,14.5,102.7,43.4l1693.9,1693.9c28.9,28.9,43.4,63.2,43.4,102.7S9168.1,8073.8,9139.2,8102.7L9139.2,8102.7z"></path>
                                </svg>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-mb" style="background-color: transparent;">
                <div class="ft-pr-sliders home-product-categories">
                    <ul class="products columns-4">
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
                            $CatImg = Models::baseUrl('images/category-slides/' . Models::restyleUrl($Cat->Mainc) . '-1.jpg?rand=' . rand());
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
</section>

<link href="<?php echo Models::asset("assets/vendors/jssor/jssor-additional.css") ?>" rel="stylesheet" />
<script type="text/javascript">
    slideSize = {
        width: <?php echo $slideSize[0] ?>,
        height: <?php echo $slideSize[1] ?>
    };
</script>
<script src="<?= Models::asset("assets/vendors/jssor/jssor.js") ?>"></script>
<script src="<?= Models::asset("assets/vendors/jssor/jssor.slider.js") ?>"></script>
<script defer src="<?php echo Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>