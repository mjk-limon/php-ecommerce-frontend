<?php

namespace _ilmComm;

// Get user wishlists
$WishLists = $this->UserData->getWishlistProducts();
$tlwidth = $this->mobileView ? 110 : 150;
?>

<?php if (!empty($WishLists)) : ?>
    <div class="my-wishlists">
        <h3>My Wishlists</h3>

        <?php
        foreach ($WishLists as $Prid) :
            // Set product id
            $PrInfo->setPrid($Prid);

            if (!$PrInfo->checkProduct()) {
                // Invalid product
                continue;
            }

            // Process product info
            $PrInfo->processDiscount();
            $PrInfo->processStock();
        ?>
            <div class="tlist-single">
                <a class="tl-rem cRemoveWishNav" href="javascript:;">
                    <dataset data-prid="<?php echo $Prid ?>"></dataset>
                    <i class="fa fa-heart"></i> Remove from wishlist
                </a>
                <div class="tlist-fullinfo sp-pr-info">
                    <div style="--tlwdth: <?php echo $tlwidth ?>px; background-image: url('<?php echo $PrInfo->getProductImage() ?>')" class="tl-img"></div>
                    <div style="--tlwdth: <?php echo $tlwidth ?>px;" class="tl-area">
                        <div class="fi-name">
                            <a href="<?php echo $PrInfo->getHref() ?>">
                                <?php echo $PrInfo->getName() ?>
                            </a>
                            <div class="fi-price-discount">
                                Unit Price: <?php echo curr($PrInfo->getPrice()) ?>

                                <?php if ($PrInfo->getDiscount()) : ?>
                                    <span class="p-old">(-<?php echo $PrInfo->getDiscount() ?>%)</span>
                                <?php endif; ?>

                            </div>
                        </div>
                        <div class="fi-nav">
                            <li><a href="<?php echo $PrInfo->getHref() ?>">Details</a></li>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php else : ?>
    <div class="no-products">
        <h4>Wishlists Is Empty! </h4>
        <ul>
            <li>You have no product in your wishlists</li>
            <li>Please go back. And add product to wishlist first</li>
            <li>For any help, Please contact our help center</li>
        </ul>
    </div>
<?php endif; ?>