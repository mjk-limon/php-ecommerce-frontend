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
                <div class="col-md-4 col-xs-6">
                    <div class="single-widget al-l">
                        <h2>FOLLOW US</h2>
                        <div class="fs-box">
                            <a href="<?php echo 'tel:' . Models::getContactInformation('phone') ?>" class="fs-box-inner">
                                <div class="fsb-icon"><i class="pbl-icon icn-tel"></i></div>
                                <div class="fsb-lbl">
                                    <div class="fsbl-tag">9AM - 8PM</div>
                                    <div class="fsbl-lbl"><?php echo Models::getContactInformation('phone') ?></div>
                                </div>
                            </a>
                        </div>
                        <div class="fs-box">
                            <a href="/page/store-location/" class="fs-box-inner">
                                <div class="fsb-icon">
                                    <i class="fa fa-map-marker fa-2x"></i>
                                </div>
                                <div class="fsb-lbl">
                                    <div class="fsbl-tag">Store Locations</div>
                                    <div class="fsbl-lbl">Find Our Stores</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-1 hidden-xs"></div>
                <div class="col-md-2 col-xs-6">
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
                <div class="col-md-2 col-xs-6">
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
                <div class="col-md-3 col-xs-6">
                    <div class="single-widget">
                        <h2>Connect With Us</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li>
                                <h5><?php echo COMPANY_NAME ?></h5>
                                <?php echo Models::getContactInformation('address') ?>
                            </li>
                            <li>
                                Email:
                                <?php echo Models::getContactInformation('email') ?>
                            </li>
                            <li>
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
                <p class="pull-left">
                    <img src="<?php echo Models::getLogo(2) ?>" class="footerlogo">
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
