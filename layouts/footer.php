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
            <div class="row flex" style="flex-wrap:wrap;">
                <div class="col-md-3 col-xs-6 flex">
                    <div class="single-widget">
                        <img src="<?php echo Models::asset("images/logo2.png") ?>" class="img-responsive">
                        <p style="margin-top: 20px">
                            <?php
                            Head\DevInfo::getDevComInfo();
                            ?>
                        </p>
                        <div class="social-icons text-center footer-social">
                            <ul class="nav">

                                <?php foreach ($socialLinks as $SK => $SL) : ?>
                                    <li>
                                        <a href="<?php echo $SL ?>" target="_blank">
                                            <i class="fa fa-<?php echo $SK ?>"></i>
                                        </a>
                                    </li>
                                <?php endforeach; ?>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-6">
                    <div class="single-widget">
                        <h2>USEFULL LINKS</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><i class="fa fa-chevron-right"></i><a href="/page/about-us/">About Us</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/term-of-use/">Terms &amp; Conditions</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/privacy-policy/">Privacy Policy</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/shipping-returns/">Shipping Returns</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/store-location/">Store Location</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-5 col-xs-6">
                    <div class="single-widget">
                        <h2>Contact Us</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li>
                                <h5><i class="fa fa-map-marker contact-icon"></i></h5>
                                <p><?php echo Models::getContactInformation('address') ?></p>
                            </li>
                            <li>
                                <h5><i class="fa fa-mobile contact-icon"></i></h5>
                                <p><?php echo Models::getContactInformation('mobile1') ?></p>
                            </li>
                            <li>
                                <h5><i class="fa fa-envelope-o contact-icon"></i></h5>
                                <p><?php echo Models::getContactInformation('email') ?></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<?php include realpath(__DIR__ . "/../layouts/footer-notification-modal.php"); ?>
<script src="<?= Models::asset("assets/vendors/__boo_tstrap/__ilm_boot_min.js") ?>"></script>
<script src="<?= Models::asset("assets/vendors/lazyload/lazyload.min.js") ?>"></script>
<script src="<?= Models::asset('assets/vendors/dd-slick/jquery.ddslick.min.js') ?>"></script>
<script src="<?= Models::asset('assets/vendors/counterup/odometer.min.js') ?>"></script>

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