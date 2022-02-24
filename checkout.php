<?php

namespace _ilmComm;

$Sc = $this->SingleCustomer;
$Cs = $this->CartSummery;
$PmntGateways = $this->availablePaymentGateways();
$DeliveryLocations = $this->getDeliveryLocations(null);
?>
<section class="main-body">
    <div id="checkout">
        <div class="container">
            <div class="section-mb login_registration_widget pd-0">
                <section class="panel panel-default tab-content mainContentpanel">
                    <div class="steps">
                        <ul class="steps-ul">

                            <?php
                            if (!$this->mobileView) :
                                $liChevron = '<span class="chevron"></span>';
                            ?>
                                <li>
                                    Checkout
                                    <span class="chevron"></span>
                                </li>
                            <?php
                            else : $liChevron = null;
                            endif;
                            ?>

                            <li class="active"><a data-toggle="tab" href="#co-login" id="menu1-btn"><span class="badge badge-success">1</span>Your Information<?php echo $liChevron ?></a></li>
                            <li class="disabled"><a data-toggle="tab" href="#co-order-summery" id="menu2-btn"><span class="badge badge-info">2</span>Review Your Order<?php echo $liChevron ?></a></li>
                            <li class="disabled"><a data-toggle="tab" href="#co-payment-information" id="menu3-btn"><span class="badge">3</span>Payment &amp; Comfirm</span></a></li>
                            <div class="clearfix"></div>
                        </ul>
                    </div>
                    <div id="co-login" class="tab-pane fade in active">
                        <div class="ck-area">
                            <h4>User information</h4>

                            <?php
                            include Models::docRoot("public/layouts/checkout-user-information.php");
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
                                        <p>Total Amount : <?php echo Models::curr() ?> <span id="_cart_twd"><?php echo $Cs->getSubTotal() + $Cs->getTotalDiscount() ?></span></p>
                                    </div>
                                    <div class="order-summery-tab-1">
                                        <h3>Delivery Cost</h3>
                                        <p>Delivery Location: <span id="_cart_dl"></span></p>
                                        <p>Delivery Charge: <?php echo Models::curr() ?> <span id="_cart_dc"></span></p>
                                    </div>
                                    <div class="order-summery-tab-1 disabled">
                                        <h3>Govt. Tax</h3>
                                        <p>Tax No: _______ </p>
                                        <p>Tax Amount: <?php echo Models::curr() ?> __</p>
                                    </div>
                                    <div class="order-summery-tab-1">
                                        <h3>Discount</h3>
                                        <p>Product Discount: <span id="_cart_dt"><?php echo Models::curr($Cs->getTotalDiscount()) ?></span></p>
                                        <p>Coupon Discount: <span id="_cart_cpd"><?php echo Models::curr($Cs->getCouponDiscount()) ?></span></p>
                                        <p>Other Discount: 0</p>
                                    </div>
                                </div>

                                <div class="col-md-4 col-md-offset-4 order-total">
                                    <h4>Order Total</h4>
                                    <h3><span><?php echo Models::curr() ?> <span id="_cart_odr_ttl"></span></span></h3>
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
                                include Models::docRoot("public/layouts/checkout-payment-methods.php");
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

<script defer src="<?php echo Models::asset("assets/_ilm_own/js/checkoutPage_scripts.js") ?>"></script>
<script type="text/javascript">
$(document).ready(function() {
    $('.reset').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            return;
        }
        initSlider();
    });

    $("#verify-slider button").click(function(e) {
        e.preventDefault();

        var mobile_number = $('#verf-num input').val(),
            number_regex = new RegExp(/^(01){1}[3456789]{1}(\d){8}$/i),
            t_i = 20,
            timer;

        if (number_regex.test(mobile_number)) {
            sendOtp(mobile_number)
            $('.verification-section').addClass("verified");

            if (timer) {
                clearInterval(timer);
            }

            timer = setInterval(function() {
                t_i--;
                $('.reset span').html(t_i);

                if (t_i < 1) {
                    $('.reset').removeClass("disabled");
                    clearInterval(timer);
                }
            }, 1000);
            return;
        }

        _ilm.showNotification("Mobile number is not valid!", true);
        initSlider();
    });

    var initSlider = function() {
        $('.reset').addClass("disabled");
        $('.verification-section').removeClass("verified");
    }

    var sendOtp = function(mobile_number) {
        ajaxPost({
            sendVerifyOtp: mobile_number
        }, function(data) {
            var Result = IsJsonString(data) ? JSON.parse(data) : {
                success: false,
                error: data
            };
            
            if (!Result.success) {
                _ilm.showNotification(Result.error, true);
                initSlider();
            }
        });
    }

    initSlider();
});
</script>
