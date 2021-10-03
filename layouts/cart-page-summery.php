<?php

namespace _ilmComm;
?>

	<div class="ft-total">
		<span class="ft-total-left">Item Total</span>
		<span class="ft-total-right"><?= $this->CartSummery->getTotalItem() ?> Unit</span>
	</div>
	<div class="ft-total">
		<span class="ft-total-left">Item Savings</span>
		<span class="ft-total-right"><?= Models::curr($this->CartSummery->getTotalDiscount()) ?></span>
	</div>
	<div class="ft-total">
		<span class="ft-total-left">Coupon Discount</span>
		<span class="ft-total-right"><?= Models::curr($this->CartSummery->getCouponDiscount()) ?></span>
	</div>
	<div class="ft-total-bottom">
		<span class="title">Total:</span>
		<span class="ft-total-tk">
			<?= Models::curr($this->CartSummery->getSubTotal() - $this->CartSummery->getCouponDiscount()) ?>
		</span>
	</div>