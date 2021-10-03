<?php
	session_start();
	include "../includes/config_site.php";
	include "../includes/config_pr.php";
	require_once "../includes/functions.php";
	include "../includes/header.php";
?>
	<div class="marchant-corner">
		<div class="col-md-4 col-md-offset-8 mc-reg">
			<h2>Merchant Register</h2>
			<form id="" action="" method="">
				<label> Your Name : <input type="text" name="name" class="form-control"/></label>
				<label> Company Name  : <input type="text" name="name" class="form-control"/></label>
				<label> Your Email : <input type="email" name="name" class="form-control"/></label>
				<label> Your Mobile Number : <input type="text" name="name" class="form-control"/></label>
				<label> Address : <textarea name="name" rows="2" class="form-control"></textarea></label>
				<label> Password : <input type="password" name="name" class="form-control"/></label>
				<input type="submit" name="" value="Register" class="btn btn-success" />
				<p>Have a merchant account ? <a href="sellercorner/login/"><u>Login Here</u></a></p>
			</form>
		</div>
		<div class="clearfix"></div>
	</div>

<?php
	include "../includes/footer.php";
?>