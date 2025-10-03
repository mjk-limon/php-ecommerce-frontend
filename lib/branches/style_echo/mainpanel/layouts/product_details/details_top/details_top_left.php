<div class="details-page-feature">
    <div class="row">
        <div class="col-md-5 single-top-left">

            <?php if ($this->mobileView) : ?>
                <h2 class="pr-name"><?php echo $PrDetails->getProductName() ?></h2>
            <?php endif; ?>

            <?php $this->layout('product_details.details_top.product_image'); ?>
        </div>
        <div class="col-md-7 single-top-right">
            <?php $this->layout('product_details.details_top.product_info'); ?>
        </div>
    </div>
</div>