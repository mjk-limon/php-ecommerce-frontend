<?php

$sp->setPrInfo($pr_info);
$sp->processDiscount();
$sp->processStock();
?>

<div class="single-product m-flex fixed-nav">
    <div class="sp-image">

        <?php if ($sp->getDiscount()) : ?>
            <span class="sp-dis">SALE</span>
        <?php endif; ?>

        <a href="<?php echo $sp->getHref() ?>">
            <img src="<?php echo asset("images/preloader.gif") ?>" data-src="<?php echo $sp->getProductImage() ?>" />
        </a>
    </div>
    <div class="has-sp-nav">
        <div class="sp-pr">
            <div class="sp-pr-info">
                <a href="<?php echo $sp->getHref() ?>">
                    <h5><?php echo $sp->getName() ?></h5>
                </a>
                <p>
                    <?php if ($sp->getDiscount()) : ?>
                        <strong class="p-old"><?php echo curr($sp->getPrice(0)) ?></strong>
                    <?php endif; ?>

                    <strong class="price"><?php echo curr($sp->getPrice()) ?></strong>
                </p>
                <div style="color: #FF5722;text-align: center;font-weight: bold;">&nbsp;</div>
                <p><?php echo implode(', ', $sp->getSizes()) ?></p>
            </div>
        </div>

        <div class="sp-nav">
            <em data-prid="<?php echo $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
            <a href="javascript:;" class="add-cart cAddBuyNav">ADD TO CART</a>
        </div>
    </div>
</div>