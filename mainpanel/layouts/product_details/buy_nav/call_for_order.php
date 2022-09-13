<?php if (get_contact_information('phone')) : ?>
    <div class="callfororder">
        <i class="fa fa-phone callicon" aria-hidden="true"></i>
        <div class="callnumber">
            <p class="pnormelad">Call for order</p>
            <p class="pstrongad"><?php echo get_contact_information('phone') ?></p>
        </div>
    </div>
<?php endif; ?>
