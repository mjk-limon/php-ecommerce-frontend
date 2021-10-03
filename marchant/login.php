<?php
	session_start();
	include "../includes/config_site.php";
	include "../includes/config_pr.php";
	require_once "../includes/functions.php";
	include "../includes/header.php";
?>
	<div class="marchant-corner">
		<div class="col-md-4 col-md-offset-4 mc-login">
			<h2>Merchant Login</h2>
			<form id="" action="" method="">
				<label> User Email : <input type="email" name="name" class="form-control"/></label>
				<label> Password : <input type="password" name="name" class="form-control"/></label>
				<input type="submit" name="" value="Login" class="btn btn-success" />
				<p>Don’t have a seller account? <a href="sellercorner/register/"><u>Register Here</u></a></p>
			</form>
		</div>
		<div class="clearfix"></div>
	</div>

<?php
	include "../includes/footer.php";
?>