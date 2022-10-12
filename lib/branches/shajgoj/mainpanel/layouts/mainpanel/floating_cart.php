<div class="floating-sc">
    <div class="sc-btn">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        <div><span id="fcTot"><?php echo $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
        <div class="fcamount"><?php echo curr() ?><span id="fcAmnt" class="odometer"><?php echo $this->CartData->getSubTotal() ?></span></div>
    </div>
    <div class="sc-body">
        <div class="clearfix sc-body-top">
            <span class="floating-sc-close"><i class="pe-7s-close"></i></span>
            <h4>CART</h4>
        </div>
        <div id="fsc-content" class="fsc-content slimScroll"></div>
    </div>
</div>