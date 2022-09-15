<?php 
$MinOrder = $this->ProductDetails->getOthers("prminodr") ?: 1;
?>

<ul>
    <li class="item_minus">
        <a href="javascript:;">-</a>
    </li>
    <li class="item_qty item_qty_input">
        <input type="number" value="<?php echo $MinOrder ?>" autocomplete="off" />
    </li>
    <li class="item_plus">
        <a href="javascript:;">+</a>
    </li>
</ul>
