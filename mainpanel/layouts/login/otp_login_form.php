<form class="_ilmForm" id="otpLoginForm" action="" method="POST">
    <input type="hidden" name="otpLoginUser" />
    <input type="hidden" class="refPage" name="ref" value="<?php echo $ref_url ?>" />

    <div class="form-group widget_input">
        <label>Your Mobile Number</label>
        <div class="input-group">
            <div class="input-group-addon">+88</div>
            <input class="form-control verf-input" name="mobile_number" placeholder="01XXXXXXXXX" required />
        </div>
    </div>

    <div class="verification-section">
        <div id="verify-slider">
            <button class="submit-btn">Send OTP</button>
        </div>

        <div class="form-group verification-code">
            <label>Verification Code</label>
            <input class="form-control" name="otp" pattern="[0-9]+" required />
            <span class="form-helper"><a href="javascript:;" class="reset disabled">Resend Verification Code (<span>20 </span>s)</a></span>
        </div>

        <div class="form-group">
            <button type="submit" class="submit-btn iFSubmitBtn">Verify</button>
        </div>
    </div>
</form>

<?php $this->layout('global.javascripts.otp_login') ?>
