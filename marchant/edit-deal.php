<?php
	session_start();
	include "../includes/config_site.php";
	include "../includes/config_pr.php";
	require_once "../includes/functions.php";
	//if(!isset($_COOKIE['mc_t']) || empty($_COOKIE['mc_t']))header('Location: register/');
?>
<?php 
	if(isset($_POST['update_deal_info'])) {
		$prid = $conn->real_escape_string($_POST['pid']); 
		$uploadOk = 0; $cwi_array = array();
		
		$r_prevImageCount = $conn_pr->query("SELECT images,colors FROM products WHERE id='{$prid}'")->fetch_assoc();
		$prevColorArray = explode(',', $r_prevImageCount['colors']);
		$prevCountArray = explode(',', $r_prevImageCount['images']);
		foreach($prevColorArray as $colorkey=>$color){
			$imageSl = 1;
			for($i=1; $i<=$prevCountArray[$colorkey]; $i++) {
				if(file_exists("../../proimg/".$prid."/".$color.$i.".jpg")) {
					rename("../../proimg/".$prid."/".$color.$i.".jpg", "../../proimg/".$prid."/".$color.$imageSl.".jpg");
					$imageSl++;
				}
			}
			$CnCode = !empty($color) ? $color : 0;
			$prevCountArray[$colorkey] = $prevCnC_Array[$CnCode] = $imageSl-1;
		}
		//
		$uFields['colors'] = implode(",", $prevColorArray); $uFields['images'] = implode(",", $prevCountArray);
		$conn_pr->query(UpdateTable("products", $uFields, "id='{$prid}'"));
		
		$fields['name'] = $conn->real_escape_string($_POST['pr_name']);
		$fields['brand'] = $conn->real_escape_string($_POST['pr_brname']);
		$fields['size'] = $conn->real_escape_string($_POST['pr_sizes']);
		$fields['description'] = $conn->real_escape_string($_POST['pr_dis']);
		$fields['price'] = $conn->real_escape_string($_POST['pr_price']);
		$fields['discount'] = $conn->real_escape_string($_POST['pr_dicount']);
		$fields['item_left'] = $conn->real_escape_string($_POST['pr_stock']);
		//$fields['others']	= isset($_POST['pr_others']) ? $_POST['pr_others'] : null;
		
		if(!empty($_FILES["pr_img"]['name'][0])) {
			if(!empty($_POST['pr_colors'])) {
				foreach($_FILES["pr_img"]['name'] as $img_key=>$img) {
					$img_color = $cwi_array[] = $conn->real_escape_string($_POST['imgclr'.$img_key]);
					$prevTotal = (isset($prevCnC_Array[$img_color])) ? $prevCnC_Array[$img_color] : 0;
					$img_sa = array_count_values($cwi_array)[$img_color]+$prevTotal;
					$uploaded_file = upload_image("pr_img", $img_key, "../");
					resize_image(1536, 0, "../../proimg/{$prid}/{$img_color}{$img_sa}", $uploaded_file);
				}
				$cwi_acv = array_count_values($cwi_array);
				function combineWithKeys($a1, $a2){
					$sums = array();
					foreach (array_keys($a1 + $a2) as $key) {
						$sums[$key] = (isset($a1[$key]) ? $a1[$key] : 0) + (isset($a2[$key]) ? $a2[$key] : 0);
					}
					return $sums;
				}
				$cwi_acv = combineWithKeys($cwi_acv, $prevCnC_Array);
				//echo "<pre>"; print_r(combineWithKeys($cwi_acv, $prevCnC_Array)); echo "</pre>"; exit;
				$fields['colors'] = $conn->real_escape_string(implode(",", array_keys($cwi_acv)));
				$fields['images'] = $conn->real_escape_string(implode(",", $cwi_acv));
			} else {
				$fields['colors'] = "";
				$fields['images']	= count($_FILES["pr_img"]['name']);
				for($j = 1; $j <= $fields['images']; $j++){
					$imageArray	= $j-1;
					$prevTotal = (isset($prevCnC_Array[0])) ? $prevCnC_Array[0] : 0;
					$img_sa = $j+$prevTotal;
					$uploaded_file = upload_image("pr_img", $imageArray, "../");
					resize_image(1536, 0, "../proimg/{$prid}/{$img_sa}", $uploaded_file);
				}
			}
		}
		
		$sql	= UpdateTable('products', $fields, " id = '{$prid}' ");
		if($conn_pr->query($sql)==true) echo "Success";
		else echo $conn_pr->error;
	}
?>
<?php
	$prid = isset($_GET['prid']) ? $conn->real_escape_string($_GET['prid']) : exit(header("Location: {$base}sellercorner/deal-management/"));
	$dealInfo = details_page($prid);
?>
<?php include "../includes/header.php";; ?>
<div class="main">
	<div class="container">
		<div class="row">
			<div class="col-md-2p5 col-md-3 sidebar">
				<?php include "../includes/marchant-sidebar-menu.php"; ?>
			</div>
			<div class="col-md-9p5 col-md-9 deal-management">
				<div class="main-interface">
					<h2 class="page-header"><i class="fa fa-pencil"></i> Edit Deal Details</h2>
					<div class="row">
						<form action="" method="POST" enctype="multipart/form-data">
							<input type="hidden" name="update_deal_info">
							<input type="hidden" name="pid" value="<?= $prid ?>">
							<input type="hidden" name="marchant_id" value="1" />
							<div class="col-md-12">
								<div class="form-group">
									<label>Product Name</label>
									<input type="text" name="pr_name" class="form-control" value="<?= htmlspecialchars($dealInfo['name']) ?>" required />
								</div>
								<div class="form-group">
									<label>Brand Name</label>
									<input type="text" name="pr_brname" class="form-control" value="<?= htmlspecialchars($dealInfo['brand']) ?>" />
								</div>
								<div class="form-group">
									<label>Product Description</label>
									<textarea name="pr_dis" class="form-control" id="editor"><?= $dealInfo['description'] ?></textarea>
								</div>
								<div class="form-group">
									<label>Available Sizes: </label>
									<input type="text" class="form-control" name="pr_sizes" id="pr_sizes" data-role="tagsinput"/> 
									<span class="form-helper">Available products sizes. Use comma (,) or Enter key for insert multiple value.</span>
								</div>
								<div class="form-group">
									<label>Product Price</label>
									<div class="input-group input-group-sm">
										<span class="input-group-addon">BDT</span>
										<input class="form-control" name="pr_price" type="number" value="<?= htmlspecialchars($dealInfo['price']) ?>" min="0" required />
									</div>
								</div>
								<div class="form-group">
									<label>Product Discount</label>
									<div class="input-group input-group-sm">
										<input class="form-control" name="pr_dicount" type="number" value="<?= htmlspecialchars($dealInfo['discount']) ?>" min="0" max="100" required />
										<span class="input-group-addon">%</span>
									</div>
								</div>
								<div class="form-group">
									<label>Sotabdi Selling Price</label>
									<div class="input-group input-group-sm">
										<span class="input-group-addon">BDT</span>
										<input class="form-control" type="number" value="0" readonly />
									</div>
								</div>
								<div class="form-group">
									<label>Item In Stock</label>
									<input type="number" name="pr_stock" class="form-control" value="<?= htmlspecialchars($dealInfo['item_left']) ?>" required />
								</div>
								<div class="form-group">
									<label>Available Colors: </label>
									<input type="text" class="form-control" name="pr_colors" id="pr_colors"/>
									<span class="bmd-help d-block position-relative">Available products color name. Use comma (,) or Enter key for insert multiple value.</span>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="old-items well form-group">
										<?php
										foreach(explode(",", $dealInfo['colors']) as $key=>$color) {
										for($i=1; $i<= explode(",", $dealInfo['images'])[$key]; $i++){
										?>
											<div class="oitem">
												<span class="remove" data-key="<?= $i ?>" data-color="<?= $color ?>">&times;</span>
												<img src="proimg/<?= $dealInfo['id'] ?>/<?= $color.$i ?>.jpg">
											</div>
										<?php }} ?>
											<div><span class="bmd-help">After deleting any product image, don't forget to hit "Update" button</span></div>
										</div>
									</div>
								</div>
								<div class="row my-2" id="primg-area">
									<div class="col-md-12">
										<div class="form-group">
											<label>Select Product Image</label>
											<div class="file-droper">
												<div class="droper-box">
													<div class="droper-text"><i class="fa fa-upload"></i> Select Files</div>
													<div class="droper-helper">Upload different images for each color product</div>
												</div>
												<div class="droper-retry">Select Again</div>
												<input type="file" name="pr_img[]" multiple />
											</div>
											<span class="form-helper text-warning">Max File Size: 2MB, </span>
											<span class="form-helper">Select files for each colored image and select color of that image. 
											Put blank if you don't want to update product image</span>
										</div>
									</div>
								</div>
								<div class="form-group">
									<input type="submit" name="submit" value="Update" class="btn btn-success"/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<link href="css/trumbowyg/ui/trumbowyg.css" rel="stylesheet" />
<script src="css/trumbowyg/trumbowyg.js"></script>
<script src="js/__dtag_s_input"></script>
<script>
$(document).ready(function(){
	$(".remove").on('click', function(){
		$that = $(this);
		var key = $(this).data("key");
		var color = $(this).data("color");
		$.ajax({
			type: "POST",
			url: "sellercorner/ajax/",
			data: {delImg:1,prId:<?= $prid ?>,key:key,color:color},
			success: function(data){
				if(data == 1) {
					$that.parent().fadeOut();
				} else alert(data);
			}
		})
	});
	// tagsinput for color
	if($("#pr_colors").length) {
		$('#pr_colors').tagsinput({
			onTagExists: function(item, $tag) {$tag.hide().fadeIn();},
			trimValue: true,
			tagClass: function(item) {
				switch (item) {
					case 'red' : return 'label red'; break;
					case 'orange' : return 'label orange'; break;
					case 'yellow' : return 'label yellow'; break;
					case 'green' : return 'label green'; break;
					case 'cyan' : return 'label cyan'; break;
					case 'blue' : return 'label blue'; break;
					case 'indigo' : return 'label indigo'; break;
					case 'violet' : return 'label violet'; break;
					case 'purple' : return 'label purple'; break;
					case 'magenta' : return 'label magenta'; break;
					case 'pink' : return 'label pink'; break;
					case 'brown' : return 'label brown'; break;
					case 'white' : return 'label white'; break;
					case 'black' : return 'label black'; break;
					case 'skyblue' : return 'label skyblue'; break;
				}
			}
		});
		$('#pr_colors').on('beforeItemAdd', function(event) {
			if (event.item !== event.item.toLowerCase()) {
				event.cancel = true; $(this).tagsinput('add', event.item.toLowerCase());
			}
		});
		$('#pr_colors').on('itemAdded', function(event) {
			$('.file-droper .dropped-item select option').filter(function () {
					return $.trim($(this).text()) == 'No color'
			}).remove();
			$('.file-droper .dropped-item select').append("<option>"+event.item+"</option>");
		});
		$('#pr_colors').on('itemRemoved', function(event) {
			$('.file-droper .dropped-item select option').filter(function () {
					return $.trim($(this).text()) == $.trim(event.item)
			}).remove();
			if($(this).tagsinput('items').length == 0) 
				$('.file-droper .dropped-item select').append("<option>No color</option>");
		});
		$('#pr_sizes').tagsinput('add', "<?= htmlspecialchars($dealInfo['size']) ?>");
		$('#pr_colors').tagsinput('add', "<?= htmlspecialchars($dealInfo['colors']) ?>");
	}
	
	// file droper
	$('.file-droper input[type=file]').change(function(){
		$droper = $(this).parent(); $droper.find(".droper-retry").show();
		var update = ($(this).prop('required')) ? false: true;
		var inputs = this; var url = $(this).val();
		var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
		$droper.find(".droper-box").html(""); 
		for($dri=0; $dri<inputs.files.length; $dri++) {
			if(inputs.files && inputs.files[$dri]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
				var colors = ($("#pr_colors").tagsinput('items').length === 0) ? ["No color"] : $("input[name=pr_colors]").tagsinput('items');
				var reader = new FileReader(); $imgclri = 0;
				reader.onload = function (e) {
					var append_html = '<div class="dropped-item">';
					append_html += '<img src="'+e.target.result+'"/>';
					append_html += '<select name="imgclr'+$imgclri+'" class="bg-primary">';
					for($cli=0; $cli<colors.length; $cli++) {append_html += '<option>'+colors[$cli]+'</option>';}
					append_html += '</select>';
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
<script>
	var uploadOptions = {
			serverPath: 'https://api.imgur.com/3/image',
			fileFieldName: 'image',
			headers: {'Authorization': 'Client-ID 9e57cb1c4791cea'},
			urlPropertyName: 'data.link',
			imageWidthModalEdit: true
	};
	var customizedButtonPaneTbwOptions = {
			autogrow: true,
			imageWidthModalEdit: true,
			btnsGrps: {
					test: ['strong', 'em'] // Custom nammed group
			},
			btnsDef: {
					align: {
							dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
							ico: 'justifyLeft'
					},
					image: {
							dropdown: ['insertImage', 'upload'],
							ico: 'insertImage'
					},
					lists: {
							dropdown: ['unorderedList', 'orderedList'],
							ico: 'unorderedList'
					}
			},
			btns: [
					['viewHTML'],
					['formatting'],
					['strong', 'em', 'underline', 'del'],
					['align'],
					['createLink', 'unlink'],
					['image', 'noembed'],
					['foreColor', 'backColor'],
					['lists', 'horizontalRule'],
					['fullscreen']
			],
			plugins: {
					upload: uploadOptions
			}
	};
	$('#editor').trumbowyg(customizedButtonPaneTbwOptions);
</script>
<?php
	include "../includes/footer.php";
?>