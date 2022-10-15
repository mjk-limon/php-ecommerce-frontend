<?php if ($this->ProductDetails->getOthers("prshortdes")) : ?>
    <div class="pr-short-description">
        <?php echo $this->ProductDetails->getOthers("prshortdes") ?>
    </div>
<?php endif; ?>

<div class="pr-meta-info">
    <span>SKU: <span><?php echo $this->ProductDetails->getOthers("sku") ?></span></span>
    <span>Categories: <span><?php echo $this->ProductDetails->getCategory("main") . ', ' . $this->ProductDetails->getCategory("header") ?></span></span>
    <span>
        Tags:
        <?php foreach (explode(',', $this->ProductDetails->getOthers("tags")) as $PrTag) : ?>
            <span>
                <a href="/search/?q=&a_s_t=tags&astval=<?php echo urlencode($PrTag) ?>">
                    <?php echo $PrTag ?>
                </a>
            </span>
        <?php endforeach; ?>
    </span>
</div>

<?php $this->extend('product_details.details_top.share_on_social') ?>