<?php

namespace _ilmComm;

?>

<?php if (!$this->UserData) : ?>
    <!--Not Logged In-->
    <div class="not-logged-in">
        <div class="row">
            <div class="col-md-6 checkout-login checkout-login-left">
                <div class="limlog-form">
                    <form action="#" method="post" class="_ilmForm">
                        <input type="hidden" name="loginUser" />
                        <input type="hidden" class="refPage" name="ref" value="/checkout" />

                        <label>Your Email Address</label>
                        <input type="text" name="username" placeholder="Username/ Email Address" required />

                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" required />

                        <a href="/login/?ref=p.05#forgotPassword" class="pass">Forgot Password ?</a>
                        <button type="submit" class="iFSubmitBtn">Login</button>
                    </form>
                    <a href="/register/?ref=p.05" class="newacc">Create New Account</a>
                </div>
            </div>
            <div class="col-md-6 hidden-xs checkout-login checkout-login-right">
                <div class="limlog-form">
                    <ul class="large-block-grid-2 small-block-grid-1 large-social-buttons">
                        <li class="fb"><a href="https://www.facebook.com/" class="disabled"><span aria-hidden="true" class="fa fa-facebook"></span> Login With Facebook</a></li>
                        <li class="gp"><a href="https://google.com/" class="disabled"><span aria-hidden="true" class="fa fa-google">&nbsp;</span>Login With Google</a></li>
                        <li class="tw"><a href="https://twitter.com/" class="disabled"> <span aria-hidden="true" class="fa fa-twitter"></span> Login With Twitter</a></li>
                    </ul>
                </div>
            </div>
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

    <!--Quick Checkout-->
    <div class="quick-checkout">
        <form class="checkOutUserInfo" action="" method="post">
            <input type="hidden" name="email" value="" />

            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="limlog-form">
                        <div class="row">
                            <div class="col-md-12">
                                <label>Delivery Location</label>
                                <select name="orderLocation" id="orderLoc">

                                    <?php foreach ($DeliveryLocations as $Loc) : ?>
                                        <option value="<?php echo htmlspecialchars($Loc) ?>">
                                            <?php echo htmlspecialchars($Loc) ?>
                                        </option>
                                    <?php endforeach; ?>

                                </select>
                            </div>
                        </div>

                        <div class="shippingIdCont">
                            <label>Delivery Option</label>
                            <select name="shippingId" id="shippingId" required></select>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <label>Your Name</label>
                                <input type="text" name="fullName" required />
                            </div>
                            <div class="col-md-6">
                                <label>Your Mobile Number</label>
                                <input type="text" name="mobileNumber" required />
                            </div>
                        </div>

                        <label>Your Full Address</label>
                        <textarea name="fullAddress" required /></textarea>
                    </div>
                </div>
            </div>
            <div class="nav-invoker">
                <a class="nav-btn previous qchk-logchk-toggle" href="javascript:void(0)">Return to Login</a>
                <input type="submit" class="second-tab-btn swtT nav-btn" data-relative=".checkOutUserInfo" value="Save & Continue" />
            </div>
        </form>
    </div>
<?php else : ?>
    <!--Logged In-->
    <div class="logged-in">
        <form class="checkOutUserInfo" id="ckcontex" action="" method="post">
            <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
            <input type="hidden" name="fullName" value="<?php echo $this->UserData->getFullName() ?>" />
            <input type="hidden" name="mobileNumber" value="<?php echo $this->UserData->getMobileNumber() ?>" />
            <input type="hidden" name="orderLocation" value="<?php echo $this->UserData->getState() ?>" />
            <input type="hidden" name="fullAddress" value="<?php echo htmlspecialchars($this->UserData->getFullAddress()) ?>" />

            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="login-success">
                        <h3>You are logged in with <?php echo $this->UserData->getLastName() ?></h3>
                        <div class="limlog-form">
                            <table class="" border="0">
                                <tr>
                                    <td>Full Name:</td>
                                    <td><input type="text" name="shippingName" value="<?php echo $this->UserData->getFullName() ?>" disabled /></td>
                                </tr>
                                <tr>
                                    <td>Email Address:</td>
                                    <td><?php echo $this->UserData->getUserName() ?></td>
                                </tr>
                                <tr>
                                    <td>Mobile Number:</td>
                                    <td><input type="text" name="shippingNumber" value="<?php echo $this->UserData->getMobileNumber() ?>" disabled /></td>
                                </tr>
                                <tr>
                                    <td>Shipping Address: </td>
                                    <td>
                                        <textarea name="shippingAddress" disabled><?php echo $this->UserData->getFullAddress() ?></textarea>
                                        <p><a href="javascript:;" class="shippingChangeBtn"><i class="fa fa-pencil"></i> Change</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"><a href="/my-account/?logout=1&ref=p.05">Not You ? Login Again</a> </td>
                                </tr>
                            </table>

                            <select name="orderLocation" id="orderLoc">
                                <option value="<?php echo $this->UserData->getCity() ?>">
                                    <?php echo $this->UserData->getCity() ?>
                                </option>
                            </select>

                            <div class="shippingIdCont">
                                <label>Delivery Option</label>
                                <select name="shippingId" id="shippingId"></select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nav-invoker">
                <input type="submit" class="second-tab-btn swtT nav-btn" data-relative="#ckcontex" value="Save & Continue" />
            </div>
        </form>
    </div>
<?php endif; ?>
