<div class="glancebox-header">RECOMMENDED FOR YOU</div>

<div class="section-mb">

    <?php
    $sp = $this->SingleProduct;
    $Recommended = $this->productSuggestion(false, 4);
    while ($RcInfo = $Recommended->fetch_assoc()) :
        $sp->setProductInfo($RcInfo);
    ?>
        <div class="pr-glancebox">
            <div class="flex">
                <div class="gb-image" style="width: 35%;">
                    <img src="<?php echo $sp->getThumbnail() ?>" alt="">
                </div>
                <div class="gb-info" style="width: 65%;padding-left: 10px;">
                    <div class="gb-title"><?php echo $sp->getProductName() ?></div>
                    <div class="gb-description">
                        <p><strong><?php echo curr($sp->getPrice()) ?></strong></p>
                    </div>
                </div>
            </div>
            <div class="gb-pr-buy-nav pr-buy-navs">
                <div class="flex">
                    <ul class="qty-selection" style="width: 35%;">
                        <li class="item_minus"><a href="javascript:;">-</a></li>
                        <li class="item_qty item_qty_input"><input type="number" value="1" autocomplete="off" /></li>
                        <li class="item_plus"><a href="javascript:;">+</a></li>
                    </ul>
                    <ul class="bnav-btns">
                        <em data-prid="<?php echo $this->SingleProduct->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
                        <li class="add-to-cart add-cart cAddBuyNav">Add To Cart</li>
                    </ul>
                </div>
            </div>
        </div>
    <?php endwhile; ?>

</div>