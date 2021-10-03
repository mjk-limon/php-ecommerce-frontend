<?php

namespace _ilmComm;
?>

	<div class="user-info" id="userinfo">
		<div class="row">
			<div class="col-md-3 col-xs-4">
				<div class="user-image">
					<img src="<?= Models::baseUrl($UserInfo->getUserImage()) ?>" class="img-responsive user-ppc" alt="" />

					<div class="user-options-nav">
						<a class="btn btn-info btn-file" href="javascript:;">
							<i class="fa fa-upload"></i> Update Profile Picture
							<input type="file" id="ppic-file-input" data-pp="<?= $UserInfo->getCusId() ?>" accept="image/jpeg,image/png" />
						</a>
						<a href="#up-userinfo" class="btn btn-info up-tab-btn"><i class="fa fa-pencil"></i> Update Profile</a>
						<a href="#up-userpassword" class="btn btn-warning up-tab-btn"><i class="fa fa-key"></i> Change Password</a>
					</div>
				</div>
			</div>
			<div class="col-md-9 col-xs-8">
				<div class="userinfo-header">
					<div class="user-basics">
						<em>You are logged in with:</em>
						<h3><?= $UserInfo->getFullName() ?> #<?= $UserInfo->getCusId() ?></h3>
						<p><?= $UserInfo->getUserName() ?></p>
						<p>Mobile: <?= $UserInfo->getMobileNumber() ?></p>
					</div>
				</div>
				<div class="userinfo-address">
					<p>Your given address: <strong><?= $UserInfo->getAddress() ?></strong></p>
					<p>
						City: <strong><?= $UserInfo->getCity() ?></strong>,
						State: <strong><?= $UserInfo->getState() ?></strong>
						Postal Code: <strong><?= $UserInfo->getPostalCode() ?></strong>
					</p>
					<p>And you are from: <strong><?= $UserInfo->getCountry() ?></strong></p>
				</div>
			</div>
		</div>
	</div>

	<div class="update-userinfo animated fadeInUp" id="up-userinfo" style="display:none;animation-duration:0.3s">
		<form id="updadeMyAccount" class="_ilmForm" action="" method="post">
			<input type="hidden" name="updadeMyAccount" />
			<input type="hidden" class="refPage" name="ref" value="/my-account/" />
			<input type="hidden" name="id" value="<?= $UserInfo->getCusId() ?>" />

			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>First Name</label>
						<input class="form-control" value="<?= $UserInfo->getFirstName() ?>" name="first_name" type="text" required />
					</div>
					<div class="form-group">
						<label>Last Name</label>
						<input class="form-control" value="<?= $UserInfo->getLastName() ?>" name="last_name" type="text" required />
					</div>
					<div class="form-group">
						<label>Email</label>
						<input class="form-control" value="<?= $UserInfo->getUserName() ?>" name="email" type="text" required readonly />
					</div>
					<div class="form-group">
						<label>Mobile Number</label>
						<input class="form-control" name="phone" value="<?= $UserInfo->getMobileNumber() ?>" type="text" required />
					</div>
					<div class="form-group">
						<label>Address</label>
						<textarea class="form-control" name="address_line_1" required><?= $UserInfo->getAddress() ?></textarea>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label>City/Division</label>
						<input class="form-control" name="city" value="<?= $UserInfo->getCity() ?>" type="text" required />
					</div>
					<div class="form-group">
						<label>State/District</label>
						<input class="form-control" name="state" value="<?= $UserInfo->getState() ?>" type="text" required />
					</div>
					<div class="form-group">
						<label>Postal Code</label>
						<input class="form-control" name="postalcode" value="<?= $UserInfo->getPostalCode() ?>" type="text" required />
					</div>
					<div class="form-group">
						<label>Country</label>
						<input class="form-control" name="country" value="<?= $UserInfo->getCountry() ?>" type="text" required />
					</div>
					<button type="submit" class="submit-btn iFSubmitBtn">Update</button>
					<a href="#userinfo" class="submit-btn secondary up-tab-btn">Cancel</a>
				</div>
			</div>
		</form>
	</div>

	<div class="update-user-password animated fadeInUp" id="up-userpassword" style="display:none;animation-duration:0.3s">
		<form id="updatePassword" class="_ilmForm" action="" method="post">
			<input type="hidden" name="updadeMyAccount" />
			<input type="hidden" class="refPage" name="ref" value="/my-account/" />
			<input type="hidden" name="id" value="<?= $UserInfo->getCusId() ?>" />

			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="form-group">
						<label>New Password</label>
						<input class="form-control" pattern=".{6,}" name="password" type="password" title="Password must be greater than 6 characters" required />
					</div>
					<div class="form-group">
						<label>Confirm New Password</label>
						<input class="form-control" name="confirm" type="password" required />
					</div>

					<button type="submit" class="submit-btn iFSubmitBtn">Update</button>
					<a href="#userinfo" class="submit-btn secondary up-tab-btn">Cancel</a>
				</div>
			</div>
		</form>
	</div>