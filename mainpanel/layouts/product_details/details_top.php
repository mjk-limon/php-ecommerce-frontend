<div class="spd">
    <div class="container">
        <div class="features_items">

            <?php $this->layout('product_details.details_top.invalid_product'); ?>

            <div class="row">
                <div class="col-md-4 single-top-left">
                    <?php if ($this->mobileView) : ?>
                        <h2 class="pr-name"><?php echo $this->ProductDetails->getProductName() ?></h2>
                    <?php endif; ?>

                    <?php $this->layout('product_details.details_top.product_image'); ?>
                </div>

                <div class="col-md-6 single-top-right">
                    <?php $this->layout('product_details.details_top.product_info'); ?>
                </div>

                <div class="col-md-2 details-top-right hidden-xs">
                    <?php $this->layout('product_details.details_top.product_glance_boxes'); ?>
                </div>
            </div>
        </div>
    </div>
</div>