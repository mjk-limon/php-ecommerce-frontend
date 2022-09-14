<?php
$this->spAddClass = get_site_settings('navhover') ? 'fixed-nav' : null;
?>

<div class="product-page-products">
    <div class="grid-row grid4">

        <?php foreach ($this->AllProducts as $Product) : ?>
            <div class="grids">
                <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $Product]); ?>
            </div>
        <?php endforeach; ?>

    </div>

    <?php $this->layout('product_browse.products.view_more'); ?>

</div>
