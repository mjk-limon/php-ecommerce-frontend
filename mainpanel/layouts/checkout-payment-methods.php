<?php

namespace _ilmComm;

?>

<div class="pmnt-methods">
    <div class="method-top">
        <?php if (in_array("Cash On Delivery", $PmntGateways)) : ?>
            <div class="mthd-single">
                <a href="javascript:;" class="mthd-select" data-mthd="Cash On Delivery">
                    <img src="<?php echo asset('images/icons/cod.png') ?>" class="mthd-logo" />
                    <h3>Cash On Delivery</h3>
                </a>
            </div>
        <?php endif; ?>

        <?php
        $CreditCardHayStack = ["SSLCommerz", "PortWallet", "aamarPay", "Paypal", "Stripe"];
        if (count(array_intersect($CreditCardHayStack, $PmntGateways))) :
        ?>
            <div class="mthd-single">
                <a href="javascript:;" class="mthd-select" data-mthd="SSLCommerz">
                    <img src="<?php echo asset('images/icons/card.png') ?>" class="mthd-logo" />
                    <h3>Credit Cards</h3>
                </a>
            </div>
        <?php endif; ?>

        <?php if (in_array("Bank Payment", $PmntGateways)) : ?>
            <div class="mthd-single">
                <a href="javascript:;" class="mthd-select" data-mthd="Bank Payment">
                    <img src="<?php echo asset('images/icons/bank.png') ?>" class="mthd-logo" />
                    <h3>Bank Payment</h3>
                </a>
            </div>
        <?php endif; ?>

    </div>
    <div class="method-bottom">
        <span>or</span>

        <?php if (in_array("bKash", $PmntGateways)) : ?>
            <div class="mthd-single">
                <a href="javascript:;" class="mthd-select" data-mthd="bKash">
                    <img src="<?php echo asset('images/icons/bkash.png') ?>" class="mthd-logo" />
                    <h3>bKash</h3>
                </a>
            </div>
        <?php endif; ?>

        <?php if (in_array("Rocket", $PmntGateways)) : ?>
            <div class="mthd-single">
                <a href="javascript:;" class="mthd-select" data-mthd="Rocket">
                    <img src="<?php echo asset('images/icons/rocket.png') ?>" class="mthd-logo" />
                    <h3>Rocket</h3>
                </a>
            </div>
        <?php endif; ?>

        <?php if (in_array("Nagad", $PmntGateways)) : ?>
            <div class="mthd-single">
                <a href="javascript:;" class="mthd-select" data-mthd="Nagad">
                    <img src="<?php echo asset('images/icons/nagad.png') ?>" class="mthd-logo" />
                    <h3>Nagad</h3>
                </a>
            </div>
        <?php endif; ?>
        
    </div>
</div>