<?php

$sp->setPrInfo($pr_info);
$sp->processDiscount();
$sp->processStock();
?>

<div class="single-product <?php echo $this->spAddClass ?>">
    <div class="sp-image">

        <?php if ($sp->getOthers("prtype") === '0') : ?>
            <span class="sp-type">Wholesale</span>
        <?php endif; ?>
        
        <?php if ($sp->getDiscount()) : ?>
            <span class="sp-dis">-<?php echo $sp->getDiscount() ?>%</span>
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
                    <strong class="price"><?php echo curr($sp->getPrice()) ?></strong>

                    <?php if ($sp->getDiscount()) : ?>
                        <strong class="p-old"><?php echo curr($sp->getPrice(0)) ?></strong>
                    <?php endif; ?>

                </p>
            </div>
        </div>
        <div class="sp-nav">
            <em data-prid="<?php echo $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
            <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
            <a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
        </div>
    </div>
</div>