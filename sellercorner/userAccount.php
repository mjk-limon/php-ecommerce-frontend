<?php

use _ilmComm\Models;

$MI = $this->McntInfo;
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header">
			<i class="fa fa-user-circle-o"></i>
			Merchant Profile
		</h2>

        <?php if (!isset($_GET['edit'])) { ?>
            <div class="row">
                <div class="col-md-3">
                    <img src="<?php echo $MI['ppic'] ?>" class="img-thumbnail" style="padding: 10px;" />
                </div>
                <div class="col-md-9">
                    <h4 class="mt-0"><?php echo $MI['company_name'] ?></h4>
                    <p class="text-muted"><?php echo $MI['email'] ?></p>
                    <p class="text-muted"><?php echo $MI['full_info']['mobile'] ?></p>
                    <p><strong>Owner Name: </strong><?php echo $MI['name'] ?></p>
                    <p><strong>Address: </strong><?php echo $MI['full_info']['address'] ?></p>
                    <p><strong>Bank Name: </strong><?php echo $MI['full_info']['bank_name'] ?></p>
                    <p><strong>Bank Branch Name: </strong><?php echo $MI['full_info']['bank_branch'] ?></p>
                    <p><strong>Bank Account Number: </strong><?php echo $MI['full_info']['bank_account'] ?></p>
                    <p><strong>Joined: </strong><?php echo date("j F, Y", strtotime($MI['joined'])) ?></p>
                    <p>&nbsp;</p>
                    <a href="<?php echo Models::baseUrl('sellercorner/user-account/?edit') ?>" class="btn btn-info">Update Info</a>
                </div>
            </div>
        <?php } else { ?>
            <form id="" action="" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="update_account" />

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Store Name</label>
                            <input type="text" name="company_name" value="<?php echo $MI['company_name'] ?>" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label>Owner Name</label>
                            <input type="text" name="name" value="<?php echo $MI['name'] ?>" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <textarea class="form-control" name="fi[address]" required><?php echo $MI['full_info']['address'] ?></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Contact Number</label>
                            <input type="text" name="fi[mobile]" value="<?php echo $MI['full_info']['mobile'] ?>" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label>Bank Account Info</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" name="fi[bank_name]" value="<?php echo $MI['full_info']['bank_name'] ?>" class="form-control" placeholder="Bank name" />
                                </div>
                                <div class="col-md-6">
                                    <input type="text" name="fi[bank_branch]" value="<?php echo $MI['full_info']['bank_branch'] ?>" class="form-control" placeholder="Branch Name" />
                                </div>
                            </div>
                            <div class="row" style="margin-top: 5px">
                                <div class="col-md-12">
                                    <input type="text" name="fi[bank_account]" value="<?php echo $MI['full_info']['bank_account'] ?>" class="form-control" placeholder="Account Number" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Shop Logo</label>
                            <input type="file" name="logo" accept="image/png" />
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
