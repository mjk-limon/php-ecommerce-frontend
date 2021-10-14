<?php

namespace _ilmComm;

$socialLinks = $this->getSocialLinks();
$paymentMethods = $this->paymentMethods();
$shippingMethods = $this->shippingMethods();
?>

</section>
<footer id="footer">
    <div class="footer-widget">
        <div class="container">
            <div class="row">
                <div class="col-md-2p5 col-md-2 col-xs-6">
                    <div class="single-widget">
                        <h2>Company</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><i class="fa fa-chevron-right"></i><a href="/page/about-us/">About Us</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/term-of-use/">Terms and Conditions</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/payment-methods/">How to Pay</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/blog/">Blog</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/photo-confirmations/">Photo Confirmations</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-2p5 col-md-2 col-xs-6">
                    <div class="single-widget">
                        <h2>Support</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><i class="fa fa-chevron-right"></i><a href="/contact/">Customer Care</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/privacy-policy/">Privacy Policy</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/shipping-returns/">Shipping Returns</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/store-location/">Store Location</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/locations-we-ship-to/">Location we ship to</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-2p5 col-md-2 col-xs-6">
                    <div class="single-widget">
                        <h2>Account</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><i class="fa fa-chevron-right"></i><a href="/my-account/">User Account</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/my-account/?c=90.02">User Wishlists</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/my-account/?c=90.03">Order history</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/my-account/?c=90.04">My Reviews</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/testimonials/">Testimonials</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-4 col-xs-6">
                    <div class="single-widget al-l">
                        <h2>FOLLOW US</h2>
                        <div class="social-icons">
                            <ul class="nav">

                                <?php foreach ($socialLinks as $SK => $SL) : ?>
                                    <li>
                                        <a href="<?= $SL ?>" target="_blank">
                                            <i class="fa fa-<?= $SK ?>"></i>
                                        </a>
                                    </li>
                                <?php endforeach; ?>

                            </ul>
                        </div>
                        <div class="nuws">
                            <h2>Newsletter Singup</h2>
                            <p>Singup to recieve latest promotions</p>
                            <form action="" method="POST" id="newslettersubmit" class="searchform _ilmForm">
                                <input type="hidden" name="newsletter_add" value="1" />
                                <div class="flex">
                                    <input type="text" required="" name="email" placeholder="Email Address" />
                                    <button type="submit" class="btn btn-sub newsletter-btn iFSubmitBtn">SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-top">
        <div class="container">
            <div class="row">
                <div class="col-md-6 pm-delv">
                    <h4>Payment Methods</h4>

                    <?php foreach ($paymentMethods as $PM) : ?>
                        <img src="<?= Models::asset($PM); ?>" class="img-responsive" />
                    <?php endforeach; ?>

                </div>
                <div class="col-md-6 pm-delv">
                    <h4>Delivered By</h4>

                    <?php foreach ($shippingMethods as $SM) : ?>
                        <img src="<?= Models::asset($SM['method_logo']); ?>" class="img-responsive" alt="<?= htmlspecialchars($SM['method_name']) ?>" />
                    <?php endforeach; ?>

                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <div class="row">
                <p class="pull-left">
                    <img src="<?php echo Models::getLogo() ?>" class="footerlogo">
                </p>
                <p class="pull-right">
                    <?php
                    Head\DevInfo::getDevComInfo();
                    ?>
                </p>
            </div>
        </div>
    </div>
</footer>

<?php include realpath(__DIR__ . "/../layouts/footer-notification-modal.php"); ?>
<script src="<?= Models::asset("assets/vendors/__boo_tstrap/__ilm_boot_min.js") ?>"></script>
<script src="<?= Models::asset("assets/vendors/lazyload/lazyload.min.js") ?>"></script>
<script src="<?= Models::asset('assets/vendors/dd-slick/jquery.ddslick.min.js') ?>"></script>

<script src="<?= Models::asset("assets/_ilm_own/js/__ilm_jqu_scrol-l.js") ?>"></script>
<script src="<?= Models::asset("assets/_ilm_own/js/__ilm_page_plugins.js") ?>"></script>

<script src="<?= Models::asset("assets/_ilm_own/js/app/_ilm_Router.js") ?>"></script>
<script src="<?= Models::asset("assets/_ilm_own/js/app/_ilm_Cart.js") ?>"></script>
<script src="<?= Models::asset("assets/_ilm_own/js/app/_ilm_Form_handler.js") ?>"></script>
<script src="<?= Models::asset("assets/_ilm_own/js/app/_ilm_Paging.js") ?>"></script>
<script src="<?= Models::asset("assets/_ilm_own/js/app/_ilm_Quick_buy.js") ?>"></script>

<script src="<?= Models::asset("assets/_ilm_own/js/__ilm_page_func.js") ?>"></script>
<script type="text/javascript">
    lazyLoadInstance.update()
</script>

<?php
$notification = Session::Get("msg");
if ($notification) :
    Session::Destroy("msg");
?>
    <script type="text/javascript">
        showPageAlert("Alert !", "<?= htmlspecialchars($notification) ?>");
    </script>
<?php endif; ?>

</body>

</html>