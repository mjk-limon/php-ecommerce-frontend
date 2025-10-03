<div class="product-title">
    <div class="pt-area">
        <?php if (!$this->mobileView) : ?>
            <h2 class="pr-name"><?php echo $this->ProductDetails->getProductNameuctName() ?></h2>
        <?php endif; ?>
        <p>Brand: <?php echo $this->ProductDetails->getBrandName() ?></p>
        <p>(45gm)</p>
    </div>
    <div class="pt-area">
        <div class="flex price-review-flex" style="justify-content: space-between">
            <p class="pr-price" data-dis="<?php echo $this->ProductDetails->getDiscount() ?>">
                <span><?php echo curr($this->ProductDetails->getPrice()) ?></span>
                <?php if ($this->ProductDetails->getDiscount()) : ?>
                    <span class="pre-price"><?php echo curr($this->ProductDetails->getPrice(0)) ?></span>
                <?php endif; ?>
            </p>
            <p><span style="color: #ffc168;">☆☆☆☆☆</span> (19 customer review)</p>
        </div>
    </div>
</div>