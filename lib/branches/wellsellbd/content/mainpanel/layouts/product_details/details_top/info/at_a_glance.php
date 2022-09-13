<?php

$this->extend("product_details.details_top.info.at_a_glance");
?>

<p class="pr-entl">
    SKU:
    <span class="entl-data">
        <?php echo $this->ProductDetails->getOthers("sku") ?>
    </span>
</p>