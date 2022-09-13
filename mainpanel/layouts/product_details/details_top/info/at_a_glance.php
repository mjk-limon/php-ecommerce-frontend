<?php
$AvaClass = $this->ProductDetails->getStock() ? '' : 'notava';
$Availability = $this->ProductDetails->getStock() ? 'In Stock' : 'Out Of Stock';
?>

<p class="pr-entl">
    Availability:
    <span class="entl-data ava <?php echo $AvaClass ?>">
        <?php echo $Availability ?>
    </span>
</p>
<p class="pr-entl">
    Product Code:
    <span class="entl-data" id="tPrId">
        <?php echo $this->Prid ?>
    </span>
</p>
