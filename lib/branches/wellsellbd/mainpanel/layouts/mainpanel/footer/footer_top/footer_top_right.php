<?php
// Social links
$socialLinks = $this->getSocialLinks();
?>

<div class="col-md-4 col-xs-6">
    <div class="single-widget al-l">
        <h2>FOLLOW US</h2>
        <div class="social-icons">
            <ul class="nav">

                <?php foreach ($socialLinks as $SK => $SL) : ?>
                    <li>
                        <a href="<?= $SL ?>" target="_blank">
                            <i class="fa fa-<?= $SK ?>" style="color:#fff"></i>
                        </a>
                    </li>
                <?php endforeach; ?>

            </ul>
        </div>
        <div class="nuws" style="padding-top: 10px;">
            <h2 style="margin-bottom: 0;">Newsletter Singup</h2>
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