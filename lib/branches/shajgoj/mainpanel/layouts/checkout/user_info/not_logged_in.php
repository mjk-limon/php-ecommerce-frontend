<div class="not-logged-in">
    <div class="row">
        <div class="col-md-6 checkout-login checkout-login-left">
            <?php if (adm_fet("_ilm_opt", "otp")) : ?>
                <div class="otp-login-form swap-otp-form limlog-form">
                    <?php $this->layout('login.otp_login_form', ['ref_url' => '/checkout']); ?>
                    <a href="javascript:;" class="swapotploginbtn email">Login Using Email Address</a>
                </div>
            <?php endif; ?>

            <div class="email-login-form swap-otp-form limlog-form">
                <?php $this->layout('login.email_login_form', ['ref_url' => '/checkout', 'ref_key' => 'p.05']); ?>
                <a href="javascript:;" class="swapotploginbtn">Login Using Mobile Number</a>
            </div>
        </div>

        <div class="col-md-1 hidden-xs"></div>

        <div class="col-md-5 checkout-login checkout-login-right">
            <div class="limlog-form">
                <div class="call-for-order text-center">
                    <h4>Call For Order</h4>
                    <h5 style="color: var(--accent)"><?php echo get_contact_information('mobile1') ?></h5>
                </div>

                <?php if (get_site_settings("qch")) : ?>
                    <div class="nav-invoker qc-inv">
                        <a class="nav-btn qchk-logchk-toggle" href="javascript:void(0)">
                            <i class="fa fa-clock-o"></i>
                            Quick Checkout
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
