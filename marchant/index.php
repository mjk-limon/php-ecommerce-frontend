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
			<div class="col-lg-9p5 col-md-9">
				<div class="main-interface">
					<h2 class="page-header"><i class="fa fa-home"></i> Dashboard</h2>
					<div class="row">
						<div class="col-lg-12">
							<div class="col-lg-3 col-md-3 dashboard-widget">
								<div class="well">
									<span class="widget-number">04</span>
									<span class="widget-footer">NEW SELL</span>
								</div>
							</div>
							<div class="col-lg-3 col-md-3 dashboard-widget">
								<div class="well in-c">
									<span class="widget-number">16</span>
									<span class="widget-footer">NEW ORDER</span>
								</div>
							</div>
							<div class="col-lg-3 col-md-3 dashboard-widget">
								<div class="well">
									<span class="widget-number">00</span>
									<span class="widget-footer">PROCESSING</span>
								</div>
							</div>
							<div class="col-lg-3 col-md-3 dashboard-widget">
								<div class="well in-c">
									<span class="widget-number">00</span>
									<span class="widget-footer">PAYMENT DUE</span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12 col-md-12">
							<div class="panel panel-default">
								<div class="panel-heading">
									<i class="fa fa-bar-chart-o fa-fw"></i> 
									Sales Feed
								</div>
								<div class="panel-body">
									<div class="">
											
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-8 col-md-8">
							<div class="panel panel-default">
								<div class="panel-heading">
									<i class="fa fa-eye fa-fw"></i> 
									At A Glance
								</div>
								<div class="panel-body">
									<div class="row">
										<div class="col-lg-12">
											<div class="table-responsive">
												<table class="table">
													<thead>
														<tr><th>Unit</th><th>Amount</th></tr>
													</thead>
													<tbody>
														<tr><td>Your Total Product</td><td>12</td></tr>
														<tr><td>Your Total Order</td><td>16</td></tr>
														<tr><td>Your Delivered Product</td><td>120</td></tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-4">
							<div class="panel panel-default">
								<div class="panel-heading">
									<i class="fa fa-bell fa-fw"></i> 
									Notification Panel
								</div>
								<div class="panel-body">
									<div class="list-group">
										<a href="#" class="list-group-item">
											<i class="fa fa-comment fa-fw"></i> New Comment
											<span class="pull-right text-muted small"><em>4 minutes ago</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-twitter fa-fw"></i> 3 New Followers
											<span class="pull-right text-muted small"><em>12 minutes ago</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-envelope fa-fw"></i> Message Sent
											<span class="pull-right text-muted small"><em>27 minutes ago</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-tasks fa-fw"></i> New Task
											<span class="pull-right text-muted small"><em>43 minutes ago</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-upload fa-fw"></i> Server Rebooted
											<span class="pull-right text-muted small"><em>11:32 AM</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-bolt fa-fw"></i> Server Crashed!
											<span class="pull-right text-muted small"><em>11:13 AM</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-warning fa-fw"></i> Server Not Responding
											<span class="pull-right text-muted small"><em>10:57 AM</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-shopping-cart fa-fw"></i> New Order Placed
											<span class="pull-right text-muted small"><em>9:49 AM</em>
											</span>
										</a>
										<a href="#" class="list-group-item">
											<i class="fa fa-money fa-fw"></i> Payment Received
											<span class="pull-right text-muted small"><em>Yesterday</em>
											</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php
	include "../includes/footer.php";
?>