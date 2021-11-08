<?php

namespace _ilmComm;

$socialLinks = $this->getSocialLinks();
$paymentMethods = $this->paymentMethods();
$shippingMethods = $this->shippingMethods();
?>

</section>
<footer id="footer">
    <!--Footer-->
    <div class="footer-widget">
        <div class="container" style="max-width:1200px">
            <div class="row">
                <div class="col-md-3 col-xs-6">
                    <div class="single-widget">
                        <h2>Get to know us</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><a href="/page/about-us/">About Us</a></li>
                            <li><a href="/page/term-of-use/">Terms and Conditions</a></li>
                            <li><a href="/page/payment-methods/">How to Pay</a></li>
                            <li><a href="/page/blog/">Blog</a></li>
                            <li><a href="/page/photo-confirmations/">Photo Confirmations</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-xs-6">
                    <div class="single-widget">
                        <h2>Support</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><a href="/contact/">Customer Care</a></li>
                            <li><a href="/page/privacy-policy/">Privacy Policy</a></li>
                            <li><a href="/page/shipping-returns/">Shipping Returns</a></li>
                            <li><a href="/page/store-location/">Store Location</a></li>
                            <li><a href="/page/locations-we-ship-to/">Location we ship to</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-xs-6">
                    <div class="single-widget">
                        <h2><?php echo COMPANY_NAME ?> Account</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><a href="/my-account/">User Account</a></li>
                            <li><a href="/my-account/?c=90.02">User Wishlists</a></li>
                            <li><a href="/my-account/?c=90.03">Order history</a></li>
                            <li><a href="/my-account/?c=90.04">My Reviews</a></li>
                            <li><a href="/page/testimonials/">Testimonials</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-xs-6">
                    <div class="single-widget">
                        <h2>Contact Us</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li>
                                <h5><i class="fa fa-map-marker contact-icon"></i> Office Address</h5>
                                <p><?php echo Models::getContactInformation('address') ?></p>
                            </li>
                            <li>
                                <h5><i class="fa fa-mobile contact-icon"></i> Phone</h5>
                                <p><?php echo Models::getContactInformation('mobile1') ?></p>
                            </li>
                            <li>
                                <h5><i class="fa fa-envelope-o contact-icon"></i> Email</h5>
                                <p><?php echo Models::getContactInformation('email') ?></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-xs-4 text-center">
                    <img src="<?php echo Models::getLogo() ?>" class="footerlogo">
                </div>
                <div class="col-md-8 col-xs-8 text-center">
                    <p><?php Head\DevInfo::getDevComInfo(); ?></p>
                </div>
            </div>
        </div>
    </div>
</footer>

<?php include realpath(__DIR__ . "/../layouts/footer-notification-modal.php"); ?>
<script src="<?php echo Models::asset("assets/vendors/__boo_tstrap/__ilm_boot_min.js") ?>"></script>
<script src="<?php echo Models::asset("assets/vendors/lazyload/lazyload.min.js") ?>"></script>
<script src="<?php echo Models::asset("assets/vendors/jssor/jssor.js") ?>"></script>
<script src="<?php echo Models::asset("assets/vendors/jssor/jssor.slider.js") ?>"></script>
<script src="<?php echo Models::asset('assets/vendors/dd-slick/jquery.ddslick.min.js') ?>"></script>
<script src="<?php echo Models::asset('assets/vendors/rtopvideoplayer/rtop.videoPlayer.1.0.2.min.js') ?>"></script>
<script src="<?php echo Models::asset('assets/vendors/sticky/jquery.sticky.js') ?>"></script>

<script src="<?php echo  Models::asset("assets/_ilm_own/js/__ilm_jqu_scrol-l.js") ?>"></script>
<script src="<?php echo  Models::asset("assets/_ilm_own/js/__ilm_page_plugins.js") ?>"></script>

<script src="<?php echo Models::asset("assets/_ilm_own/js/app/_ilm_Router.js") ?>"></script>
<script src="<?php echo Models::asset("assets/_ilm_own/js/app/_ilm_Cart.js") ?>"></script>
<script src="<?php echo Models::asset("assets/_ilm_own/js/app/_ilm_Form_handler.js") ?>"></script>
<script src="<?php echo Models::asset("assets/_ilm_own/js/app/_ilm_Paging.js") ?>"></script>
<script src="<?php echo Models::asset("assets/_ilm_own/js/app/_ilm_Quick_buy.js") ?>"></script>

<script src="<?php echo Models::asset("assets/_ilm_own/js/__ilm_page_func.js") ?>"></script>
<script type="text/javascript">
lazyLoadInstance.update()
</script>

<?php
$notification = Session::Get("msg");
if ($notification) :
    Session::Destroy("msg");
?>
    <script>
    showPageAlert("Alert !", "<?= htmlspecialchars($notification) ?>");
    </script>
<?php endif; ?>

</body>

</html>
