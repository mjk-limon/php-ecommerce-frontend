<?php if ($this->onlyLoad != "ppp-ws") : ?>
    <div class="top-title">
        <div class="top-title-left">
            <h4><?php echo $this->PrsTitle ?></h4>

            <?php $this->layout('product_browse.products.top_title.applied_filters'); ?>
            <?php $this->layout('product_browse.products.top_title.sort_by'); ?>
            
        </div>
    </div>
<?php endif; ?>
