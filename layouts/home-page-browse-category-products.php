<?php

namespace _ilmComm;

$Ct_i = 1;
while ($TrPr = $BrowseCatProducts->fetch_assoc()) :
    $sp->setPrInfo($TrPr);
    $sp->processDiscount();
    $sp->processStock();
?>

    <?php
    if ($Ct_i == 1) :
        $CatImg = Models::asset('images/category-slides/' . Models::restyleUrl($Cat->Mainc) . '-3.jpg');
    ?>
        <div class="grids large-grid onlycolspan">
            <div class="prgrid-ads-section">
                <a href="<?= $Cat->getHref() ?>" class="prgrid-ad-img" style="background-image:url('<?= $CatImg ?>')"></a>
            </div>
        </div>
    <?php endif; ?>

    <div class="grids">
        <div class="bc-products">
            <div class="single-product <?= $spAddClass ?>">
                <div class="sp-image">

                    <?php if ($sp->getDiscount()) : ?>
                        <span class="sp-dis">-<?= round($sp->getDiscount()) ?>%</span>
                    <?php endif; ?>

                    <a href="<?= $sp->getHref() ?>">
                        <img src="<?= $sp->getProductImage() ?>" />
                    </a>
                </div>
                <div class="has-sp-nav">
                    <div class="sp-pr">
                        <div class="sp-pr-info">
                            <a href="<?= $sp->getHref() ?>">
                                <h5><?= $sp->getName() ?></h5>
                            </a>
                            <p>
                                <strong class="price"><?= Models::curr($sp->getPrice()) ?></strong>

                                <?php if ($sp->getDiscount()) : ?>
                                    <strong class="p-old"><?= Models::curr($sp->getPrice(0)) ?></strong>
                                <?php endif; ?>

                            </p>
                        </div>
                    </div>
                    <div class="sp-nav">
                        <em data-prid="<?= $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
                        <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
                        <a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php
    $Ct_i++;
endwhile;
?>