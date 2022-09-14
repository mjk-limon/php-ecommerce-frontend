<?php

// Get all payment gateways
$this->AvailablePmntGateways = $this->availablePaymentGateways();

// Get all delivery locations
$this->DeliveryLocations = $this->getDeliveryLocations(null);
?>

<section class="main-body">
    <div id="checkout">
        <div class="container">
            <div class="section-mb login_registration_widget pd-0">
                <section class="panel panel-default tab-content mainContentpanel">
                    <div class="steps">
                        <ul class="steps-ul">

                            <?php
                            // Top nav chevron symbol
                            $liChevron = null;

                            if (!$this->mobileView) :
                                // View from desktop
                                // Add chevron symbol in nav section
                                $liChevron = '<span class="chevron"></span>';
                            ?>
                                <li>
                                    Checkout
                                    <span class="chevron"></span>
                                </li>
                            <?php endif; ?>

                            <li class="active">
                                <a data-toggle="tab" href="#co-login" id="menu1-btn">
                                    <span class="badge badge-success">1</span>
                                    Your Information
                                    <?php echo $liChevron ?>
                                </a>
                            </li>
                            <li class="disabled">
                                <a data-toggle="tab" href="#co-order-summery" id="menu2-btn">
                                    <span class="badge badge-info">2</span>
                                    Review Your Order
                                    <?php echo $liChevron ?>
                                </a>
                            </li>
                            <li class="disabled">
                                <a data-toggle="tab" href="#co-payment-information" id="menu3-btn">
                                    <span class="badge">3</span>
                                    Payment &amp; Comfirm
                                </a>
                            </li>
                            <div class="clearfix"></div>
                        </ul>
                    </div>

                    <div id="co-login" class="tab-pane fade in active">
                        <div class="ck-area">
                            <?php $this->layout('checkout.user_information'); ?>
                        </div>
                    </div>

                    <div id="co-order-summery" class="tab-pane fade">
                        <div class="ck-area">
                            <?php $this->layout('checkout.checkout_summery'); ?>
                        </div>
                    </div>

                    <div id="co-payment-information" class="tab-pane fade">
                        <div class="ck-area">
                            <div class="payment-information">
                                <?php $this->layout('global.payment_methods'); ?>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</section>


<style>
.floating-sc {
    display: none
}

</style>

<?php $this->layout('global.javascripts.checkoutpage_core'); ?>
