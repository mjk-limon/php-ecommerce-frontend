<div class="confirm-payment-dialog">
    <h4><?php echo $this->GatewayData['name']; ?></h4>
    <div class="payment-info">
        <?php echo $this->GatewayData['additional'] ?>
    </div>
    <div class="confirm-form limlog-form">
        <form id="placeOrderForm" action="" method="POST">
            <input type="hidden" name="updatePayment" value="1" />

            <?php foreach ($this->CkData as $Key => $Val) : ?>
                <input type="hidden" name="<?php echo $Key ?>" value="<?php echo htmlspecialchars($Val) ?>" />
            <?php endforeach; ?>

            <?php if (in_array($this->GatewayData['name'], array("bKash", "Rocket", "Nagad"))) : ?>
                <div class="form-group">
                    <label><?php echo $this->GatewayData['name'] ?> Account Number</label>
                    <input type="text" name="pmntNumber" class="form-control" placeholder="Enter the number from whitch you paid" required />
                </div>

                <div class="form-group">
                    <label>Payment Transaction Id</label>
                    <input type="text" name="pmntTrxnId" class="form-control" placeholder="Enter payment transaction id" required />
                </div>
            <?php endif; ?>

            <button class="btn cf-btn" id="confirmBtn">Place Order</button>
        </form>
    </div>
</div>

<script>
    _ilm_Quick_buy.initPlaceOrderForm();
</script>