<div class="qty-selection">
    <div>Select quantity</div>
    <?php $this->layout('product_details.buy_nav.quantity_selection'); ?>
</div>

<?php $this->layout('product_details.buy_nav.total_amount'); ?>

<div class="row">
    <div class="col-md-7">
        <?php $this->layout('product_details.buy_nav.buttons'); ?>
    </div>
    <div class="col-md-5 col-xs-6">
        <?php $this->layout('product_details.buy_nav.call_for_order'); ?>
    </div>
</div>
