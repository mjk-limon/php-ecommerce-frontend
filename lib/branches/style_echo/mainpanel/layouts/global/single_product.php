<?php

$sp->setProductInfo($pr_info);
$sp->buildProductDiscount();
$sp->buildPriceAndStock();

$MinOrder = $sp->getOthers("prminodr") ?: 1;
?>

<div class="single-product">
    <div class="sp-image">

        <?php if ($sp->getDiscount()) : ?>
            <span class="sp-dis">-<?php echo round($sp->getDiscount()) ?>%</span>
        <?php endif; ?>

        <?php if ($MinOrder > 1) : ?>
            <span class="sp-dis"
                style="background-color: var(--accent); color: #fff; top: 36px;">
                Wholesale
            </span>
        <?php endif; ?>

        <a href="<?php echo $sp->getProductLink() ?>">
            <img src="<?php echo asset("assets/images/preloader.gif") ?>"
                data-src="<?php echo asset($sp->getThumbnail()) ?>" />
        </a>
    </div>
    <div class="has-sp-nav">
        <div class="sp-pr">
            <div class="sp-pr-info">
                <a href="<?php echo $sp->getProductLink() ?>">
                    <h5><?php echo $sp->getProductName() ?></h5>
                </a>
                <p>
                    <strong class="price"><?php echo curr($sp->getPrice()) ?></strong>

                    <?php if ($sp->getDiscount()) : ?>
                        <strong class="p-old"><?php echo curr($sp->getPrice(0)) ?></strong>
                    <?php endif; ?>
                </p>
            </div>
        </div>
        <div class="sp-nav">
            <em data-prid="<?php echo $sp->getProductId() ?>" data-size="" data-colr="" data-qty="<?php echo $MinOrder ?>"></em>
            <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
            <a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
        </div>
    </div>
</div>