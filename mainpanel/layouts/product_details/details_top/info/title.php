<div class="product-title">
    <div class="pt-area">

        <?php if (!$this->mobileView) : ?>
            <h2 class="pr-name"><?php echo $this->ProductDetails->getProductName() ?></h2>
        <?php endif; ?>

        <small>
            By, 
            <a href="<?php echo '/search/?q=&a_s_t=brand&astval=' . urlencode($this->ProductDetails->getBrandName()) ?>">
                <?php echo $this->ProductDetails->getBrandName() ?>
            </a>
        </small>

        <p class="pr-price"
           data-dis="<?php echo $this->ProductDetails->getDiscount() ?>"
           data-prs="<?php echo round($this->ProductDetails->getPrice()) ?>">
            <span><?php echo curr($this->ProductDetails->getPrice()) ?></span>

            <?php if ($this->ProductDetails->getDiscount()) : ?>
                <span class="pre-price"><?php echo curr($this->ProductDetails->getPrice(0)) ?></span>
            <?php endif; ?>

        </p>
    </div>
</div>
