<?php

$SelfUrl = base_url('details/' . $this->Mainc . '/' . $this->Prid . '/');
?>

<ul class="share">
    <p class="shareli">
        Share on:
    </p>
    <li>
        <a href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-facebook"></i></a>
    </li>
    <li>
        <a href="http://twitter.com/share?text=<?php echo urlencode(COMPANY_NAME) ?>+Product&url=<?php echo urlencode($SelfUrl); ?>&hashtags=<?php echo urlencode(COMPANY_NAME) ?>,Ecommerce,Products,<?php echo urlencode($this->Mainc); ?>" target="_blank"><i class="fa fa-twitter"></i></a>
    </li>
    <li>
        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode($SelfUrl); ?>&title=<?php echo urlencode(COMPANY_NAME) ?>+Products&summary=&source=" target="_blank"><i class="fa fa-linkedin"></i></a>
    </li>
    <li>
        <a href="https://pinterest.com/pin/create/button/?url=<?php echo urlencode($SelfUrl); ?>&media=<?php echo urlencode(base_url("proimg/" . $this->Prid . "/thumb.jpg")); ?>&description=" target="_blank"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
    </li>

    <?php if ($this->mobileView) : ?>
        <li>
            <a class="noRoute" href="whatsapp://send?text=<?php echo urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
        </li>
    <?php else : ?>
        <li>
            <a href="https://wa.me/?text=<?php echo urlencode($SelfUrl); ?>" target="_blank"><i class="fa fa-whatsapp"></i></a>
        </li>
    <?php endif; ?>

</ul>
