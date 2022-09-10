<?php if (!$this->UserData) : ?>
    <?php $this->layout('checkout.user_info.not_logged_in'); ?>
    <?php $this->layout('checkout.user_info.guest'); ?>
<?php else : ?>
    <?php $this->layout('checkout.user_info.logged_in'); ?>
<?php endif; ?>
