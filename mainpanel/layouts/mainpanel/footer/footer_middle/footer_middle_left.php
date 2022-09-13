<?php 
// Payemnt methods
$paymentMethods = $this->paymentMethods();
?>

<div class="col-md-6 pm-delv">
    <h4>Payment Methods</h4>

    <?php foreach ($paymentMethods as $PM) : ?>
        <img src="<?php echo asset($PM); ?>" class="img-responsive" />
    <?php endforeach; ?>

</div>
