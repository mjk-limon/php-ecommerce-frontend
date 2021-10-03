<?php
	session_start();
	include "../includes/config_site.php";
	include "../includes/config_pr.php";
	require_once "../includes/functions.php";
	//if(!isset($_COOKIE['mc_t']) || empty($_COOKIE['mc_t']))header('Location: register/');
?>
<?php
	if(isset($_POST['add_product'])) {
		$uploadOk = 0; $cwi_array = array();
		
		$fields['id'] = get_product_id();
		$fields['name'] = $conn->real_escape_string($_POST['pr_name']);
		$fields['marchant_name'] = 'marchant';
		$fields['category'] = $conn->real_escape_string($_POST['pr_category']);
		$fields['subcategory'] = $conn->real_escape_string($_POST['pr_subcategory']);
		$fields['brand'] = $conn->real_escape_string($_POST['pr_brname']);
		$fields['size'] = $conn->real_escape_string($_POST['pr_sizes']);
		$fields['description'] = $conn->real_escape_string($_POST['pr_dis']);
		$fields['price'] = $conn->real_escape_string($_POST['pr_price']);
		$fields['discount'] = $conn->real_escape_string($_POST['pr_dicount']);
		$fields['item_left'] = $conn->real_escape_string($_POST['pr_stock']);
		$fields['country'] = 'Bangladesh';
		$fields['new_arrivals'] = $fields['trending'] = 0;
		$fields['views'] = 0; $fields['date_added'] = date("Y-m-d H:i:s"); $fields['rating'] = "0-0";
		
		if(file_exists("../../proimg/".$fields['id']) && is_dir("../../proimg/".$fields['id'])){
			deleteDir("../../proimg/".$fields['id']);
			mkdir("../../proimg/".$fields['id'], 0777, true);
		} else mkdir("../../proimg/".$fields['id'], 0777, true);
		if(!empty($_POST['pr_colors'])) {
			foreach($_FILES["pr_img"]['name'] as $img_key=>$img) {
				$img_color = $cwi_array[] = $conn->real_escape_string($_POST['imgclr'.$img_key]);
				$img_sa = array_count_values($cwi_array)[$img_color];
				$uploaded_file = upload_image("pr_img", $img_key, "../");
				resize_image(1536, 0, "../../proimg/{$fields['id']}/{$img_color}{$img_sa}", $uploaded_file);
			}
			$cwi_acv = array_count_values($cwi_array);
			$fields['colors'] = $conn->real_escape_string(implode(",", array_keys($cwi_acv)));
			$fields['images'] = $conn->real_escape_string(implode(",", $cwi_acv));
		} else {
			$fields['colors'] = "";
			$fields['images']	= count($_FILES["pr_img"]['name']);
			for($j = 1; $j <= $fields['images']; $j++){
				$imageArray	= $j-1;
				$uploaded_file = upload_image("pr_img", $imageArray, "../");
				resize_image(1536, 0, "../../proimg/{$fields['id']}/{$j}", $uploaded_file);
			}
		}
		
		$sql	= InsertInTable('products', $fields);
		if($conn_pr->query($sql)==true) header('Location: ?smsg='.urlencode('Successfully Added Product'));
		else header('Location: ?emsg='.urlencode($conn_pr->error));
	}
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
					<h2 class="page-header"><i class="fa fa-plus"></i> New Deal</h2>
					<div class="row">
						<form action="" method="POST" enctype="multipart/form-data">
							<input type="hidden" name="add_product">
							<input type="hidden" name="marchant_id" value="1" />
							<div class="col-md-12">
								<div class="row">
									<div class="col-md-4">									
										<div class="form-group">
											<label>Select Catagory</label>
											<select name="pr_category" class="form-control maincat" required>
												<option value="" selected>Select Catagory</option>
											<?php
												$result_main	= get_menu();
												while($row_menu = $result_main->fetch_array()) {
											?>
												<option value="<?php echo htmlspecialchars($row_menu['main']); ?>"><?php echo htmlspecialchars($row_menu['main']); ?></option>
											<?php
												}
												mysqli_free_result($result_main);
											?>
											</select>
										</div>
									</div>
									<div class="col-md-4">
										<div class="form-group">
											<label>Select Sub Catagory Group</label>
											<select name="categorygroup" class="form-control subcatgroup" required>
												<option value="">Select Group</option>
											</select>
										</div>
									</div>
									<div class="col-md-4">
										<div class="form-group">
											<label>Select Sub Catagory</label>
											<select name="pr_subcategory" class="form-control subcat" required>
												<option value="">Select Sub</option>
											</select>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label>Product Name</label>
									<input type="text" name="pr_name" class="form-control" required />
								</div>
								<div class="form-group">
									<label>Brand Name</label>
									<input type="text" name="pr_brname" class="form-control" required />
								</div>
								<div class="form-group">
									<label>Product Description</label>
									<textarea name="pr_dis" id="editor"></textarea>
								</div>
								<div class="form-group">
									<label>Available Sizes: </label>
									<input type="text" class="form-control" name="pr_sizes" id="pr_sizes" data-role="tagsinput" /> 
									<span class="form-helper">Available products sizes. Use comma (,) or Enter key for insert multiple value.</span>
								</div>
								<div class="form-group">
									<label>Product Price</label>
									<div class="input-group input-group-sm">
										<span class="input-group-addon">BDT</span>
										<input class="form-control" name="pr_price" type="number" value="0" min="0" required />
									</div>
								</div>
								<div class="form-group">
									<label>Product Discount</label>
									<div class="input-group input-group-sm">
										<input class="form-control" name="pr_dicount" type="number" min="0" required />
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
									<input type="number" name="pr_stock" class="form-control" value="100" required />
								</div>
								<div class="form-group">
									<label>Available Colors: </label>
									<input type="text" class="form-control" name="pr_colors" id="pr_colors"/>
									<span class="bmd-help d-block position-relative">Available products color name. Use comma (,) or Enter key for insert multiple value.</span>
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
												<input type="file" name="pr_img[]" required multiple />
											</div>
											<span class="form-helper text-warning">Max File Size: 2MB, </span>
											<span class="form-helper">Select files for each colored image and select color of that image. 
											Put blank if you don't want to update product image</span>
										</div>
									</div>
								</div>
								<input type="submit" name="submit" value="Upload" class="btn btn-success"/>
								<input type="reset" value="Reset" class="btn btn-warning"/>
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
		$('.maincat').on('click', 'option', function(){
			var cat = $(this).val();
			$.ajax({
				type: 'POST',
				url: 'sellercorner/ajax',
				data: {getSubHeaders:1, main:cat},
				success: function(data){
					$('.subcatgroup').html(data);
					$('.subcat').html('<option value="">Select Sub</option>');
				}
			});
		});
		$('.subcatgroup').on('click', 'option', function(){
			var cat = $('.maincat').val();
			var subHeader = $(this).val();
			$.ajax({
				type: 'POST',
				url: 'sellercorner/ajax',
				data: {getSub:1, main:cat, header: subHeader},
				success: function(data){$('.subcat').html(data);}
			});
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