<?php

// Single product var
$Sp = $this->SingleProduct;
?>

<?php if ($this->CartItems) : ?>
    <div class="scb-cart-area">
        <table class="table fc-table">
            <tbody>
                <?php
                foreach ($this->CartItems as $CKey => $CItem) :
                    // Set product id
                    $Sp->setPrid($CItem['p']);

                    // Process discount and stock
                    $Sp->processDiscount($CItem['q']);
                    $Sp->processStock($CItem['s'], $CItem['c']);
                ?>
                    <tr class="sinlge-fc-item">
                        <td>
                            <span data-ciup="+">&plus;</span>
                            <strong><?php echo $CItem['q'] ?></strong>
                            <span data-ciup="-">&minus;</span>
                        </td>
                        <td class="fc-item-dis" width="50%">
                            <img src="<?php echo $Sp->getProductImage() ?>" alt="" />
                            <div class="dis-title">
                                <h5><?php echo $Sp->getName() ?></h5>
                                <span>Size: <?php echo $CItem['s'] ?>, Color: <?php echo $CItem['c'] ?></span>
                                <span>Unit Price: <?php echo curr($Sp->getPrice()) ?></span>
                            </div>
                        </td>
                        <td><?php echo $Sp->getPrice() * $CItem['q'] ?></td>
                        <td><span class="rmv-crt-btn" data-dynamic="<?php echo $CKey ?>">&times;</span></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div class="scb-footer">
        <div class="fc-tamount">Your Cart Total: <strong><?php echo curr($this->CartSummery->getSubTotal()) ?></strong></div>
        <a href="/cart/" class="scbf-link">View Full Cart</a>
        <a href="/checkout/" class="scbf-link">Place Order</a>
    </div>
<?php else : ?>
    <div class="no-products">
        <h4> Shopping Cart Empty! </h4>
        <ul>
            <li>You didn't add any product to cart. </li>
            <li>Please go back to Product Page. And add a product to cart.</li>
            <li>For any help, Please contact our help center</li>
        </ul>
    </div>
<?php endif; ?>
