<?php
	session_start();
	include "../includes/config.php";
	require_once "../includes/functions.php";
	$marchant_scripts = true;
?>
<?php
	if(isset($_COOKIE['mc_t'])) header("Location: ".$base."sellercorner/");
	if(isset($_POST['merchant-register'])) {
		if($_POST['password'] == $_POST['password2']) {
			$fields['name'] = $conn->real_escape_string($_POST['name']);
			$fields['company_name'] = $conn->real_escape_string($_POST['company_name']);
			$fields['email'] = $conn->real_escape_string($_POST['email']);
			$fields['mobile_number'] = $conn->real_escape_string($_POST['mobile_number']);
			$fields['address'] = $conn->real_escape_string($_POST['address']);
			$fields['password'] = $conn->real_escape_string(md5($_POST['password']));
			$fields['status'] = 0; $fields['joined'] = date("Y-m-d H:i:s");
			$fields['mc_t'] = random_token();
			if($conn->query(InsertInTable("marchants", $fields))) {
				$smsg = "Merchant request is successfully sent!<br/> We'll contact you as soon as possible !";
				$mMessage = "<h4>Your merchant request is sent successfully ! We'll review your information and Confirm your soon </h4>";
				$mMessage.= "<p>Please keep your mobile phone turn on..</p>";
				$mMessage = merchant_mail_body($mMessage);
				$cMessage = "<h4 style='text-align:center'>New Merchant Request !</h4>";
				$cMessage.= "<p>Merchant is awaiting for your confirmation. Hurry up !</p>";
				$cMessage = merchant_mail_body($cMessage);
				send_mail($EmailToSend, $fields['email'], "Waiting for confirmation !", $mMessage);
				send_mail("no-reply@dhakasolution.com", $EmailToSend, "New Merchant Request !", $cMessage);
				header('Location: '.$base.'sellercorner/register/?smsg='.urlencode($smsg));
			} else header('Location: '.$base.'sellercorner/register/?emsg='.urlencode($conn->error));
		} else header('Location: '.$base.'sellercorner/register/?emsg='.urlencode("Two password doesn't match !"));
	}
?>
<?php include "../includes/header.php"; ?>
	<div class="marchant-corner">
		<div class="col-md-4 col-md-offset-8 mc-reg">
			<h2>Merchant Register</h2>
			<form id="" action="" method="POST">
				<input type="hidden" name="merchant-register" value="1" />
				<label> Your Name : <input type="text" name="name" class="form-control"/></label>
				<label> Company Name  : <input type="text" name="company_name" class="form-control"/></label>
				<label> Your Email : <input type="email" name="email" class="form-control"/></label>
				<label> Your Mobile Number : <input type="text" name="mobile_number" class="form-control"/></label>
				<label> Address : <textarea name="address" rows="2" class="form-control"></textarea></label>
				<label> Password : <input type="password" name="password" class="form-control"/></label>
				<label> Confirm Password : <input type="password" name="password2" class="form-control"/></label>
				<input type="submit" name="" value="Register" class="btn btn-success" />
				<p>Have a merchant account ? <a href="sellercorner/login/"><u>Login Here</u></a></p>
			</form>
		</div>
		<div class="clearfix"></div>
	</div>
<?php
	include "../includes/footer.php";
?>