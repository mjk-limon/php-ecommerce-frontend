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
                <div class="col-md-5 col-xs-12">
                    <div class="single-widget al-l">
                        <div class="footer-logo">
                            <img src="<?php echo Models::getLogo(2) ?>" class="footerlogo">
                        </div>

                        <div class="nuws">
                            <h2>Newsletter Singup</h2>
                            <form action="" method="POST" id="newslettersubmit" class="searchform _ilmForm">
                                <input type="hidden" name="newsletter_add" value="1" />
                                <div class="flex" style="max-width:350px">
                                    <input type="text" required="" name="email" placeholder="Email Address" />
                                    <button type="submit" class="btn btn-sub newsletter-btn iFSubmitBtn">SUBMIT</button>
                                </div>
                            </form>
                        </div>

                        <div class="all-right-reserved">
                            <p>
                                KiteShop.com.bd using brand name of SM Unitech BD Software (Pvt) Ltd.
                                under license No. C-132126.
                            </p>
                            <p>
                                Copyright @ 2009-2022, All Rights & Reserved by "SM Unitech BD Software
                                (Private) Limited".
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-6">
                    <div class="single-widget">
                        <h2>Cotact Info</h2>

                        <ul class="nav nav-pills nav-stacked nav-addresses">
                            <li>
                                <span>Address:</span>
                                <?php echo Models::getContactInformation("address") ?>
                            </li>
                            <li>
                                <span>Phone:</span>
                                <?php echo Models::getContactInformation("phone") ?>
                            </li>
                            <li>
                                <span>Email:</span>
                                <?php echo Models::getContactInformation("email") ?>
                            </li>
                        </ul>

                        <div class="social-icons" style="margin-top:10px;">
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
                    </div>
                </div>
                <div class="col-md-3 col-xs-6">
                    <div class="single-widget">
                        <h2>Account</h2>
                        <ul class="nav nav-pills nav-stacked">
                            <li><i class="fa fa-chevron-right"></i><a href="/page/about-us/">About Us</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/term-of-use/">Terms and Conditions</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/payment-methods/">How to Pay</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/blog/">Blog</a></li>
                            <li><i class="fa fa-chevron-right"></i><a href="/page/photo-confirmations/">Photo Confirmations</a></li>
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
