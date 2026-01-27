<?php 
// Shipping methods
$shippingMethods = $this->home->shippingMethods();
?>

<div class="col-md-6 pm-delv">
    <h4>Delivered By</h4>

    <?php foreach ($shippingMethods as $SM) : ?>
        <img src="<?php echo asset($SM['method_logo']); ?>" class="img-responsive"
             alt="<?php echo htmlspecialchars($SM['method_name']) ?>" />
    <?php endforeach; ?>
    
</div>
