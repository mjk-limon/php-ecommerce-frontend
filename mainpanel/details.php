<?php

$this->ProductDetails->processStock();
$this->ProductDetails->processDiscount();
$this->ProductDetails->processRating();
$this->updateViewCounter();
?>

<section class="main-body bg-white">
    <div class="spd">
        <div class="container">
            <div class="features_items">

                <?php $this->layout('product_details.details_top.invalid_product'); ?>

                <div class="row">
                    <?php $this->layout('product_details.details_top.product_image'); ?>
                    <?php $this->layout('product_details.details_top.product_info'); ?>
                    <?php $this->layout('product_details.details_top.product_glance_boxes'); ?>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="main-body">
    <div class="spd">
        <div class="container">
            <div class="section-mb details-page-bottom">
                <h4 class="discription-review-title">
                    <span><a href="javascript:;" data-target="#pr-dis" data-toggle="DRtab" class="active true">Product Full Description</a></span>
                    <span>|</span>
                    <span><a href="javascript:;" id="DRRvwBtn" data-target="#pr-rvw" class="true" data-toggle="DRtab">Ratings &amp; Reviews</a></span>
                </h4>

                <div class="discription-review-body">
                    <div id="pr-dis">
                        <?php echo $this->ProductDetails->getDescription(); ?>
                    </div>
                    <div id="pr-rvw" style="display:none">
                        <?php $this->layout('product_details.details_middle.reviews'); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="row">
                <?php $this->layout('product_details.details_middle.questions'); ?>
                <?php $this->layout('product_details.details_middle.merchant_info'); ?>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <?php $this->layout('product_details.details_middle.related_products'); ?>
            </div>
        </div>
    </div>
</section>

<?php if ($this->mobileView) : ?>
    <div class="pr-buy-navs">
        <?php $this->layout('product_details.buy_nav_2'); ?>
    </div>

    <?php $this->layout('product_details.product_image_lightbox'); ?>
<?php endif; ?>

<?php $this->layout('global.javascripts.detailspage_core'); ?>
