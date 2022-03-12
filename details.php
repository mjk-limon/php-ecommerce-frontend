<?php

namespace _ilmComm;

use _ilmComm\Category\FetchCategories;

$cat = new FetchCategories;
$PrDetails = $this->ProductDetails;
$cat->setMain($PrDetails->getCategory("main"));
$PrDetails->processStock();
$PrDetails->processDiscount();
$PrDetails->processRating();

$ratClass = !Models::getSiteSettings('prat') ? 'hidden' : null;
$qusClass = !Models::getSiteSettings('qtpr') ? 'hidden' : null;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;

$this->updateViewCounter();
$SelfUrl = Models::baseUrl('details/' . $this->Mainc . '/' . $this->Prid . '/');
$AvaClass = $PrDetails->getStock() ? '' : 'notava';
$Availability = $PrDetails->getStock() ? 'In Stock' : 'Out Of Stock';
?>

<div class="page-navigator">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="/"><i class="fa fa-home"></i> Home</a></li>
            <li><a href="<?php echo $cat->getHref() ?>"><?php echo $cat->Mainc;
                                                        $cat->setSubGroup($PrDetails->getCategory("header")); ?></a></li>
            <li><a href="<?php echo $cat->getHref() ?>"><?php echo $cat->SubGroup;
                                                        $cat->setSub($PrDetails->getCategory("sub")); ?></a></li>
            <li><a href="<?php echo $cat->getHref() ?>"><?php echo $cat->Sub ?></a></li>
            <li class="active"><?php echo $PrDetails->getName() ?></li>
        </ol>
    </div>
</div>

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
                                                    <img src="<?php echo Models::asset($Image) ?>" class="img-responsive photoswipezoom" />
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
                            </div>

                            <div class="pt-tags">
                                <div class="pt-tag-item">
                                    <span class="pti-info">Price</span>
                                    <span class="pti-val"><?php echo Models::curr($PrDetails->getPrice()) ?></span>
                                </div>
                                <div class="pt-tag-item">
                                    <span class="pti-info">Regular Price</span>
                                    <span class="pti-val"><?php echo Models::curr($PrDetails->getPrice(0)) ?></span>
                                </div>
                                <div class="pt-tag-item">
                                    <span class="pti-info">Status</span>
                                    <span class="pti-val">
                                        <span class="entl-data ava <?php echo $AvaClass ?>">
                                            <?php echo $Availability ?>
                                        </span>
                                    </span>
                                </div>
                                <div class="pt-tag-item">
                                    <span class="pti-info">Code</span>
                                    <span class="pti-val">
                                        <span class="entl-data" id="tPrId">
                                            <?php echo $this->Prid ?>
                                        </span>
                                    </span>
                                </div>
                                <div class="pt-tag-item">
                                    <span class="pti-info">Brand</span>
                                    <span class="pti-val">
                                        <a href="<?php echo '/search/?q=&a_s_t=brand&astval=' . urlencode($PrDetails->getBrandName()) ?>">
                                            <?php echo $PrDetails->getBrandName() ?>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="product-buy-section">
                            <div class="pr-compare-wishlist">
                                <div class="pcw-group">
                                    <em data-prid="<?php echo $PrDetails->getProductId() ?>" data-size="" data-colr="" data-qty=""></em>
                                    <a href="" class="pr-cw-item cAddWishNav">
                                        <i class="fa fa-bookmark-o"></i>
                                        Add To Wishlist
                                    </a>
                                    <a href="javascript:;" class="pr-cw-item cCompareNav cmpadd">
                                        <i class="fa fa-plus-square"></i>
                                        Add To Compare
                                    </a>
                                </div>
                            </div>

                            <div class="pr-short-description">
                                <?php if ($PrDetails->getOthers('prspec')) : ?>
                                    <h5>Key Features:</h5>
                                    <ul>
                                        <?php foreach ($PrDetails->getKeySpecs() as $Spk => $Spv) : ?>
                                            <li><span><?php echo $Spk ?>:</span> <?php echo $Spv ?></li>
                                        <?php endforeach; ?>
                                        <li class="more"><a href="javascript:;" onclick="_ilm.jumpToSection('#PrSpecs')">View More</a></li>
                                    </ul>
                                <?php endif; ?>
                            </div>

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
                                            if ($count) {
                                                $background = 'linear-gradient(45deg, ' . $background . ')';
                                            }
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
                                    <div style="color:#888;padding-bottom:0.375rem">Select Quantity:</div>
                                    <div class="flex" style="align-items:center;">
                                        <ul class="qty-selection" style="margin:0">
                                            <li class="item_minus"><a href="javascript:;">-</a></li>
                                            <li class="item_qty item_qty_input"><input type="number" value="1" autocomplete="off" /></li>
                                            <li class="item_plus"><a href="javascript:;">+</a></li>
                                        </ul>
                                        <ul class="bnav-btns" style="margin:0;margin-left:10px">
                                            <em data-prid="<?php echo $this->Prid ?>" data-size="" data-colr="" data-qty="1" data-page3="true">
                                                <img src="images/no-stock.png" alt="" id="no-stock" style="width: 150px;display: none;" />
                                            </em>
                                            <li class="add-to-cart add-cart cAddBuyNav" style="padding:.5rem 2.5rem">Buy Now</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="pr-total-view" style="margin-top: .375rem;">
                                    <i class="fa fa-signal"></i>
                                    Total Views: <span class="gb-val"><?php echo $PrDetails->getTotalViews(); ?></span>
                                </div>
                            <?php endif; ?>
                        </div>

                        <ul class="share">
                            <p class="shareli">
                                Share on:
                            </p>
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
            <div class="row">
                <div class="col-md-9">
                    <div class="section-mb details-page-bottom">
                        <div class="dpb-nav-group">
                            <button onclick="_ilm.jumpToSection('#PrSpecs')">Specifications</button>
                            <button onclick="_ilm.jumpToSection('#PrDescription')">Description</button>
                            <button onclick="_ilm.jumpToSection('#PrRatings')">Reviews</button>
                            <button onclick="_ilm.jumpToSection('#PrQuestions')">Questions</button>
                        </div>
                    </div>

                    <div class="section-mb details-page-bottom" id="PrSpecs">
                        <h4 class="discription-review-title">
                            <span>Specifications</span>
                        </h4>
                        <div class="discription-review-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Spec</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($PrDetails->getOthers('prspec') as $Spec) : ?>
                                        <tr>
                                            <td><?php echo $Spec['t'] ?></td>
                                            <td><?php echo $Spec['v'] ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="section-mb details-page-bottom" id="PrDescription">
                        <h4 class="discription-review-title">
                            <span>Product Full Description</span>
                        </h4>
                        <div class="discription-review-body">
                            <div id="pr-dis">
                                <?php echo $PrDetails->getDescription(); ?>
                            </div>
                        </div>
                    </div>

                    <div class="section-mb details-page-bottom" id="PrRatings">
                        <h4 class="discription-review-title">
                            <span>Ratings &amp; Reviews</span>
                        </h4>
                        <div class="discription-review-body">
                            <div id="pr-rvw">
                                <div class="row">

                                    <?php if (!$ratClass) : ?>
                                        <div class="col-md-4 col-xs-12">
                                            <h4>Product Rating</h4>
                                            <div class="row ratings">
                                                <div class="col-md-4 col-xs-5 rating-review text-center">
                                                    <h1><?php echo $PrDetails->getRating("r_r") ?></h1>
                                                    <h4>/5</h4>
                                                    <span class="stars"><?php echo $PrDetails->getRating("r_r") ?></span>
                                                    <p><small><em>(Total Ratings: <?php echo $PrDetails->getRating("r_t") ?>)</em></small></p>
                                                </div>
                                                <div class="col-md-8 col-xs-7 user-rating">

                                                    <?php
                                                    for ($RI = 5; $RI > 0; $RI--) :
                                                        $BarWidth = @($PrDetails->getRating("r_" . $RI) / $PrDetails->getRating("r_t")) * 100;
                                                    ?>
                                                        <div class="row-rat">
                                                            <?php echo $RI ?> Star
                                                            <span class="rating-progress">
                                                                <span style="width:<?php echo $BarWidth ?>%"></span>
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
                                                        <input type="hidden" name="name" value="<?php echo $this->UserData->getFullName() ?>" />
                                                        <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
                                                        <input type="hidden" name="prid" value="<?php echo $this->Prid ?>" />
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
                    </div>

                    <div class="section-mb details-page-bottom" id="PrQuestions">
                        <h4 class="discription-review-title">Product Questions</h4>
                        <div class="discription-review-body">
                            <div class="question-top _nrp">
                                <div id="rv-qus-area" class="_nrt">
                                    <?php include "layouts/details-page-questions.php"; ?>
                                </div>
                                <div class="new-qus-reply">

                                    <?php if ($this->UserData) : ?>
                                        <form class="replyRvwForm" action="" method="POST">
                                            <input type="hidden" name="name" value="<?php echo $this->UserData->getFullName() ?>" />
                                            <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
                                            <input type="hidden" name="qid" value="0" />
                                            <input type="hidden" name="prid" value="<?php echo $this->Prid ?>" />
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
                <div class="col-md-3 hiddes-xs">
                    <div class="section-mb details-page-bottom product-page-products" style="padding: 0;">
                        <h4 class="discription-review-title">Related Products</h4>

                        <div class="grid-row" style="grid-template-columns: repeat(1, 1fr)">
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
                                                <em data-prid="<?php echo $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
                                                <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
                                                <a href="javascript:;" class="oth-nav cCompareNav cmpadd"><i class="fa fa-plus-square"></i></a>
                                                <a href="javascript:;" class="oth-nav cAddWishNav"><i class="fa fa-heart-o"></i></a>
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
                <li class="add-to-cart add-cart cAddBuyNav mb-details">Add To Cart</li>
                <li class="quick-buy cAddBuyNav mb-details">Quick Buy</li>
            </ul>
        </div>
        <p class="bnav-wishlist">Buy Later? <a href="javascript:;" class="cAddWishNav"><i class="fa fa-heart-o"></i> Add to wishlist</a></p>
    </div>
<?php endif; ?>

<link rel="stylesheet" href="<?php echo Models::asset("assets/vendors/imagezoom/easyzoom.css") ?>" />
<script defer src="<?php echo Models::asset("assets/_ilm_own/js/detailsPage_scripts.js") ?>"></script>
<script src="<?php echo Models::asset("assets/vendors/imagezoom/easyzoom.js") ?>"></script>

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
