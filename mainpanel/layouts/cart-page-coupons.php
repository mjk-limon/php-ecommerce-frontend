<?php

namespace _ilmComm;

?>

<?php if ($this->CartCoupon === null) : ?>
    <form id="couponForm" action="" method="POST">
        <input type="hidden" name="couponFormSubmit" />
        <div class="inline-form">
            <input type="text" name="code" placeholder="Type your voucher code here.." />
            <button class="">Apply Coupon</button>
        </div>
    </form>
<?php elseif (!$this->CartCoupon->validate()) : ?>
    <p class="cp-error">Coupon date expired</p>
    <p class="cp-error"><a href="javascript:;" id="removeCoupon">Remove This</a></p>
<?php else : ?>
    <p class="used-cp">
        Used coupon: <?php echo $this->CartCoupon->getCouponCode() ?>
        <a href="javascript:;" id="removeCoupon">&times;</a>
        <span>You got <span><?php echo curr($this->CartSummery->getCouponDiscount()) ?></span> discount</span>
    </p>
<?php endif; ?>
