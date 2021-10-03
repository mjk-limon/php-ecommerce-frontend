<?php
	session_start();
	include "../includes/config_site.php";
	include "../includes/config_pr.php";
	require_once "../includes/functions.php";
	include "../includes/header.php";
	//if(!isset($_COOKIE['mc_t']) || empty($_COOKIE['mc_t']))header('Location: register/');
?>
<div class="main">
	<div class="container">
		<div class="row">
			<div class="col-md-2p5 col-md-3 sidebar">
				<?php include "../includes/marchant-sidebar-menu.php"; ?>
			</div>
			<div class="col-md-9p5 col-md-9 deal-management">
				<div class="main-interface">
					<h2 class="page-header"><i class="fa fa-cubes"></i> Deal Management</h2>
					<div class="row">
					<?php if(!isset($_GET['view'])){ ?>
						<div class="col-md-12">
						<?php 
							$result_pr = get_some_data($conn_pr,"products", "marchant_name='Sotabdi' LIMIT 10");
							if($result_pr->num_rows > 0) {
						?>
							<div class="table-responsive">
								<p class="text-right">
									<a href="sellercorner/new-deal/" class="btn btn-success" type="button"><i class="fa fa-plus"></i> New Deal</a>
								</p>
								<table class="table table-hover">
									<tr>
										<th class="col-md-2">#</th>
										<th class="col-md-8">Description</th>
										<th class="col-md-2">Action</th>
									</tr>
								<?php 
									while($row_pr = $result_pr->fetch_array()) {
										$hascolor = (!empty($row_pr['colors'])) ? explode(',', $row_pr['colors']) : [''];
								?>
									<tr class="clickable-row" data-href="<?= $row_pr['id'] ?>/">
										<td><img src="proimg/<?= $row_pr['id'] ?>/<?= $hascolor[0] ?>1.jpg" class="img-responsive osh-order-image" /></td>
										<td>
											<h4><?= htmlspecialchars($row_pr['name']) ?></h4>
											<p><?= htmlspecialchars($row_pr['id']) ?></p>
											<p><i class="fa fa-clock-o"></i> Uploaded: <?= time_elapsed_string($row_pr['date_added']) ?></p>
											<span><i class="fa fa-signal"></i> Item Left: <?= $row_pr['item_left'] ?></span>
											<span><i class="fa fa-eye"></i> Views: <?= $row_pr['views'] ?></span>
										</td>
										<td>
											<p><a href="<?= $self_url ?>?delete=<?= $row_pr['id'] ?>" class="text-danger"><i class="fa fa-times"></i> Delete</a></p>
											<p><a href="sellercorner/edit-deal/<?= $row_pr['id'] ?>/" class="text-info"><i class="fa fa-pencil"></i> Edit</a></p>
										</td>
									</tr>
								<?php
									}
									mysqli_free_result($result_pr);
								?>
								</table>
							</div>
							<script>
								$(document).ready(function(){
									$('.clickable-row').click(function(){
										var href = $(this).attr('data-href');
										window.location = 'sellercorner/deal-management/'+href;
									}).find('a').click(function(){
										event.stopPropagation();
									});
								});
							</script>
						<?php } ?>
						</div>
					<?php } else { ?>
					<?php 
						$row_details = details_page($_GET['view']);
						$hascolor = (!empty($row_details['colors'])) ? explode(',', $row_details['colors']) : [''];
						$number_of_image = (!empty($row_details['images'])) ? explode(',', $row_details['images']) : [1];
					?>
						<div class="col-md-12">
							<h4>Product Id #<?= sprintf('%06d', $_GET['view']) ?></h4>
							<div class="row">	
								<div class="col-md-3">
									<img src="<?= 'proimg/'.$_GET['view'].'/'.$hascolor[0].'1.jpg' ?>" class="img-responsive" />
								</div>
								<div class="col-md-9 product-info">
									<p class="bg-danger pull-right navs"><a href="sellercorner/deal-management/?delete&id=<?= $_GET['view'] ?>" class="text-danger"><i class="fa fa-times"> Delete</a></i></p>
									<p class="bg-info pull-right navs"><a href="sellercorner/deal-management/edit-deals/?id=<?= $_GET['view'] ?>" class="text-info"><i class="fa fa-pencil"> Edit</i></a></p>
									
									<h4><?= $row_details['name'] ?></h4>
									<ul class="list-group col-md-6">
										<li class="list-group-item list-group-item-info">Category: <?= $row_details['category'].' - '.$row_details['subcategory'] ?></li>
										<li class="list-group-item">Uploaded: <?= date('F j, Y', strtotime($row_details['date_added'])) ?></li>
										<li class="list-group-item list-group-item-info">Item Price: <?= $row_details['price'] ?></li>
										<li class="list-group-item">Discount: <?= $row_details['discount'] ?></li>
										<li class="list-group-item list-group-item-info">Brand: <?= $row_details['brand'] ?></li>
									</ul>
									<ul class="list-group col-md-6">
										<li class="list-group-item list-group-item-success">Available Sizes: <?= ucwords(str_replace(',', ' - ', $row_details['size'])) ?></li>
										<li class="list-group-item">Available Colors: <?= ucwords(str_replace(',', ' - ', $row_details['colors'])) ?></li>
										<li class="list-group-item list-group-item-success">Item Left: <?= $row_details['item_left'] ?></li>
										<li class="list-group-item">Total Views: <?= $row_details['views'] ?></li>
									</ul>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 description">
									<?= $row_details['description'] ?>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 product-images">
									<div class="dailysell">Product Images</div>
								<?php for($i=0; $i<count($hascolor); $i++){ ?>
									<?php for($j=1; $j<=$number_of_image[$i]; $j++){ ?>
									<div class="col-md-3 grids"><img src="proimg/<?= $_GET['view'] ?>/<?= $hascolor[$i].$j ?>.jpg" class="img-responsive" /></div>
									<?php } ?>
								<?php } ?>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
					<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php
	include "../includes/footer.php";
?>