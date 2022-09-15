<?php

namespace _ilmComm;

?>

<section class="main-body">
    <div class="login_registration_body">
        <div class="container">
            <div class="wrapper-main">
                <div class="section-mb login_registration_widget">
                    <h2 class="widget_title">Existing User</h2>
                    <div class="registration_form">
                        <div role="tabpanel" class="logintabs <?php echo !adm_fet("_ilm_opt", "otp") ? 'no-otp' : 'hasotp'; ?>">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active">
                                    <a href="#OTP" aria-controls="OTP" role="tab" data-toggle="tab">Login Using Mobile Number</a>
                                </li>
                                <li role="presentation">
                                    <a href="#Username" aria-controls="Username" role="tab" data-toggle="tab">Login Using Email</a>
                                </li>
                            </ul>
                            <div class="row tab-mainc">
                                <div class="col-md-6">
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane login-with-otp active" id="OTP">
                                            <?php
                                            $this->layout(
                                                'login.otp_login_form',
                                                ['ref_url' => $this->getReferences('url')]
                                            );
                                            ?>
                                        </div>
                                        <div role="tabpanel" class="tab-pane login-with-email" id="Username">
                                            <?php
                                            $this->layout(
                                                'login.email_login_form',
                                                ['ref_url' => $this->getReferences('url'), 'ref_key' => $this->getReferences('key')]
                                            );
                                            ?>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="login-with-social">
                                        <?php
                                        $this->layout(
                                            'login.social_logins',
                                            ['fb_login_url' => $this->getFacebookLoginUrl(), 'google_login_url' => $this->getGoogleLoginUrl()]
                                        );
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="modal" id="forgotPassword" role="dialogue" tabindex="-1">
    <div class="vertical-alignment-helper">
        <div class="modal-dialog vertical-align-center">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="reset-account">
                        <div class="login_registration_widget limlog-form">
                            <span class="close" data-dismiss="modal">&times;</span>
                            <h4>Reset password</h4>
                            <form class="_ilmForm" id="resetPasswordForm" action="" method="POST">
                                <input type="hidden" name="forgotPassword" value="1" />
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="search-account">
                                            <label>Username/ Email</label>
                                            <input type="text" name="username" placeholder="Type a email/ username to reset your account passwrod" required />
                                            <a href="javascript:;" class="submit-btn searchacc-btn">Search your account</a>
                                        </div>
                                        <div class="verify-and-reset" style="display:none">
                                            <p>A verification code has been sent through your email. Also check the spam folder as well.</p>

                                            <label>Verfication Code</label>
                                            <input id="vcode" class="verification-code" type="text" pattern="[0-9]+" name="code" placeholder="6-Digit vefication code." required="">
                                            <label class="vcodelbl" for="vcode">
                                                <span></span><span></span><span></span><span></span><span></span><span></span>
                                            </label>

                                            <label>New Password</label>
                                            <input type="password" name="password" autocomplete="off" placeholder="Enter new password" required />

                                            <label>Confirm New Password</label>
                                            <input type="password" name="confirm" autocomplete="off" placeholder="Retype your new password" required />

                                            <button type="submit" class="submit-btn iFSubmitBtn">Reset Password</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script defer src="<?php echo asset('assets/_ilm_own/js/loginPage_scripts.js') ?>"></script>
