<form class="_ilmForm" id="loginForm" action="" method="POST">
    <input type="hidden" name="loginUser" />
    <input type="hidden" class="refPage" name="ref" value="<?php echo $ref_url ?>" />

    <div class="form-group widget_input">
        <label>Your Email Address</label>
        <input class="form-control" type="email" name="username" required />
    </div>
    <div class="form-group widget_input">
        <label>Password</label>
        <input class="form-control" type="password" name="password" required />
    </div>
    <div class="forget"><a href="/login/?ref=<?php echo urlencode($ref_key) ?>#forgotPassword" data-toggle="modal">Forgot your password ?</a></div>
    <button type="submit" class="submit-btn iFSubmitBtn">Sign In</button>

    <div class="swap-btn"><a href="/register/?ref=<?php echo urlencode($ref_key) ?>">Create new account</a></div>
</form>
