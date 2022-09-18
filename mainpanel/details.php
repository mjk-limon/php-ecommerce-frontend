<?php

$this->ProductDetails->processStock();
$this->ProductDetails->processDiscount();
$this->ProductDetails->processRating();
$this->updateViewCounter();
?>

<section class="main-body bg-white">
    <?php $this->layout('product_details.details_top'); ?>
</section>

<section class="main-body">
    <?php $this->layout('product_details.details_middle'); ?>
    <?php $this->layout('product_details.details_bottom'); ?>
</section>

<?php if ($this->mobileView) : ?>
    <div class="pr-buy-navs">
        <?php $this->layout('product_details.buy_nav_2'); ?>
    </div>

    <?php $this->layout('product_details.product_image_lightbox'); ?>
<?php endif; ?>

<?php $this->layout('global.javascripts.detailspage_core'); ?>
