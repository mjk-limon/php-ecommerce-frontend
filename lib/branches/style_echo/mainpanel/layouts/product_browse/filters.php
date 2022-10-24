<?php if (!$this->mobileView) : ?>

    <div class="col-md-3 product-filter-sidebar">

        <?php $this->layout('product_browse.filters.price'); ?>
        <?php $this->layout('product_browse.filters.brand'); ?>
        <?php $this->layout('product_browse.filters.size'); ?>
        <?php $this->layout('product_browse.filters.colour'); ?>
        <?php $this->layout('product_browse.filters.discount'); ?>
        <?php $this->layout('product_browse.filters.others'); ?>

    </div>


<?php endif; ?>
