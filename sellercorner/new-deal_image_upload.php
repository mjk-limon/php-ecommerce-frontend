<?php
	session_start();
	include "../includes/config.php";
	require_once "../includes/functions.php";
	$mcntInfo = merchant_login_check();
?>
<?php
	if($_SERVER['REQUEST_METHOD'] != 'POST') header('Location: '.$base.'sellercorner/new-deal/');
	else unset($_POST['add_pr_step_1']);
	$pr_clr_exp = ($_POST['pr_colors']) ? explode(',', $_POST['pr_colors']) : array("");
	$pr_clrs_count = count($pr_clr_exp);
?>
<?php
	//echo "<pre>"; print_r($_POST); echo "</pre>"; exit;
	if(isset($_POST['add_product'])) {
		$fields['id'] = get_product_id();
		$fields['name'] = $conn->real_escape_string($_POST['pr_name']);
		$fields['category'] = $conn->real_escape_string($_POST['pr_category']);
		$fields['subcategory'] = $conn->real_escape_string($_POST['pr_subhead']."-".$_POST['pr_subcategory']);
		$fields['marchant_id'] = $mcntInfo['id'];
		$fields['brand'] = $conn->real_escape_string($_POST['pr_brname']);
		$fields['size'] = $conn->real_escape_string($_POST['pr_sizes']);
		$fields['description'] = $conn->real_escape_string($_POST['pr_dis']);
		$fields['price'] = $conn->real_escape_string($_POST['pr_price']);
		$fields['discount'] = $conn->real_escape_string($_POST['pr_dicount']);
		$fields['item_left'] = $conn->real_escape_string($_POST['pr_stock']);
		$fields['views'] = 0; $fields['date_added'] = date("Y-m-d H:i:s");
		$fields['rating'] = "0-0"; $fields['others'] = ""; $fields['status'] = 1; 
		
		if(file_exists("../../proimg/".$fields['id']) && is_dir("../../proimg/".$fields['id'])){
			deleteDir("../../proimg/".$fields['id']);
			mkdir("../../proimg/".$fields['id'], 0777, true);
		} else mkdir("../../proimg/".$fields['id'], 0777, true);
		
		$color = isset($_POST['pr_colors']) ? $_POST['pr_colors'] : null; $total_image=0; $uploadOk=0; 
		if(!empty($color)) {
			$fields['colors'] = $color; $field_for_image = array();
			foreach(explode(',', $color) as $color_key=>$each_color_name) {
				$field_for_image[] = count($_FILES[$each_color_name."pr_img"]['name']); $total_image += count($_FILES[$each_color_name."pr_img"]['name']);
				foreach($_FILES[$each_color_name."pr_img"]['name'] as $key=>$value) {
					$j = $key+1; $file = upload_image($each_color_name."pr_img", $key, "../../proimg/{$fields['id']}/");
					if($file !== false){rename($file, "../../proimg/{$fields['id']}/{$each_color_name}{$j}.jpg"); $uploadOk += 1;}
				}
			}
			$fields['images'] = implode(',', $field_for_image); 
		} else {
			$fields['colors'] = null; $fields['images']	= count($_FILES["pr_img"]['name']); $total_image += $fields['images'];
			foreach($_FILES["pr_img"]['name'] as $key=>$value) {
				$j=$key+1; $file = upload_image("pr_img", $key, "../../proimg/{$fields['id']}/");
				if($file !== false){rename($file, "../../proimg/{$fields['id']}/{$j}.jpg"); $uploadOk += 1;}
			}
		}
		if(isset($_POST['dis_qty_from']) && !empty($_POST['dis_qty_from'])) {
			$conn->query(DeleteTable("pr_discounts", "prid = '{$fields['id']}'"));
			$dFields['prid'] = $fields['id'];
			$dFields['msr_unit'] = $conn->real_escape_string($_POST['msr_unit']);
			foreach(array_filter($_POST['dis_qty_from']) as $key => $dqtyf) {
				$dFields['item_from'] = $conn->real_escape_string($dqtyf);
				$dFields['item_to'] = $conn->real_escape_string($_POST['dis_qty_to'][$key]);
				$dFields['discount_amount'] = $conn->real_escape_string($_POST['dis_amount'][$key]);
				$conn->query(InsertInTable('pr_discounts', $dFields));
			}
		}
		
		$sql = InsertInTable('products', $fields);
		if($conn->query($sql)==true) header('Location: '.$base.'sellercorner/deal-management/?smsg='.urlencode('Successfully Added Product'));
		else header('Location: '.$base.'sellercorner/new-deal/?emsg='.urlencode($conn->error));
	}
?>

<?php include "includes/header.php"; ?>
<div class="main">
	<div class="">
		<div class="col-md-3 sidebar">
			<?php include "includes/marchant-sidebar-menu.php"; ?>
		</div>
		<div class="deal-management">
			<div class="main-interface">
				<h2 class="page-header"><i class="fa fa-plus"></i> New Deal</h2>
				<form id="" action="" method="POST" enctype="multipart/form-data">
					<input type="hidden" name="add_product" />
					<input type="hidden" name="marchant_id" value="1" />
				<?php foreach($_POST as $pKey => $pVal){ ?>
					<input type="hidden" name="<?= $pKey ?>" value="<?= htmlspecialchars($pVal) ?>" />
				<?php } ?>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Product Price</label>
								<div class="input-group input-group-sm">
									<span class="input-group-addon">BDT</span>
									<input class="form-control sel-price-inp" name="pr_price" type="number" value="0" min="0" required />
								</div>
							</div>		
							<div class="marchant-price-helper">
							<?php
								$commission_total = 900*(1/$marchant_commission);
								$marchant_get = 900-$commission_total;
							?>
								<h5>Price Rules</h5>
								<p>Example:</p>
								<p>Product Price: (<?= $currency ?>1000) - Product Discount: (10% ~ <?= $currency ?>100) = Selling Price (<?= $currency ?>900)</p>
								<p>Selling Price: (<?= $currency ?>900) - Commission: (<?= $marchant_commission ?>% ~ <?= $currency.' '.$commission_total ?>) = Marchant Will Get (<?= $currency.' '.$marchant_get ?>)</p>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Product Discount</label>
								<input name="pr_dicount" value="0" type="hidden"/>
								<div class="table-reponsive">
									<table class="table table-bordered disc-table">
										<thead>
											<tr>
												<th>Qty From</th>
												<th>Qty To</th>
												<th>Discount (%)</th>
											</tr>
										</thead>
										<tbody id="trElem">
											<tr id="nrElem">
												<td><input type="text" name="dis_qty_from[]" class="dqf dqfrq" /></td>
												<td><input type="text" name="dis_qty_to[]" /></td>
												<td><input type="text" name="dis_amount[]" class="dqfrq"/></td>
											</tr>
											<tr>
												<td><input type="text" name="dis_qty_from[]" class="dqf dqfrq" /></td>
												<td><input type="text" name="dis_qty_to[]" /></td>
												<td><input type="text" name="dis_amount[]" class="dqfrq"/></td>
											</tr>
											<tr>
												<td><input type="text" name="dis_qty_from[]" class="dqf dqfrq" /></td>
												<td><input type="text" name="dis_qty_to[]" /></td>
												<td><input type="text" name="dis_amount[]" class="dqfrq"/></td>
											</tr>
										</tbody>
										<tfoot>
											<tr>
												<td colspan="3">
													<a href="javascript:;" id="nrBtn"><i class="fa fa-plus"></i> Add new row</a>&nbsp;&nbsp;
													<a href="javascript:;" class="text-danger" style="display: none" id="rmvBtn"><i class="fa fa-minus"></i> Remove last row</a>
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
								<div class="form-group bmd-form-group">
									<label class="bmd-label-floating">Unit of Measurement</label>
									<input type="text" class="form-control" name="msr_unit" required >
								</div>
							</div>
						</div>
					</div>
				<?php for($pi_i = 0; $pi_i < $pr_clrs_count; $pi_i++){ ?>
					<div class="row my-2" id="primg-area">
						<div class="col-md-12">
							<div class="form-group">
								<label>Select Product Image<?= ($pr_clr_exp[$pi_i]) ? ' ('.$pr_clr_exp[$pi_i].' Color)' : null; ?></label>
								<div class="file-droper">
									<div class="droper-box">
										<div class="droper-text"><i class="fa fa-upload"></i> Select Files</div>
										<div class="droper-helper">Upload different images for each color product</div>
									</div>
									<div class="droper-retry">Select Again</div>
									<input type="file" name="<?= $pr_clr_exp[$pi_i] ?>pr_img[]" required multiple />
								</div>
								<span class="form-helper text-warning">Max File Size: 2MB, </span>
								<span class="form-helper">Select files for each colored image and select color of that image. 
								Put blank if you don't want to update product image</span>
							</div>
						</div>
					</div>
				<?php } ?>
					<input type="submit" class="btn btn-success" value="Upload" />
				</form>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function(){
		var nrElem = $('#nrElem').wrap('<div>').parent().html();
		$("#nrElem").unwrap();
		
		$('#nrBtn').on('click', function(e){
			e.preventDefault();
			$('#trElem').append(nrElem);
			$('#rmvBtn').show();
		});
		$('#rmvBtn').on('click', function(e){
			e.preventDefault();
			$('#trElem tr').last().remove();
			if($('#trElem tr').length == 3) $('#rmvBtn').hide();
		});
		$('#trElem').on('keyup', '.dqf', function(){
			var dqfVal = $(this).val();
			if(dqfVal) $(this).parent().parent().find('input.dqfrq').prop('required', true);
			else $(this).parent().parent().find('input.dqfrq').prop('required', false); 
		});
		// file droper
		$('.file-droper input[type=file]').change(function(){
			$droper = $(this).parent(); $droper.find(".droper-retry").show();
			var update = ($(this).prop('required')) ? false: true;
			var inputs = this; var url = $(this).val();
			var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
			$droper.find(".droper-box").html(""); 
			for($dri=0; $dri<inputs.files.length; $dri++) {
				if(inputs.files && inputs.files[$dri]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
					var reader = new FileReader(); $imgclri = 0;
					reader.onload = function (e) {
						var append_html = '<div class="dropped-item">';
						append_html += '<img src="'+e.target.result+'"/>';
						append_html += '</div>';
						$droper.find(".droper-box").append(append_html);
						$imgclri++;
					}
					reader.readAsDataURL(inputs.files[$dri]);
				}
			}
		});
	});
</script>