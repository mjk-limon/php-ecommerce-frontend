<?php

$this->spAddClass = get_site_settings('navhover') ? 'fixed-nav' : null;
?>

<div class="product-page-products">
    <h4>Related Products</h4>
    <div class="grid-row">

        <?php while ($Rpr = $this->ProductSuggestion->fetch_array()) : ?>
            <div class="grids">
                <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $Rpr]); ?>
            </div>
        <?php endwhile; ?>

    </div>
</div>
