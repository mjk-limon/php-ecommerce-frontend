<?php

namespace _ilmComm;

$PrDetails = $this->ProductDetails;
$PrDetails->processStock();
$PrDetails->processDiscount();
$PrDetails->processRating();

$ratClass = !Models::getSiteSettings('prat') ? 'hidden' : null;
$qusClass = !Models::getSiteSettings('qtpr') ? 'hidden' : null;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;

$this->updateViewCounter();
$SelfUrl = Models::baseUrl('details/' . $this->Mainc . '/' . $this->Prid . '/');
?>

<section class="main-body bg-white">
    <div class="spd">
        <div class="container">
            <div class="features_items">

                <?php if (!$PrDetails->getProductId()) : ?>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="empty-product-page">
                                <img src="<?php echo Models::asset("images/pp-empty.png") ?>" alt="" />
                                <h4>PRODUCT NOT FOUND</h4>
                                <h4>INVALID PRODUCT ID OR PRODUCT MAY BE DELETED</h4>
                            </div>
                        </div>
                    </div>
                <?php
                    return;
                endif;
                ?>

                <div class="row">
                    <div class="col-md-5 single-top-left">

                        <?php if ($this->mobileView) : ?>
                            <h2 class="pr-name"><?php echo $PrDetails->getName() ?></h2>
                        <?php endif; ?>

                        <div class="flexslider" id="flexslider">
                            <ul class="slides">

                                <?php
                                $zoom_item = "";
                                foreach ($this->ProductImages as $Image) :
                                    $zoom_item .= "{src: '" . Models::asset($Image) . "',w: 1200,h: 1200},";
                                ?>
                                    <li data-thumb="<?php echo Models::asset($Image) ?>">
                                        <div class="thumb-image detail_images">
                                            <div class="easyzoom easyzoom--overlay">
                                                <a href="<?php echo Models::asset($Image) ?>">
                                                    <img src="<?php echo Models::asset($Image) ?>" alt="" class="img-responsive" />
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                <?php endforeach; ?>

                                <div class="clearfix"></div>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-7 single-top-right">
                        <div class="product-title">
                            <div class="pt-area">

                                <?php if (!$this->mobileView) : ?>
                                    <h2 class="pr-name"><?php echo $PrDetails->getName() ?></h2>
                                <?php endif; ?>

                                <p class="pr-price" data-dis="<?php echo $PrDetails->getDiscount() ?>">
                                    <span><?php echo Models::curr($PrDetails->getPrice()) ?></span>

                                    <?php if ($PrDetails->getDiscount()) : ?>
                                        <span class="pre-price"><?php echo Models::curr($PrDetails->getPrice(0)) ?></span>
                                    <?php endif; ?>

                                </p>
                            </div>
                        </div>

                        <div class="product-description-section">
                            <?php echo $PrDetails->getDescription(); ?>
                        </div>

                        <div class="product-buy-section">
                            <?php
                            $AvaClass = $PrDetails->getStock() ? '' : 'notava';
                            $Availability = $PrDetails->getStock() ? 'In Stock' : 'Out Of Stock';
                            ?>

                            <div class="pr-size-color">
                                <?php
                                $Sizes = $PrDetails->getSizes();
                                if (array_filter($Sizes)) :
                                ?>
                                    <ul class="pr-sc-ul size-selection">
                                        <div>Select size:</div>

                                        <?php foreach ($Sizes as $Size) : ?>
                                            <li class="ss-btn"><?php echo $Size ?></li>
                                        <?php endforeach; ?>

                                    </ul>
                                <?php endif; ?>

                                <?php
                                $Colors = $PrDetails->getColors();
                                if (array_filter($Colors)) :
                                ?>
                                    <ul class="pr-sc-ul color-selection">
                                        <div>Select Color:</div>

                                        <?php
                                        foreach ($Colors as $Color) :
                                            $resColor = Models::restyleUrl($Color, true);
                                            $background = str_replace(" ", ", ", $Color, $count);
                                            if ($count) $background = 'linear-gradient(45deg, ' . $background . ')';
                                            $colrPrev = (file_exists(Models::docRoot("proimg/{$this->Prid}/{$resColor}-texture.png")) ?
                                                "url('" . Models::asset("proimg/{$this->Prid}/{$resColor}-texture.png") . "') no-repeat center / 100% 100%" :
                                                $background);
                                        ?>
                                            <li class="cs-btn">
                                                <i style="background:<?php echo $colrPrev ?>"></i> <?php echo $Color ?>
                                            </li>
                                        <?php endforeach; ?>

                                    </ul>
                                <?php endif; ?>

                            </div>

                            <?php if (!$this->mobileView) : ?>
                                <div class="pr-buy-navs">
                                    <ul class="qty-selection">
                                        <div>Select Quantity:</div>
                                        <li class="item_minus"><a href="javascript:;">-</a></li>
                                        <li class="item_qty item_qty_input"><input type="number" value="1" autocomplete="off" /></li>
                                        <li class="item_plus"><a href="javascript:;">+</a></li>
                                    </ul>

                                    <div class="row">
                                        <div class="col-md-7 col-xs-6">
                                            <ul class="bnav-btns">
                                                <em data-prid="<?php echo $this->Prid ?>" data-size="" data-colr="" data-qty="1" data-page3="true">
                                                    <img src="images/no-stock.png" alt="" id="no-stock" style="width: 150px;display: none;" />
                                                </em>
                                                <li class="quick-buy cAddBuyNav">Order Now</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-5 col-xs-6">

                                            <?php if (Models::getContactInformation('phone')) : ?>
                                                <div class="callfororder">
                                                    <i class="fa fa-phone callicon" aria-hidden="true"></i>
                                                    <div class="callnumber">
                                                        <p class="pnormelad">Call for order</p>
                                                        <p class="pstrongad"><?php echo Models::getContactInformation('phone') ?></p>
                                                    </div>
                                                </div>
                                            <?php endif; ?>

                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>

                        <ul class="share">
                            <li>
                                <a href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="http://twitter.com/share?text=<?php echo urlencode(COMPANY_NAME) ?>+Product&url=<?php echo urlencode($SelfUrl); ?>&hashtags=<?php echo urlencode(COMPANY_NAME) ?>,Ecommerce,Products,<?php echo urlencode($this->Mainc); ?>" target="_blank"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode($SelfUrl); ?>&title=<?php echo urlencode(COMPANY_NAME) ?>+Products&summary=&source=" target="_blank"><i class="fa fa-linkedin"></i></a>
                            </li>
                            <li>
                                <a href="https://pinterest.com/pin/create/button/?url=<?php echo urlencode($SelfUrl); ?>&media=<?php echo urlencode(Models::baseUrl("proimg/" . $this->Prid . "/thumb.jpg")); ?>&description=" target="_blank"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                            </li>

                            <?php if ($this->mobileView) : ?>
                                <li>
                                    <a class="noRoute" href="whatsapp://send?text=<?php echo urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
                                </li>
                            <?php else : ?>
                                <li>
                                    <a href="https://wa.me/?text=<?php echo urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
                                </li>
                            <?php endif; ?>

                        </ul>
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
                <div class="product-page-products">
                    <h4>Related Packages</h4>
                    <div class="grid-row grid4">
                        <?php
                        $sp = $this->SingleProduct;
                        $Suggestions = $this->ProductSuggestion;
                        while ($Rpr = $Suggestions->fetch_array()) :
                            $sp->setPrInfo($Rpr);
                            $sp->processDiscount();
                            $sp->processStock();
                        ?>
                            <div class="grids">
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
                                            <em data-prid="<?php echo $sp->getProductId() ?>" data-size="" data-colr="" data-qty=""></em>
                                            <!-- <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a> -->
                                            <a href="<?php echo $sp->getHref() ?>" class="buy-now">View Packages</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php
                        endwhile;
                        $Suggestions->free();
                        ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php if ($this->mobileView) : ?>
    <div class="pr-buy-navs">
        <div class="m-flex">
            <ul class="qty-selection">
                <li class="item_minus"><a href="javascript:;">-</a></li>
                <li class="item_qty item_qty_input">1</li>
                <li class="item_plus"><a href="javascript:;">+</a></li>
            </ul>
            <ul class="bnav-btns">
                <em data-prid="<?php echo $this->Prid ?>" data-size="" data-colr="" data-qty="1" data-page3="true">
                    <img src="images/no-stock.png" alt="" id="no-stock" style="width: 150px;display: none;" />
                </em>
                <li class="quick-buy cAddBuyNav mb-details">Order Now</li>
            </ul>
        </div>
    </div>

    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="<?php echo Models::asset('assets/vendors/photoswipe/photoswipe.css') ?>">
    <link rel="stylesheet" href="<?php echo Models::asset('assets/vendors/photoswipe/skins/default-skin.css') ?>">
    <script src="<?php echo Models::asset('assets/vendors/photoswipe/photoswipe.min.js') ?>"></script>
    <script>
    var openPhotoSwipe = function(index) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            items = [<?php echo $zoom_item ?>],
            options = {
                index: index
            },
            gallery;

        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    }

    $('[data-imagezoom]').click(function() {
        var index = $(this).closest("li").index();
        openPhotoSwipe(index);
    });
    </script>
<?php else : ?>
    <link rel="stylesheet" href="<?php echo Models::asset("assets/vendors/imagezoom/easyzoom.css") ?>" />
    <script src="<?php echo Models::asset("assets/vendors/imagezoom/easyzoom.js") ?>"></script>
<?php endif; ?>

<script defer src="<?php echo Models::asset("assets/_ilm_own/js/detailsPage_scripts.js") ?>"></script>
<script defer type="text/javascript">
$(document).ready(function() {
    <?php if ($this->checkJump('jumpToRvw')) : ?>
        $('#DRRvwBtn').trigger("click");
        _ilm.jumpToSection('#DRRvwBtn', function() {
            $('#rv-main-area .media:first-child').addClass('animated flash');
        });
    <?php endif; ?>

    <?php if ($this->checkJump('jumpToQstn')) : ?>
        _ilm.jumpToSection('#Rating', function() {
            $('#rv-qus-area .media:first-child').addClass('animated flash');
        });
    <?php endif; ?>
});
</script>
