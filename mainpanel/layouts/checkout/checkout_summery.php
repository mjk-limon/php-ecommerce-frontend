
<div class="order-summery">
    <div class="flex">
        <div class="order-summery-tab-1">
            <h3>Product Total</h3>
            <p>Total In Cart : <?php echo $this->CartData->getTotalItem() ?> item(s)</p>
            <p>Total Amount : <?php echo curr() ?> <span id="_cart_twd"><?php echo $this->CartData->getSubTotal() + $this->CartData->getTotalDiscount() ?></span></p>
        </div>
        <div class="order-summery-tab-1">
            <h3>Delivery Cost</h3>
            <p>Delivery Location: <span id="_cart_dl"></span></p>
            <p>Delivery Charge: <?php echo curr() ?> <span id="_cart_dc"></span></p>
        </div>
        <div class="order-summery-tab-1 disabled">
            <h3>Govt. Tax</h3>
            <p>Tax No: _______ </p>
            <p>Tax Amount: <?php echo curr() ?> __</p>
        </div>
        <div class="order-summery-tab-1">
            <h3>Discount</h3>
            <p>Product Discount: <span id="_cart_dt"><?php echo curr($this->CartData->getTotalDiscount()) ?></span></p>
            <p>Coupon Discount: <span id="_cart_cpd"><?php echo curr($this->CartData->getCouponDiscount()) ?></span></p>
            <p>Other Discount: 0</p>
        </div>
    </div>

    <div class="col-md-4 col-md-offset-4 order-total">
        <h4>Order Total</h4>
        <h3><span><?php echo curr() ?> <span id="_cart_odr_ttl"></span></span></h3>
    </div>
    <div class="clearfix"></div>
</div>
<div class="nav-invoker">
    <a class="first-tab-btn swtT nav-btn previous" href="javascript:;">Go Back</a>
    <a class="third-tab-btn swtT nav-btn" href="javascript:void(0)">Conitinue To Payment</a>
</div>
