<?php

namespace _ilmComm;

$sp = $this->SingleProduct;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
$slideSize = array(($this->HomeGridNumber * 100), (($this->HomeGridNumber + 1) * 100));
?>

<div class="homepage-top-section">
    <div id="slider">
        <div class="banner-slider" id="sliderb_container" style="position: relative;left: 0px; width: 1920px;height: 650px; overflow: hidden;">
            <div data-u="loading" style="position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-position:50% 50%;background-repeat:no-repeat;background-image:url('images/puff-x.svg');background-color:rgba(0, 0, 0, 0.7);background-size:30px 30px;"></div>
            <div u="slides" style="cursor: move; position: absolute;left: 0px;top: 0px; width:1920px; height: 650px;overflow: hidden;">

                <?php
                $Slider = $this->TopSlider;
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div>
                        <a href="<?php echo $ArrSlider['image_link'] ?>">
                            <img u="image" src2="<?php echo Models::asset($ArrSlider['image']) ?>" />
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

<section class="main-body bg-white" style="min-height: auto;">
    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="prgrid-ads-section">
                    <div class="flex">
                        <div class="prgrid-ad-img">
                            <a href="<?php echo $this->TopSticker1['image_link'] ?>">
                                <img src="<?php echo $this->TopSticker1['image'] ?>" alt="Banner 1">
                                <div class="img-overlay">
                                    <span><?php echo $this->TopSticker1['image_heading'] ?></span>
                                    <span class="btn ilmbutton">Shop Now</span>
                                </div>
                            </a>
                        </div>
                        <div class="prgrid-ad-img">
                            <a href="<?php echo $this->TopSticker2['image_link'] ?>">
                                <img src="<?php echo $this->TopSticker2['image'] ?>" alt="Banner 1">
                                <div class="img-overlay">
                                    <span><?php echo $this->TopSticker1['image_heading'] ?></span>
                                    <span class="btn ilmbutton">Shop Now</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="main-body">
    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">TRENDING</div>
                </div>
                <div class="new-arrivals">
                    <div <?php echo !$this->mobileView ? 'id="trendsale" style="position:relative;margin:0 auto;top:0px;left:0px;width:1400px;height:380px;overflow:hidden;visibility:hidden;"' : null ?>>
                        <div <?php echo !$this->mobileView ? 'data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1400px;height:380px;overflow:hidden;"' : 'class="m-flex ft-pr-mbl"' ?>>

                            <?php
                            $TrendingProducts = $this->Trendings;
                            while ($TrPr = $TrendingProducts->fetch_assoc()) :
                                $sp->setPrInfo($TrPr);
                                $sp->processDiscount();
                                $sp->processStock();
                            ?>
                                <div class="single-slider-product">
                                    <div class="single-product">
                                        <div class="sp-image">
                                            <?php if ($sp->getDiscount()) : ?>
                                                <span class="sp-dis">-<?php echo round($sp->getDiscount()) ?>%</span>
                                            <?php endif; ?>
                                            <a href="<?php echo $sp->getHref() ?>">
                                                <img src="<?php echo Models::asset("images/preloader.gif") ?>" data-src="<?php echo $sp->getProductImage() ?>" />
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
</section>

<section class="main-body bg-white">
    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">RECENTLY UPLOADS</div>
                </div>
                <div class="new-arrivals">
                    <div <?php echo !$this->mobileView ? 'id="flashsale" style="position:relative;margin:0 auto;top:0px;left:0px;width:1400px;height:380px;overflow:hidden;visibility:hidden;"' : null ?>>
                        <div <?php echo !$this->mobileView ? 'data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1400px;height:380px;overflow:hidden;"' : 'class="m-flex ft-pr-mbl"' ?>>

                            <?php
                            $newArrivals = $this->newArrivals();
                            while ($TrPr = $newArrivals->fetch_assoc()) :
                                $sp->setPrInfo($TrPr);
                                $sp->processDiscount();
                                $sp->processStock();
                            ?>
                                <div class="single-slider-product">
                                    <div class="single-product">
                                        <div class="sp-image">
                                            <?php if ($sp->getDiscount()) : ?>
                                                <span class="sp-dis">-<?php echo round($sp->getDiscount()) ?>%</span>
                                            <?php endif; ?>
                                            <a href="<?php echo $sp->getHref() ?>">
                                                <img src="<?php echo Models::asset("images/preloader.gif") ?>" data-src="<?php echo $sp->getProductImage() ?>" />
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
</section>

<section class="main-body">
    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="prgrid-ads-section">
                    <div class="prgrid-ad-img">
                        <a href="<?php echo $this->TopSticker3['image_link'] ?>">
                            <img src="<?php echo $this->TopSticker3['image'] ?>" alt="Banner 1">
                            <div class="img-overlay">
                                <span><?php echo $this->TopSticker3['image_heading'] ?></span>
                                <span class="btn ilmbutton"><i class="pe-7s-play"></i> Watch Video</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="main-body bg-white">
    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">INSTAGRAM UPDATED</div>
                </div>
                <div class="new-arrivals">
                    <div class="essential-grid grid5">

                        <?php
                        $InstagramUpdates = $this->getSliders("7");
                        while ($ArrSlider = $InstagramUpdates->fetch_array()) :
                        ?>
                            <div class="single-essentialgrid">
                                <a href="">
                                    <div class="seg-inner seg-full">
                                        <div class="seg-thumb">
                                            <img src="<?php echo asset($ArrSlider["image"]) ?>" alt="">
                                        </div>
                                        <div class="seg-content">
                                            <div class="segc-des">
                                                <p><?php echo $ArrSlider["image_heading"] ?></p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        <?php
                        endwhile;
                        $InstagramUpdates->free();
                        ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="main-body" style="min-height: auto;">
    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">OUR BRANCHES</div>
                </div>
                <div class="new-arrivals">
                    <div class="essential-grid">

                        <?php
                        $Branches = $this->getSliders("8");
                        while ($ArrSlider = $Branches->fetch_array()) :
                        ?>
                            <div class="single-essentialgrid">
                                <div class="seg-inner seg-inline">
                                    <div class="seg-thumb">
                                        <img src="<?php echo asset($ArrSlider["image"]) ?>" alt="">
                                    </div>
                                    <div class="seg-content">
                                        <div class="segc-title">
                                            <h4><?php echo $ArrSlider["image_heading"] ?></h4>
                                        </div>
                                        <div class="segc-des">
                                            <p><?php echo $ArrSlider["image_text1"] ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php
                        endwhile;
                        $Branches->free();
                        ?>

                    </div>
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
<script defer src="<?php echo Models::asset("assets/_ilm_own/js/app/_ilm_Otp_login.js") ?>"></script>
