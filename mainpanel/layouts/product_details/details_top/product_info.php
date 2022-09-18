<?php $this->layout('product_details.details_top.info.title'); ?>

<div class="product-buy-section">
    <?php $this->layout('product_details.details_top.info.at_a_glance'); ?>

    <div class="pr-size-color">
        <?php $this->layout('product_details.details_top.info.sizes'); ?>
        <?php $this->layout('product_details.details_top.info.colours'); ?>
    </div>

    <?php if (!$this->mobileView) : ?>
        <div class="pr-buy-navs">
            <?php $this->layout('product_details.buy_nav_1'); ?>
        </div>
    <?php endif; ?>

</div>

<?php $this->layout('product_details.details_top.share_on_social'); ?>