<?php
// Social links
$socialLinks = $this->getSocialLinks();
?>

<div class="col-md-3 col-xs-6 flex">
    <div class="single-widget">
        <img src="<?php echo get_logo() ?>" class="img-responsive">
        <p style="margin-top: 20px"></p>
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
