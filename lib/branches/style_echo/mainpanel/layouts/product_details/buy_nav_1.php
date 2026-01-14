<?php
$MinOrder = $this->ProductDetails->getOthers("prminodr") ?: 1;
?>

<div class="flex">
    <ul class="qty-selection">
        <li class="item_minus">
            <a href="javascript:;">-</a>
        </li>
        <li class="item_qty item_qty_input">
            <input type="number" value="<?php echo $MinOrder ?>" min="<?php echo $MinOrder ?>" autocomplete="off" />
        </li>
        <li class="item_plus">
            <a href="javascript:;">+</a>
        </li>
    </ul>
    <ul class="bnav-btns">
        <em data-prid="<?php echo $this->Prid ?>" data-size="" data-colr="" data-qty="<?php echo $MinOrder ?>" data-page3="true">
            <img src="images/no-stock.png" alt="" id="no-stock" style="width: 150px;display: none;" />
        </em>
        <li class="add-to-cart add-cart cAddBuyNav">ADD TO CART</li>
    </ul>
</div>

<?php if ($MinOrder > 1): ?>
    <span style="background-color: var(--accent); color: #fff; top: 36px; padding: 2px 10px;">
        Wholesale (Minimmum order <?php echo $MinOrder ?>)
    </span>
<?php endif ?>