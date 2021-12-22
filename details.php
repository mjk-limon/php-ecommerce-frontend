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
$VimeoId = strrev(explode("/", strrev($PrDetails->getOthers('prvid')), 2)[0]);
$VimeoInfo = $VimeoId ? unserialize(file_get_contents("http://vimeo.com/api/v2/video/$VimeoId.php")) : [];
?>

<section class="main-body bg-white">
    <div class="spd">
        <div class="container">
            <div class="features_items">

                <?php
                if (!$PrDetails->getProductId()) :
                ?>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="empty-product-page">
                                <img src="<?= Models::asset("images/pp-empty.png") ?>" alt="" />
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
                        <div id="sticky">

                            <?php if ($this->mobileView) : ?>
                                <h2 class="pr-name"><?= $PrDetails->getName() ?></h2>
                            <?php endif; ?>

                            <div class="flexslider" id="flexslider">
                                <ul class="slides">

                                    <?php
                                    $zoom_item = "";
                                    foreach ($this->ProductImages as $Image) :
                                        $zoom_item .= "{src: '" . Models::asset($Image) . "',w: 1200,h: 1200},";
                                    ?>
                                        <li data-thumb="<?= Models::asset($Image) ?>">
                                            <div class="thumb-image detail_images">
                                                <img src="<?= Models::asset($Image) ?>" data-imagezoom="true" class="img-responsive" alt="<?= $Image ?>">
                                            </div>
                                        </li>
                                    <?php endforeach; ?>

                                    <?php if ($VimeoInfo) : ?>
                                        <li data-thumb="<?php echo @$VimeoInfo[0]['thumbnail_medium'] ?>">
                                            <div class="thumb-image detail_images">
                                                <img src="<?php echo @$VimeoInfo[0]['thumbnail_medium'] ?>" style="width:100%"
                                                    data-vimeourl="<?php echo $PrDetails->getOthers("prvid") ?>"
                                                    data-imagezoom="true">
                                            </div>
                                        </li>
                                    <?php endif; ?>

                                    <div class="clearfix"></div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4p5 col-md-4 single-top-right">
                        <div class="product-title">
                            <div class="pt-area">
                                <?php if (!$this->mobileView) : ?>
                                    <h2 class="pr-name"><?= $PrDetails->getName() ?></h2>
                                <?php endif; ?>

                                <p style="margin-bottom: 5px;">Brand: <a href="/search/?q=&a_s_t=brand&astval=Erotas+Fashion">Erotas Fashion</a></p>

                                <div class="product-rating">
                                    <span style="display: inline-block;"><span class="stars"><?= $PrDetails->getRating("r_r") ?></span></span>
                                    <span style="display: inline-block;margin-left: 10px;"><?= $PrDetails->getRating("r_t") ?> Ratings</span>
                                    <span style="display: inline-block;margin-left: 10px;"><?= $PrDetails->getRating("r_t") ?> Questions</span>
                                </div>
                            </div>
                        </div>

                        <div class="product-price">
                            <p class="pr-price" data-dis="<?= $PrDetails->getDiscount() ?>">
                                Price:
                                <span><?= Models::curr($PrDetails->getPrice()) ?></span>

                                <?php if ($PrDetails->getDiscount()) : ?>
                                    <span class="pre-price"><?= Models::curr($PrDetails->getPrice(0)) ?></span>
                                <?php endif; ?>
                            </p>
                        </div>

                        <div class="product-buy-section">
                            <?php
                            $AvaClass = $PrDetails->getStock() ? '' : 'notava';
                            $Availability = $PrDetails->getStock() ? 'In Stock' : 'Out Of Stock';
                            ?>

                            <div class="pr-size-color">
                                <?php
                                $Colors = $PrDetails->getColors();
                                if (array_filter($Colors)) :
                                ?>
                                    <ul class="pr-sc-ul color-selection">
                                        <div>Style:</div>

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
                                                <i style="background:<?php echo $colrPrev ?>"></i>
                                                <div><?php echo $Color ?><span>2 images</span></div>
                                            </li>
                                        <?php endforeach; ?>

                                    </ul>
                                <?php endif; ?>

                            </div>
                        </div>

                        <div class="product-short-description">
                            <h5>Description</h5>
                            <?php echo $PrDetails->getOthers("prshortdes") ?>
                        </div>
                    </div>

                    <div class="col-md-2p5 col-md-3 details-top-right hidden-xs">
                        <div class="section-mb">
                            <div class="dtr-pr-buy">
                                <p class="pr-price" data-dis="<?= $PrDetails->getDiscount() ?>">
                                    <span><?= Models::curr($PrDetails->getPrice()) ?></span>
                                </p>

                                <div class="pr-glancebox">
                                    <div class="gb-title">Delivery Info</div>
                                    <ul>
                                        <li style="padding-bottom: 0;">
                                            <div class="gb-col-groups">
                                                <i class="fa fa-truck"></i>
                                                <span><strong>Fastest delivery.</strong> Type your location to get available shipping methods.</span>
                                            </div>
                                            <div class="gb-full">
                                                <form id="checkDeliveryCost" action="" method="POST">
                                                    <input type="hidden" name="get_delivery_methods">
                                                    <div class="inline-form">
                                                        <input type="text" name="loc" placeholder="Enter you location" required="">
                                                        <button class="">Check</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <p class="pr-entl">
                                    <span class="entl-data ava <?= $AvaClass ?>" style="font-size:2.1rem;font-weight:normal;">
                                        <?= $Availability ?>
                                    </span>
                                </p>

                                <?php if (!$this->mobileView) : ?>
                                    <div class="pr-buy-navs">
                                        <div class="qty-selection">
                                            <div>Quantity:</div>
                                            <select>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12 col-xs-12">
                                                <ul class="bnav-btns">
                                                    <em data-prid="<?= $this->Prid ?>" data-size="" data-colr="" data-qty="1" data-page3="true">
														<img src="images/no-stock.png" alt="" id="no-stock" style="width: 150px;display: none;" />
													</em>
                                                    <li class="add-to-cart add-cart cAddBuyNav">Add To Cart</li>
                                                    <li class="quick-buy cAddBuyNav">Quick Buy</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                <?php endif; ?>

                                <div class="pr-glancebox">
                                    <ul>
                                        <li>
                                            <div class="gb-col-groups">
                                                <i class="fa fa-lock"></i>
                                                <span>Payment Security Guranteed.</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="gb-col-groups">
                                                <i class="fa fa-undo"></i>
                                                <span>Free and Easy Return Policy.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <p class="bnav-wishlist">Buy Later? <a href="javascript:;" class="cAddWishNav"><i class="fa fa-heart-o"></i> Add to wishlist</a></p>

                                <ul class="share">
                                    <p class="shareli">Share</p>
                                    <li>
                                        <a href="https://www.facebook.com/sharer.php?u=<?= urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="http://twitter.com/share?text=<?= urlencode(COMPANY_NAME) ?>+Product&url=<?= urlencode($SelfUrl); ?>&hashtags=<?= urlencode(COMPANY_NAME) ?>,Ecommerce,Products,<?= urlencode($this->Mainc); ?>" target="_blank"><i class="fa fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?= urlencode($SelfUrl); ?>&title=<?= urlencode(COMPANY_NAME) ?>+Products&summary=&source=" target="_blank"><i class="fa fa-linkedin"></i></a>
                                    </li>
                                    <li>
                                        <a href="https://pinterest.com/pin/create/button/?url=<?= urlencode($SelfUrl); ?>&media=<?= urlencode(Models::baseUrl("proimg/" . $this->Prid . "/thumb.jpg")); ?>&description=" target="_blank"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                                    </li>

                                    <?php if ($this->mobileView) : ?>
                                        <li>
                                            <a class="noRoute" href="whatsapp://send?text=<?= urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
                                        </li>
                                    <?php else : ?>
                                        <li>
                                            <a href="https://wa.me/?text=<?= urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
                                        </li>
                                    <?php endif; ?>
                                </ul>
                            </div>
                        </div>
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
                <div class="product-page-products related-product">
                    <h4>Related items to explore</h4>
                    <div class="grid-row">

                        <?php
                        $sp = $this->SingleProduct;
                        $Suggestions = $this->ProductSuggestion;
                        while ($Rpr = $Suggestions->fetch_array()) :
                            $sp->setPrInfo($Rpr);
                            $sp->processDiscount();
                            $sp->processStock();
                        ?>
                            <div class="grids">
                                <div class="single-product <?= $spAddClass ?>">
                                    <div class="sp-image">
                                        <?php if ($sp->getDiscount()) : ?>
                                            <span class="sp-dis">-<?= round($sp->getDiscount()) ?>%</span>
                                        <?php endif; ?>
                                        <a href="<?= $sp->getHref() ?>">
                                            <img src="<?= $sp->getProductImage() ?>" />
                                        </a>
                                    </div>
                                    <div class="sp-pr">
                                        <div class="sp-pr-info">
                                            <a href="<?= $sp->getHref() ?>">
                                                <h5><?= $sp->getName() ?></h5>
                                            </a>
                                            <div style="margin-bottom:.5rem;">
                                                <span class="stars" style="margin:0"><?php echo rand(30, 50) / 10 ?></span>
                                                14
                                            </div>
                                            <p>
                                                <strong class="price"><?= Models::curr($sp->getPrice()) ?></strong>
                                                <?php if ($sp->getDiscount()) : ?>
                                                    <strong class="p-old"><?= Models::curr($sp->getPrice(0)) ?></strong>
                                                <?php endif; ?>
                                            </p>
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

    <div class="spd">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-mb details-page-bottom">
                        <h4 class="discription-review-title">Product Manuals</h4>
                        <div class="discription-review-body">
                            <?php echo $PrDetails->getDescription(); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php if (!$qusClass) : ?>
        <div class="spd">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="section-mb details-page-bottom" id="Rating">
                            <h4 class="discription-review-title">Customer Question &amp; Answers</h4>
                            <div class="discription-review-body">
                                <div class="question-top _nrp">
                                    <div id="rv-qus-area" class="_nrt">
                                        <?php include "layouts/details-page-questions.php"; ?>
                                    </div>
                                    <div class="new-qus-reply">

                                        <?php if ($this->UserData) : ?>
                                            <form class="replyRvwForm" action="" method="POST">
                                                <input type="hidden" name="name" value="<?= $this->UserData->getFullName() ?>" />
                                                <input type="hidden" name="email" value="<?= $this->UserData->getUserName() ?>" />
                                                <input type="hidden" name="qid" value="0" />
                                                <input type="hidden" name="prid" value="<?= $this->Prid ?>" />
                                                <input type="hidden" name="reply_product_rvw" />
                                                <input type="hidden" name="rtp" value="qstn" />

                                                <div class="inline-form">
                                                    <textarea type="text" name="message" placeholder="Ask a question..." required=""></textarea>
                                                    <button class="">Submit</button>
                                                </div>
                                            </form>
                                        <?php else : ?>
                                            <p>Please <a href="/login/?ref=p.03">Login</a> to ask a question.</p>
                                        <?php endif; ?>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="section-mb details-page-bottom">
                            <h4 class="discription-review-title">Seller Review</h4>
                            <div class="discription-review-body">
                                <div class="seller-info">
                                    <?php include "layouts/details-page-mcntinfo.php"; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <div class="spd" id="DRRvwBtn">
        <div class="container">
            <div class="row">

                <?php if (!$ratClass) : ?>
                    <div class="col-md-4 col-xs-12">
                        <div class="section-mb details-page-bottom">
                            <h4 class="discription-review-title">Customer Reviews</h4>
                        </div>
                        <div class="row ratings">
                            <div class="col-md-4 col-xs-5 rating-review text-center">
                                <h1><?= $PrDetails->getRating("r_r") ?></h1>
                                <h4>/5</h4>
                                <span class="stars"><?= $PrDetails->getRating("r_r") ?></span>
                                <p><small><em>(Total Ratings: <?= $PrDetails->getRating("r_t") ?>)</em></small></p>
                            </div>
                            <div class="col-md-8 col-xs-7 user-rating">

                                <?php
                                for ($RI = 5; $RI > 0; $RI--) :
                                    $BarWidth = @($PrDetails->getRating("r_" . $RI) / $PrDetails->getRating("r_t")) * 100;
                                ?>
                                    <div class="row-rat">
                                        <?= $RI ?> Star
                                        <span class="rating-progress">
                                            <span style="width:<?= $BarWidth ?>%"></span>
                                        </span>
                                    </div>
                                <?php endfor; ?>

                            </div>
                        </div>
                    </div>
                <?php endif; ?>

                <div class="col-md-8 col-xs-12">
                    <h4>Reviews</h4>
                    <div class="user-review-section _nrp">
                        <div id="rv-main-area" class="_nrt">
                            <?php include "layouts/details-page-reviews.php"; ?>
                        </div>
                        <div class="new-qus-reply">

                            <?php if ($this->UserData) : ?>
                                <form class="replyRvwForm" action="" method="POST">
                                    <input type="hidden" name="name" value="<?= $this->UserData->getFullName() ?>" />
                                    <input type="hidden" name="email" value="<?= $this->UserData->getUserName() ?>" />
                                    <input type="hidden" name="prid" value="<?= $this->Prid ?>" />
                                    <input type="hidden" name="reply_product_rvw" />
                                    <input type="hidden" name="rtp" value="rvw" />

                                    <div class="user-star-rating">
                                        <h5>Your Rating:</h5>
                                        <div class="us-rating">
                                            <!--
											--><input name="rating" id="e5" type="radio" value="05"><label for="e5">&star;</label>
                                            <!--
											--><input name="rating" id="e4" type="radio" value="04"><label for="e4">&star;</label>
                                            <!--
											--><input name="rating" id="e3" type="radio" value="03"><label for="e3">&star;</label>
                                            <!--
											--><input name="rating" id="e2" type="radio" value="02"><label for="e2">&star;</label>
                                            <!--
											--><input name="rating" id="e1" type="radio" value="01"><label for="e1">&star;</label>
                                        </div>
                                    </div>
                                    <div class="inline-form">
                                        <textarea type="text" name="message" placeholder="Write a review..." required=""></textarea>
                                        <button class="">Submit</button>
                                    </div>
                                </form>
                            <?php else : ?>
                                <p>Please <a href="/login/?ref=p.03">Login</a> to write a review.</p>
                            <?php endif; ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="spd" style="padding-bottom: 1.5rem;margin-bottom: 0;">
        <div class="container">
            <div class="section-mb">
                <div class="product-page-products related-product">
                    <h4>Recommended based on your shopping trends</h4>
                    <div class="grid-row">

                        <?php
                        $sp = $this->SingleProduct;
                        $Suggestions = $this->productSuggestion();
                        while ($Rpr = $Suggestions->fetch_array()) :
                            $sp->setPrInfo($Rpr);
                            $sp->processDiscount();
                            $sp->processStock();
                        ?>
                            <div class="grids">
                                <div class="single-product <?= $spAddClass ?>">
                                    <div class="sp-image">
                                        <?php if ($sp->getDiscount()) : ?>
                                            <span class="sp-dis">-<?= round($sp->getDiscount()) ?>%</span>
                                        <?php endif; ?>
                                        <a href="<?= $sp->getHref() ?>">
                                            <img src="<?= $sp->getProductImage() ?>" />
                                        </a>
                                    </div>
                                    <div class="sp-pr">
                                        <div class="sp-pr-info">
                                            <a href="<?= $sp->getHref() ?>">
                                                <h5><?= $sp->getName() ?></h5>
                                            </a>
                                            <div style="margin-bottom:.5rem;">
                                                <span class="stars" style="margin:0"><?php echo rand(30, 50) / 10 ?></span>
                                            </div>
                                            <p>
                                                <strong class="price"><?= Models::curr($sp->getPrice()) ?></strong>
                                                <?php if ($sp->getDiscount()) : ?>
                                                    <strong class="p-old"><?= Models::curr($sp->getPrice(0)) ?></strong>
                                                <?php endif; ?>
                                            </p>
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
                <em data-prid="<?= $this->Prid ?>" data-size="" data-colr="" data-qty="1" data-page3="true">
					<img src="images/no-stock.png" alt="" id="no-stock" style="width: 150px;display: none;" />
				</em>
                <li class="add-to-cart add-cart cAddBuyNav mb-details">Add To Cart</li>
                <li class="quick-buy cAddBuyNav mb-details">Quick Buy</li>
            </ul>
        </div>
        <p class="bnav-wishlist">Buy Later? <a href="javascript:;" class="cAddWishNav"><i class="fa fa-heart-o"></i> Add to wishlist</a></p>
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

    <link rel="stylesheet" href="<?= Models::asset('assets/vendors/photoswipe/photoswipe.css') ?>">
    <link rel="stylesheet" href="<?= Models::asset('assets/vendors/photoswipe/skins/default-skin.css') ?>">
    <script src="<?= Models::asset('assets/vendors/photoswipe/photoswipe.min.js') ?>"></script>
    <script>
    var openPhotoSwipe = function(index) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            items = [<?= $zoom_item ?>],
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
    <div class="modal modal-center animated fadeInUp" style="animation-duration:.3s;" id="all-image-slider">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <span class="close" data-dismiss="modal">&times;</span>
                    <div role="tabpanel">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#gallery-images" aria-controls="gallery-images" role="tab" data-toggle="tab">Images</a>
                            </li>
                            <li role="presentation">
                                <a href="#gallery-videos" aria-controls="gallery-videos" role="tab" data-toggle="tab">Videos</a>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="gallery-images">
                                <div class="dpGallery">
                                    <div class="dpGallery-viewport">
                                        <div id="dpgvpimg">
                                            <img src="" alt="">
                                        </div>
                                    </div>
                                    <div class="dpGallery-sidenav">
                                        <div class="title">
                                            <?php echo $PrDetails->getName() ?>
                                        </div>
                                        <div class="image-nav">
                                            <?php
                                            foreach ($PrDetails->getAllPrImages() as $Images) :
                                                foreach ($Images as $Image) :
                                            ?>
                                                    <div class="dpGallery-navitem">
                                                        <div class="dpGallery-ni-thumb">
                                                            <a href="javascript:;" data-dpgtoggle="<?php echo Models::asset($Image) ?>">
                                                                <img src="<?php echo Models::asset($Image) ?>">
                                                            </a>
                                                        </div>
                                                    </div>
                                            <?php
                                                endforeach;
                                            endforeach;
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="gallery-videos">
                                <div class="dpGallery">
                                    <div class="dpGallery-viewport">
                                        <div id="dpgvpvideo"></div>
                                    </div>
                                    <div class="dpGallery-sidenav">
                                        <div class="video-nav">
                                            <div class="videonav-title">Product Videos</div>
                                            <div class="dpGallery-navitem">
                                                <div class="dpGallery-ni-thumb">
                                                    <a href="javascript:;" data-dpgtoggle="<?php echo $PrDetails->getOthers('prvid') ?>" data-vid="true">
                                                        <img src="<?php echo @$VimeoInfo[0]['thumbnail_medium'] ?>">
                                                    </a>
                                                </div>
                                                <div class="dpGallery-ni-title">
                                                    <a href="javascript:;" data-dpgtoggle="<?php echo $PrDetails->getOthers('prvid') ?>" data-vid="true">
                                                        <h5><?php echo @$VimeoInfo[0]['title'] ?></h5>
                                                        <span>Uploaded on: <?php echo @$VimeoInfo[0]['upload_date'] ?></span>
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="videonav-title">More To Watch</div>

                                            <?php
                                            $Suggestions = $this->productSuggestion(null, 2);
                                            while ($PrArr = $Suggestions->fetch_assoc()) :
                                                $sp->setPrInfo($PrArr);
                                                $VimeoId = strrev(explode("/", strrev($sp->getOthers('prvid')), 2)[0]);
                                                $VimeoInfo = $VimeoId ? unserialize(file_get_contents("http://vimeo.com/api/v2/video/$VimeoId.php")) : [];
                                            ?>
                                                <div class="dpGallery-navitem">
                                                    <div class="dpGallery-ni-thumb">
                                                        <a href="javascript:;" data-dpgtoggle="<?php echo $sp->getOthers('prvid') ?>" data-vid="true">
                                                            <img src="<?php echo @$VimeoInfo[0]['thumbnail_medium'] ?>">
                                                        </a>
                                                    </div>
                                                    <div class="dpGallery-ni-title">
                                                        <a href="javascript:;" data-dpgtoggle="<?php echo $sp->getOthers('prvid') ?>" data-vid="true">
                                                            <h5><?php echo @$VimeoInfo[0]['title'] ?></h5>
                                                            <span>Uploaded on: <?php echo @$VimeoInfo[0]['upload_date'] ?></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            <?php endwhile; ?>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
    $(document).ready(function() {
        $("#sticky").sticky({
            topSpacing: 20,
            center: true
        });
    });
    </script>
<?php endif; ?>

<script defer src="<?= Models::asset("assets/_ilm_own/js/detailsPage_scripts.js") ?>"></script>
<script defer type="text/javascript">
$(document).ready(function() {
    <?php if ($this->checkJump('jumpToRvw')) : ?>
        //$('#DRRvwBtn').trigger("click");
        _ilm.jumpToSection('#DRRvwBtn');
    <?php endif; ?>

    <?php if ($this->checkJump('jumpToQstn')) : ?>
        _ilm.jumpToSection('#Rating', function() {
            $('#rv-qus-area .media:first-child').addClass('animated flash');
        });
    <?php endif; ?>
});
</script>
