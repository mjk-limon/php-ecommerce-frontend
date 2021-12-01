<?php

use _ilmComm\Models;

$mcntInfo = $this->merchantAccountInfo();
$mcntInfo['bank_ac'] = "Pubali Bank_-_Uttara_-_12345678";
//echo '<pre>'; print_r($mcntInfo); echo '</pre>';exit;
$mc_img = "images/merchants/{$mcntInfo['id']}.png";
$mc_img = file_exists("../../" . $mc_img) ? $mc_img . "?" . rand(10000, 99999) : "images/32.jpg";
?>
<?php
$bac_info = explode("_-_", $mcntInfo['bank_ac'], 3);
$bac_name = $bac_info[0];
$bac_branch = $bac_info[1];
$bac_number = $bac_info[2];
?>
<?php
if (isset($_POST['update-profile'])) {
	$fields['name'] = $conn->real_escape_string($_POST['name']);
	$fields['company_name'] = $conn->real_escape_string($_POST['company_name']);
	$fields['mobile_number'] = $conn->real_escape_string($_POST['mobile_number']);
	$fields['address'] = $conn->real_escape_string($_POST['address']);
	$fields['bank_ac'] = $conn->real_escape_string($_POST['bac_name'] . "_-_" . $_POST['bac_branch'] . "_-_" . $_POST['bac_number']);
	if (!empty($_FILES['logo']['name'][0])) {
		$file = upload_image("logo", 0, "../../");
		$ext = resize_image(300, 0, "../../_tmp_file_mcnt_image", $file);
		rename("../../_tmp_file_mcnt_image.{$ext}", "../../images/merchants/{$mcntInfo['id']}.png");
	}
	if ($conn->query(UpdateTable("marchants", $fields, "id='{$mcntInfo['id']}'"))) {
		if (!empty($_POST['password'])) {
			if ($_POST['password'] == $_POST['password1']) {
				$pFields['password'] = $conn->real_escape_string(md5($_POST['password']));
				$conn->query(UpdateTable("marchants", $pFields, "id='{$mcntInfo['id']}'"));
			} else {
				$emsg = "Information Updated! Password not updated, Two password doesn't match";
				header("Location: " . $base . "sellercorner/user-account/?emsg=" . urlencode($emsg));
			}
		}
		header("Location: " . $base . "sellercorner/user-account/");
	} else header("Location: " . $base . "sellercorner/user-account/?emsg=" . urlencode($conn->error));
}
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header">
			<i class="fa fa-paper-plane"></i>
			Merchant Profile
		</h2>

        <?php if (!isset($_GET['edit'])) { ?>
            <div class="row">
                <div class="col-md-3">
                    <img src="<?= $mc_img ?>" class="img-responsive" alt="" />
                </div>
                <div class="col-md-9">
                    <h4 class="mt-0"><?= $mcntInfo['company_name'] ?></h4>
                    <p class="text-muted"><?= $mcntInfo['email'] ?></p>
                    <p class="text-muted"><?= $mcntInfo['mobile_number'] ?></p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p><strong>Owner Name: </strong><?= $mcntInfo['name'] ?></p>
                    <p><strong>Address: </strong><?= $mcntInfo['address'] ?></p>
                    <p><strong>Bank Name: </strong><?= $bac_name ?></p>
                    <p><strong>Bank Branch Name: </strong><?= $bac_branch ?></p>
                    <p><strong>Bank Account Number: </strong><?= $bac_number ?></p>
                    <p><strong>Joined: </strong><?= date("j F, Y", strtotime($mcntInfo['joined'])) ?></p>
                    <p>&nbsp;</p>
                    <a href="<?php echo Models::baseUrl('sellercorner/user-account/?edit') ?>" class="btn btn-info">Update Info</a>
                </div>
            </div>
        <?php } else { ?>
            <form id="" action="" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="update-profile" />
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Store Name</label>
                            <input type="text" name="company_name" value="<?= $mcntInfo['company_name'] ?>" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label>Owner Name</label>
                            <input type="text" name="name" value="<?= $mcntInfo['name'] ?>" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <textarea class="form-control" name="address" required><?= $mcntInfo['address'] ?></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Contact Number</label>
                            <input type="text" name="mobile_number" value="<?= $mcntInfo['mobile_number'] ?>" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label>Bank Account Info</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" name="bac_name" value="<?= $bac_name ?>" class="form-control" placeholder="Bank name" />
                                </div>
                                <div class="col-md-6">
                                    <input type="text" name="bac_branch" value="<?= $bac_branch ?>" class="form-control" placeholder="Branch Name" />
                                </div>
                            </div>
                            <div class="row" style="margin-top: 5px">
                                <div class="col-md-12">
                                    <input type="text" name="bac_number" value="<?= $bac_number ?>" class="form-control" placeholder="Account Number" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Shop Logo</label>
                            <input type="file" name="logo[]" accept="image/png" />
                        </div>
                    </div>
                </div>
                <div class="well" style="background-color: #ececec">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>New Password</label>
                                <input type="password" name="password" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="password1" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <p class="text-danger">If you want to keep password unchanged, Keep blank the password fields !</p>
                </div>
                <input type="submit" class="btn btn-info" value="Update" />
            </form>
        <?php } ?>
    </div>
</div>
