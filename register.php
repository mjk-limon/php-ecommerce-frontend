<?php

namespace _ilmComm;

$States = $this->fetchStates();
$AllLocations = $this->fetchAllLocations();
?>

<section class="main-body">
    <div class="login_registration_body registration-page">
        <div class="container">
            <div class="wrapper_main">
                <div class="section-mb login_registration_widget">
                    <h2 class="widget_title">New Account Registration</h2>
                    <div class="registratio-helper">
                        <p class="text-muted">Fill the required field to complete your registration.</p>
                    </div>
                    <form class="_ilmForm" id="registrationForm" action="" method="post">
                        <input type="hidden" name="registerUser" value="1" />
                        <input type="hidden" class="refPage" name="ref" value="<?php echo $this->getReferences('url') ?>" />
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input class="form-control" name="first_name" placeholder="First Name:" type="text" required autofocus />
                                </div>
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input class="form-control" name="last_name" placeholder="Last Name:" type="text" required />
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input class="form-control" name="email" placeholder="Email Address:" type="email" required />
                                </div>
                                <div class="form-group">
                                    <label>Mobile Number</label>
                                    <input class="form-control" name="phone" placeholder="Mobile Number:" type="text" required />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input class="form-control" name="password" pattern=".{6,}" type="password" title="Password must be greater than 6 characters" placeholder="Password" required />
                                </div>
                                <div class="form-group">
                                    <label>Confirm Password</label>
                                    <input class="form-control" name="confirm-password" placeholder="Confirm password" type="password" required />
                                </div>
                                <div class="form-group">
                                    <label>Gender: </label>
                                    <label class="radio-inline"><input type="radio" name="radio" checked=""><i></i>Male</label>
                                    <label class="radio-inline"><input type="radio" name="radio"><i></i>Female</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Address </label>
                                    <textarea class="form-control" name="address_line_1" placeholder="Address:" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Devision/ State </label>
                                    <select class="form-control" id="id_state" name="state" autocomplete="off" required>

                                        <?php
                                        while ($DS = $States->fetch_assoc()) :
                                            $City = htmlspecialchars($DS['city']);
                                        ?>
                                            <option value="<?php echo $City ?>">
                                                <?php echo $City ?>
                                            </option>
                                        <?php endwhile; ?>

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>District/ City </label>
                                    <select name="city" id="id_city" class="form-control" required>

                                        <?php
                                        while ($DL = $AllLocations->fetch_assoc()) :
                                            $City = htmlspecialchars($DL['city']);
                                            $Loc = htmlspecialchars($DL['location']);
                                        ?>
                                            <option value="<?php echo $Loc ?>" data-city="<?php echo $City ?>">
                                                <?php echo $Loc ?>
                                            </option>
                                        <?php endwhile; ?>

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Postal Code </label>
                                    <input class="form-control" name="postalcode" placeholder="Postal Code:" type="text" required />
                                </div>
                                <div class="checkbox">
                                    <label><input type="checkbox" checked name="nws" value="1">Subscribe email for <?php echo COMPANY_NAME ?>'s offer and promotions</label>
                                </div>
                                <button class="g-recaptcha submit-btn iFSubmitBtn" type="submit">Create an account</button>
                                <div class="social-login-btns disabled">
                                    <h5>Import Data,</h5>
                                    <div class="row">
                                        <div class="col-md-6"><a class="sl-btn facebook"><i class="fa fa-facebook"></i> Facebook</a></div>
                                        <div class="col-md-6"><a class="sl-btn google"><i class="fa fa-google"></i> Google</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swap-btn"><a href="/login/?ref=<?php echo urlencode($this->getReferences('key')) ?>">Already have an account? Login here.</a></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
<script src="https://www.google.com/recaptcha/api.js?render=6Lc0vykaAAAAAPPI-rqv0e20S-fNcKN0JOAWCdIx"></script>
<script async src="<?php echo Models::asset('assets/_ilm_own/js/registerPage_scripts.js') ?>"></script>