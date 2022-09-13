<?php if (!$this->mobileView) : ?>
    <div class="floating-sc">
        <div class="sc-btn">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <div><span id="fcTot"><?php echo $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
        </div>
        <div class="sc-body">
            <div class="clearfix sc-body-top">
                <span class="floating-sc-close">&times;</span>
                <h4>Shopping Cart</h4>
                <span class="scb-ct"><?php echo $this->CartData->getTotalItem() ?> ITEM(S)</span>
            </div>
            <div id="fsc-content" class="fsc-content slimScroll"></div>
        </div>
    </div>
<?php endif; ?>