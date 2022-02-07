<?php

namespace _ilmComm;

$sp = $this->SingleProduct;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
$slideSize = array(($this->HomeGridNumber * 100), (($this->HomeGridNumber + 1) * 100));
?>

<?php if (!$this->mobileView) : ?>
    <div class="container home-floating-menu-container">

    </div>
<?php endif; ?>

<div class="homepage-top-section">
    <div class="container">
        <div class="row">
            <div class="col-md-2p5 col-md-3 menu-selection hidden-xs">
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
            <div class="col-md-9p5 col-md-9 slider-section">
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

<section class="main-body">
    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="bt-tagline">
                    <div class="bt-animated-text">
                        Happy New Year 2022 | সবাইকে নববর্ষের শুভেচ্ছা.
                        নতুন বছরে Tech Shosta থেকে অনলাইনে অর্ডার করে পণ্য কিনলেই নিশ্চিত উপহার।
                        সাথে থাকছে আকর্ষণীয় সব অফার ও ডিসকাউন্ট।
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-mb bg-main">
                <div class="ft-title text-center">
                    <div class="ft-title-left">
                        <span class="ft-ft-title" style="font-weight:500;">Recommended Categories</span>
                        <p>Select your Desired Product from Featured Category!</p>
                    </div>
                </div>
                <div class="ft-pr-sliders">
                    <div class="fet-cats">
                        <?php for ($i = 0; $i < 16; $i++) { ?>
                            <div class="fet-cat-item">
                                <div class="fet-cat-item-inner">
                                    <div class="fet-cat-icn">
                                        <img src="https://www.techlandbd.com/image/cache/catalog/techland/banner/featured-category/laptop-1-40x40.png" class="info-block-img">
                                    </div>
                                    <div class="fet-cat-name">
                                        Laptop
                                    </div>
                                </div>
                            </div>
                        <?php
                        } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-mb bg-main">
                <div class="ft-title text-center">
                    <div class="ft-title-left">
                        <span class="ft-ft-title" style="font-weight:500;">Featured Products</span>
                        <p>View the latest & upcoming promotions and offers at TechLand BD</p>
                    </div>
                </div>
                <div class="ft-pr-sliders">
                    <div class="fet-cats fet-prs">

                        <?php for ($i = 0; $i < 3; $i++) { ?>
                            <div class="fet-cat-item">
                                <div class="fet-cat-item-inner">
                                    <div class="fet-cat-icn">
                                        <img src="https://www.techlandbd.com/image/cache/catalog/techland/banner/home-page/promotion/1st-player-case-380x270w.jpg" class="info-block-img">
                                    </div>
                                    <div class="fet-cat-name">
                                        <div class="fcn-title">Laptop</div>
                                        <div class="fcn-tag">Get an Unlimited Discount on 1st Player Gaming Case</div>
                                        <div class="fcn-btn"><a class="btn btn-info" href="">View All Products</a></div>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="main-body bg-white">
    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="bc-title">
                    <div class="bc-main-title">New Arrivals</div>
                </div>
                <div class="ft-pr-sliders">
                    <div class="new-arrivals">
                        <div class="grid-row grid5">

                            <?php
                            $St_i = 1;
                            $newArrivals = $this->newArrivals(10, "id,name,category,discount,price,item_left,others");
                            while ($NaPr = $newArrivals->fetch_assoc()) :
                                $sp->setPrInfo($NaPr);
                                $sp->processDiscount();
                                $sp->processStock();
                            ?>
                                <div class="grids">
                                    <div class="bc-products">
                                        <div class="single-product">
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
                                $St_i++;
                            endwhile;
                            ?>

                        </div>
                    </div>
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
                    $St_i = 1;
                    $Cat = new Category\FetchCategories;
                    $MainCats = $Cat->fetchMain();

                    while ($ArrMain = $MainCats->fetch_assoc()) :
                        $Cat->setCatId($ArrMain['id']);
                        $Cat->setMain($ArrMain['main']);
                        $Cat->setSubGroup(null);
                        $Cat->setSub(null);

                        $BrowseCatProducts = $this->browseCatProducts($Cat->CatId, 8, "id,name,category,discount,price,item_left,others");
                        if ($BrowseCatProducts->num_rows) :
                    ?>
                            <div class="bc-single">
                                <div class="bc-cat-name"><?php echo htmlspecialchars($Cat->Mainc) ?></div>
                                <div class="grid-row grid5">

                                    <?php
                                    $Ct_i = 1;
                                    while ($TrPr = $BrowseCatProducts->fetch_assoc()) :
                                        $sp->setPrInfo($TrPr);
                                        $sp->processDiscount();
                                        $sp->processStock();
                                    ?>

                                        <?php
                                        if ($Ct_i == 1) :
                                            $CatImg = Models::asset('images/category-slides/' . Models::restyleUrl($Cat->Mainc) . '-3.jpg');
                                        ?>
                                            <div class="grids large-grid onlycolspan">
                                                <div class="prgrid-ads-section">
                                                    <a href="<?php echo $Cat->getHref() ?>" class="prgrid-ad-img" style="background-image:url('<?php echo $CatImg ?>')"></a>
                                                </div>
                                            </div>
                                        <?php endif; ?>

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

                                                                <ul class="spprinfo-specs">
                                                                    <?php if ($sp->getOthers('prspec')) : ?>
                                                                        <?php foreach ($sp->getOthers('prspec') as $Spec) : ?>
                                                                            <li><span><?php echo $Spec['t'] ?>:</span> <?php echo $Spec['v'] ?></li>
                                                                        <?php endforeach; ?>
                                                                    <?php endif; ?>
                                                                </ul>

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
                                                            <a href="javascript:;" class="oth-nav cCompareNav cmpadd"><i class="fa fa-plus-square"></i></a>
                                                            <a href="javascript:;" class="oth-nav cAddWishNav"><i class="fa fa-heart-o"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php
                                        $Ct_i++;
                                    endwhile;
                                    ?>

                                </div>
                                <div class="bc-cat-all">
                                    <div>&nbsp;</div><a href="<?php echo $Cat->getHref() ?>">View All</a>
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
<script type="text/javascript">
slideSize = {
    width: <?php echo $slideSize[0] ?>,
    height: <?php echo $slideSize[1] ?>
};
</script>
<script defer src="<?php echo Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>
