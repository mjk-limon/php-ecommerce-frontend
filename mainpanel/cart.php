<?php

namespace _ilmComm;

// Single product var
$Sp = $this->SingleProduct;
?>

<section class="main-body">
    <div class="container">

        <?php if ($this->CartItems) : ?>
            <div class="row">
                <div class="col-md-8">
                    <div class="section-mb">
                        <div class="cart-area">
                            <h4>Your Shopping Cart</h4>
                            <div class="cart-table">

                                <?php
                                foreach ($this->CartItems as $CKey => $CItem) :
                                    // Set product id
                                    $Sp->setProductId($CItem['p']);

                                    // Process price, stock and discount
                                    $Sp->buildProductDiscount($CItem['q']);
                                    $Sp->buildPriceAndStock($CItem['s'], $CItem['c']);
                                ?>
                                    <div class="cart-single">
                                        <a class="remove" href="javascript:;" data-ckey="<?php echo $CKey ?>">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                        <div class="cs-fullinfo sp-pr-info">
                                            <div class="cs-primg" style="--tlwdth: 80px;background-image: url('<?php echo $Sp->getThumbnail() ?>')">
                                            </div>
                                            <div style="--tlwdth: 80px; " class="cs-fi-area">
                                                <div class="fi-name">
                                                    <a href="<?php echo $Sp->getProductLink() ?>">
                                                        <?php echo $Sp->getProductName() ?>
                                                    </a>
                                                    <div class="fi-price-section">
                                                        Unit Price: <?php echo curr($Sp->getPrice()) ?>

                                                        <?php if ($Sp->getDiscount()) : ?>
                                                            <span class="p-old">(-<?php echo $Sp->getDiscount() ?>%)</span>
                                                        <?php endif; ?>

                                                    </div>
                                                </div>
                                                <div class="fi-cart-data">
                                                    Size: <?php echo $CItem['s'] ?> &nbsp;
                                                    Color: <?php echo $CItem['c'] ?>
                                                </div>
                                                <div class="fi-cart-data fi-qty">
                                                    Quantity:
                                                    <input type="number" name="" value="<?php echo $CItem['q'] ?>"
                                                           data-ogn="<?php echo $CItem['q'] ?>" min="1" />
                                                    <p class="fr-cd-nav">
                                                        <a href="javascript:;" class="ucBtn" style="color:blue;">
                                                            Update Cart
                                                        </a>
                                                        or
                                                        <a href="javascript:;" class="rcBtn" style="color:blue;">
                                                            Cancel
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>

                            </div>
                            <div class="coupon-area">
                                <span class="ca-title">Coupon</span>
                                <div class="cpm-area">

                                    <?php include "layouts/cart-page-coupons.php" ?>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="section-mb">
                        <h4 class="discription-review-title">Cart Summery</h4>
                        <div class="cart-area">
                            <div class="st-area">

                                <?php include "layouts/cart-page-summery.php" ?>

                            </div>
                        </div>
                        <div class="checkout-proceed">
                            <a href="/checkout/" class="ft-go-to-checkout">Proceed to Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        <?php else : ?>
            <div class="row">
                <div class="col-md-12">
                    <div class="empty-product-page">
                        <img src="<?php echo asset('assets/images/cart-empty.png') ?>" alt="No cart">
                        <h4>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</h4>
                        <h4>TRY ADDING SOME ITEMS FIRST</h4>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div>
</section>

<style type="text/css">
.floating-sc {
    display: none
}
</style>
<script defer src="<?php echo asset("assets/_ilm_own/js/cartPage_scripts.js") ?>"></script>
