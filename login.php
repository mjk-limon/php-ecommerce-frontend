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
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <form class="_ilmForm" id="loginForm" action="" method="POST">
                                    <input type="hidden" name="loginUser" />
                                    <input type="hidden" class="refPage" name="ref" value="<?php echo $this->getReferences('url') ?>" />

                                    <div class="form-group widget_input">
                                        <label>Your Email Address</label>
                                        <input class="form-control" type="email" name="username" required />
                                    </div>
                                    <div class="form-group widget_input">
                                        <label>Password</label>
                                        <input class="form-control" type="password" name="password" required />
                                    </div>
                                    <div class="forget"><a href="#forgotPassword" data-toggle="modal">Forgot your password ?</a></div>
                                    <button type="submit" class="submit-btn iFSubmitBtn">Sign In</button>

                                    <div class="swap-btn"><a href="/register/?ref=<?php echo urlencode($this->getReferences('key')) ?>">Create new account</a></div>
                                </form>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <?php ?>
                                <div class="social-login-btns">
                                    <h5>or, Social Login</h5>
                                    <a href="<?php echo $this->getFacebookLoginUrl() ?>" class="sl-btn facebook">
                                        <i class="fa fa-facebook oc"></i> Login With Facebook
                                    </a>
                                    <a href="<?php echo $this->getGoogleLoginUrl() ?>" class="sl-btn google">
                                        <i class="fa fa-google"></i> Login With Google
                                    </a>
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

<script defer src="<?php echo Models::asset('assets/_ilm_own/js/loginPage_scripts.js') ?>"></script>