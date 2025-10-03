<?php

// Single product var
$Sp = $this->SingleProduct;
?>

<?php if ($this->CartItems) : ?>
    <div class="scb-cart-area slimScroll">
        <div class="fc-table">
            <?php
            foreach ($this->CartItems as $CKey => $CItem) :
                $Sp->setPrid($CItem['p']);
                $Sp->buildProductDiscount($CItem['q']);
                $Sp->buildPriceAndStock($CItem['s'], $CItem['c']);
            ?>
                <div class="sinlge-fc-item">
                    <span class="rmv-crt-btn" data-dynamic="<?php echo $CKey ?>">
                        <i class="fa fa-trash"></i>
                    </span>
                    <div class="fc-item-dis">
                        <img src="<?php echo $Sp->getThumbnail() ?>" alt="" />
                        <div class="dis-title">
                            <div><span>Product:</span><span><?php echo $Sp->getProductName() ?></span></div>
                            <div><span>Price:</span><span><?php echo curr($Sp->getPrice()) ?></span></div>
                            <div><span>Quantity:</span><span><?php echo $CItem['q'] ?></span></div>
                            <div class="total"><span>Total:</span><span>4000Tk</span></div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="scb-footer">
        <div class="scbf-link">
            Cart Total:
            <strong><?php echo curr($this->CartSummery->getSubTotal()) ?></strong>
        </div><a href="/checkout/" class="scbf-link">
            PROCEED
        </a>
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