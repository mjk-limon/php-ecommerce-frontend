<?php
	session_start();
	include "../includes/config.php";
	require_once "../includes/functions.php";
	$marchant_scripts = true;
?>
<?php
	if(isset($_COOKIE['mc_t'])) header("Location: ".$base."sellercorner/");
	if(isset($_POST['merchant_login'])) {
		$username = $conn->real_escape_string($_POST['username']);
		$password = $conn->real_escape_string(md5($_POST['password']));
		$userInfo = get_single_data("marchants", "email = '{$username}' AND password = '{$password}' LIMIT 1");
		if($userInfo['id']) {
			setcookie("mc_t", $userInfo['mc_t'], time() + (86400*10), "/");
			header("Location: ".$base."sellercorner/");
		} else header('Location: '.$base.'sellercorner/login/?emsg='.urlencode("Invalid username or password !"));
	}
?>
<?php include "../includes/header.php"; ?>
	<div class="marchant-corner">
		<div class="col-md-4 col-md-offset-4 mc-login">
			<h2>Merchant Login</h2>
			<form id="" action="" method="POST">
				<input type="hidden" name="merchant_login" value="1" />
				<label> User Email : <input type="email" name="username" class="form-control"/></label>
				<label> Password : <input type="password" name="password" class="form-control"/></label>
				<input type="submit" name="" value="Login" class="btn btn-success" />
				<p>Don’t have a seller account? <a href="sellercorner/register/"><u>Register Here</u></a></p>
			</form>
		</div>
		<div class="clearfix"></div>
	</div>
<?php
	include "../includes/footer.php";
?>