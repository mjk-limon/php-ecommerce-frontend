<div class="ft-total">
    <span class="ft-total-left">Item Total</span>
    <span class="ft-total-right"><?php echo $this->CartSummery->getTotalItem() ?> Unit</span>
</div>
<div class="ft-total">
    <span class="ft-total-left">Item Savings</span>
    <span class="ft-total-right"><?php echo curr($this->CartSummery->getTotalDiscount()) ?></span>
</div>
<div class="ft-total">
    <span class="ft-total-left">Coupon Discount</span>
    <span class="ft-total-right"><?php echo curr($this->CartSummery->getCouponDiscount()) ?></span>
</div>
<div class="ft-total-bottom">
    <span class="title">Total:</span>
    <span class="ft-total-tk">
        <?php echo curr($this->CartSummery->getSubTotal() - $this->CartSummery->getCouponDiscount()) ?>
    </span>
</div>