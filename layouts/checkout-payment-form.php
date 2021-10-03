<?php

namespace _ilmComm;
?>

<div class="confirm-payment-dialog">
	<h4><?= $this->GatewayData['name'] ?></h4>
	<div class="payment-info"><?= $this->GatewayData['additional'] ?></div>
	<div class="confirm-form limlog-form">
		<form id="placeOrderForm" action="" method="POST">
			<input type="hidden" name="updatePayment" value="1" />

			<?php foreach ($this->CkData as $Key => $Val) : ?>
				<input type="hidden" name="<?= $Key ?>" value="<?= htmlspecialchars($Val) ?>" />
			<?php endforeach; ?>

			<?php if (in_array($this->GatewayData['name'], array("bKash", "Rocket", "Nagad"))) : ?>
				<label><?= $this->GatewayData['name'] ?> Account Number</label>
				<input type="text" name="pmntNumber" placeholder="Enter the number from whitch you paid" required />

				<label>Payment Transaction Id</label>
				<input type="text" name="pmntTrxnId" placeholder="Enter payment transaction id" required />
			<?php endif; ?>

			<button class="btn cf-btn" id="confirmBtn">Place Order</button>
		</form>
	</div>
</div>

<script>
	_ilm_Quick_buy.initPlaceOrderForm();
</script>