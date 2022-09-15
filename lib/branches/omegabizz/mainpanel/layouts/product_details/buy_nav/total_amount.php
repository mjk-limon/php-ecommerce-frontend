<?php 

$Price= $this->ProductDetails->getPrice();
$MinOrder = $this->ProductDetails->getOthers("prminodr") ?: 1;
?>

<p>
    Product amount total:
    <strong>
        <?php echo curr(); ?>
        <span id="pramqty"><?php echo round($Price * $MinOrder) ?></span>
    </strong>
</p>