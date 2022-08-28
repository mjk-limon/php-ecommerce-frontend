<?php

namespace _ilmComm;

use _ilmComm\Customers\CustomerInfo\SingleCustomer;

// Assign customer var
$Sc = new SingleCustomer;

// Assign cartdata var
$Cs = $this->CartData;

// Get all payment gateways
$PmntGateways = $this->availablePaymentGateways();

// Get all delivery locations
$DeliveryLocations = $this->getDeliveryLocations();
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
                            <?php
                            endif;
                            ?>

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
                                    <?php echo $liChevron ?></a>
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
                            <h4>User information</h4>

                            <?php
                            include "layouts/checkout-user-information.php";
                            ?>

                        </div>
                    </div>

                    <div id="co-order-summery" class="tab-pane fade">
                        <div class="ck-area">
                            <div class="order-summery">
                                <div class="flex">
                                    <div class="order-summery-tab-1">
                                        <h3>Product Total</h3>
                                        <p>Total In Cart : <?php echo $Cs->getTotalItem() ?> item(s)</p>
                                        <p>Total Amount : <?php echo curr() ?> <span id="_cart_twd"><?php echo $Cs->getSubTotal() + $Cs->getTotalDiscount() ?></span></p>
                                    </div>
                                    <div class="order-summery-tab-1">
                                        <h3>Delivery Cost</h3>
                                        <p>Delivery Location: <span id="_cart_dl"></span></p>
                                        <p>Delivery Charge: <?php echo curr() ?> <span id="_cart_dc"></span></p>
                                    </div>
                                    <div class="order-summery-tab-1 disabled">
                                        <h3>Govt. Tax</h3>
                                        <p>Tax No: _______ </p>
                                        <p>Tax Amount: <?php echo curr() ?> __</p>
                                    </div>
                                    <div class="order-summery-tab-1">
                                        <h3>Discount</h3>
                                        <p>Product Discount: <span id="_cart_dt"><?php echo curr($Cs->getTotalDiscount()) ?></span></p>
                                        <p>Coupon Discount: <span id="_cart_cpd"><?php echo curr($Cs->getCouponDiscount()) ?></span></p>
                                        <p>Other Discount: 0</p>
                                    </div>
                                </div>

                                <div class="col-md-4 col-md-offset-4 order-total">
                                    <h4>Order Total</h4>
                                    <h3><span><?php echo curr() ?> <span id="_cart_odr_ttl"></span></span></h3>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="nav-invoker">
                                <a class="first-tab-btn swtT nav-btn previous" href="javascript:;">Go Back</a>
                                <a class="third-tab-btn swtT nav-btn" href="javascript:void(0)">Conitinue To Payment</a>
                            </div>
                        </div>
                    </div>
                    <div id="co-payment-information" class="tab-pane fade">
                        <div class="ck-area">
                            <div class="payment-information">

                                <?php
                                include "layouts/checkout-payment-methods.php";
                                ?>

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

<script defer src="<?php echo asset('assets/_ilm_own/js/app/_ilm_Otp_login.js') ?>"></script>
<script defer src="<?php echo asset("assets/_ilm_own/js/checkoutPage_scripts.js") ?>"></script>

<!--script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD" data-sdk-integration-source="button-factory"></script>
	<script>
	function initPayPalButton() {
	  paypal.Buttons({
		style: {
		  shape: 'pill',
		  color: 'silver',
		  layout: 'horizontal',
		  label: 'pay',
		},

		createOrder: function(data, actions) {
		  return actions.order.create({
			purchase_units: [{"description":"Dhaka Solution Ecommerce Payment System..","amount":{"currency_code":"USD","value":9,"breakdown":{"item_total":{"currency_code":"USD","value":1},"shipping":{"currency_code":"USD","value":8},"tax_total":{"currency_code":"USD","value":0}}}}]
		  });
		},

		onApprove: function(data, actions) {
		  return actions.order.capture().then(function(details) {
			alert('Transaction completed by ' + details.payer.name.given_name + '!');
		  });
		},

		onError: function(err) {
		  console.log(err);
		}
	  }).render('#paypal-button-container');
	}
	initPayPalButton();
	</script-->