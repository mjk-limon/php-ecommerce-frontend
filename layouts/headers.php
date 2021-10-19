<?php

namespace _ilmComm;

Head\DevInfo::getDevInfo();
$ogInfo = $this->HeadData['oginfo'];
$body_class = $this->mobileView ? 'class="htmlformb"' : '';
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title><?= $this->HeadData['title']; ?></title>
	<meta charset="utf-8">
	<meta name="title" content="<?= $this->HeadData['title'];  ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="description" content="<?= COMPANY_NAME ?> top online shopping in bangladesh. Browse our latest products and order online with cash on delivery payment system.">
	<meta name="author" content="<?= Head\DevInfo::getAuthor(); ?>">
	<meta property="og:url" content="<?= $_SERVER['REQUEST_URI'] ?>" />
	<meta property="og:title" content="<?= $ogInfo["title"] ?>" />
	<meta property="og:description" content="<?= $ogInfo["description"] ?>" />
	<meta property="og:image" content="<?= $ogInfo["image"] ?>" />
	<meta property="og:image:type" content="<?= $ogInfo["image_ext"] ?>" />
	<meta property="og:image:width" content="<?= $ogInfo["image_width"] ?>" />
	<meta property="og:image:height" content="<?= $ogInfo["image_height"] ?>" />
	<meta property="og:site_name" content="<?= $_SERVER['HTTP_HOST'] ?>" />
	<meta name="keywords" content="<?= $ogInfo["description"] ?>">

	<link rel="icon" href="<?= Models::asset("favicon.ico") ?>">
	<link href="<?= Models::asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
	<link href="<?= Models::asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
	<link href="<?= Models::asset("assets/vendors/boo_tslider/__ilm_boo_tslider.css") ?>" rel="stylesheet">
	<link href="<?= Models::asset("assets/vendors/anim/_ilm_anim.css") ?>" rel="stylesheet">
	<link href="<?= Models::asset("assets/vendors/flexslider/_ds_flex.css") ?>" rel="stylesheet" />

	<link href="<?= Models::asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">
	<link href="<?= Models::asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
	<link href="<?= Models::asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">

	<script src="<?= Models::asset("assets/vendors/_jquery/jqu_ilm_plugin.js") ?>"></script>
	<script src="<?= Models::asset("assets/vendors/flexslider/__ds_jqu_flex.js") ?>"></script>

	<?php if ($this->mobileView) : ?>
		<link href="<?= Models::asset("assets/_ilm_own/css/__des_respon_sive.css") ?>" rel="stylesheet">
	<?php else : ?>
		<script src="<?= Models::asset("assets/vendors/imagezoom/__ds_details_zoom.js") ?>"></script>
	<?php endif; ?>

	<?php
	Head\AdditionalHead::getAdditionalScripts();
	?>

	<style type="text/css">
		:root {
			--accent: <?= $this->ColrData['accent'] ?>;
			--accentsec: <?= $this->ColrData['accentsec'] ?>;
			--secondary: <?= $this->ColrData['secondary'] ?>;
			--mainbody: <?= $this->ColrData['mainbody'] ?>;
			--innerpage: <?= $this->ColrData['innerpage'] ?>;
			--header: <?= $this->ColrData['header'] ?>;
			--menubar: <?= $this->ColrData['menubar'] ?>;
		}
	</style>
</head>

<body <?= $body_class ?>>
	<?php if ($this->mobileView) : ?>
		<div class="floating-number" style="position:fixed;bottom:0;left:0;padding:3px 10px;background:var(--accent);z-index:9999;color:#fff;">
			<strong>Call: <span><?php echo Models::getContactInformation("mobile1") ?></span></strong>
		</div>
	<?php endif; ?>

	<div class="floating-sc">
		<?php if (!$this->mobileView) : ?>
			<div class="sc-btn">
				<i class="fa fa-shopping-cart" aria-hidden="true"></i>
				<div><span id="fcTot"><?= $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
				<div class="fcamount"><?php echo Models::curr() ?><span id="fcAmnt" class="odometer"><?php echo $this->CartData->getSubTotal() ?></span></div>
			</div>
		<?php endif; ?>

		<div class="sc-body">
			<div class="clearfix sc-body-top">
				<span class="floating-sc-close">&times;</span>
				<h4>Shopping Cart</h4>
				<span class="scb-ct"><?= $this->CartData->getTotalItem() ?> ITEM(S)</span>
			</div>
			<div id="fsc-content" class="fsc-content slimScroll"></div>
		</div>
	</div>

	<header id="header">
		<div class="site-branding-area">
			<div class="container">
				<div class="row flex branding-flex deskv-hm">
					<div class="col-md-3 col-xs-5 cols logo-cols">
						<div class="logo">
							<span class="menu-toggle-btn hidden-lg">
								<span></span>
								<span></span>
								<span></span>
							</span>
							<a href="/" id="home-btn"><img src="<?php echo Models::getLogo() ?>"></a>
						</div>
					</div>

					<?php
					if (!$this->mobileView) :
						//Desktop view header middle
					?>
						<div class="col-md-9 deskv-hm-movable">
							<div class="row">
								<div class="col-md-6 hidden-xs">
									<div class="serachbox">
										<form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
											<div class="searchfld deskv">
												<input type="text" placeholder="Search here" name="q" autocomplete="off" class="input-text search-q" />
												<button type="submit" class="subs"><i class="fa fa-search subsi"></i></button>
												<div id="search-suggestions" class="srch-datalist slimScroll"></div>
											</div>
										</form>
									</div>
								</div>
								<div class="col-md-6 hidden-xs">
									<ul class="wishlistall flex" style="justify-content:right;align-items:center;">
										<li>
											<a href="/my-account/?c=90.04" title="Notification" class="notf">
												<div></div>
												<span class="badge"><?= $this->NotificationBadge ?></span>
											</a>
										</li>
										<li>
											<a href="javascript:;" title="Support" class="support" onclick="window.open('tel:<?php echo Models::getContactInformation('mobile1') ?>')">
												<div></div>
												<span><?php echo Models::getContactInformation('mobile1') ?></span>
											</a>
										</li>
										<?php if ($this->UserData) : ?>
											<li class="dropdown">
												<a href="javascript:;" class="useraccount loggedin" data-toggle="dropdown">
													<div></div>
													<span>Welcome, <?php echo $this->UserData['first_name'] ?></span>
												</a>
												<div class="dropdown-menu">
													<a class="dropdown-item" href="/my-account/">My Profile</a>
													<a class="dropdown-item" href="/my-account/?c=90.03">My Orders</a>
													<a class="dropdown-item" href="/my-account/?c=90.02">My Wishlists</a>
													<a class="dropdown-item _ph_LogoutBtn" href="/my-account/?logout=1&ref=<?= urlencode($this->HeadData['ref']) ?>">Logout</a>
												</div>
											</li>
										<?php else : ?>
											<li>
												<a href="/my-account/" class="useraccount">
													<div></div>
													<span>Login/SignUp</span>
												</a>
											</li>
										<?php endif; ?>
									</ul>
								</div>
							</div>
						</div>
					<?php
					else :
						//Mobile view header top & middle
					?>
						<div class="col-xs-7 head-right-col_">
							<ul class="ht-right">
								<li class="cart sc-btn">
									<i class="fa fa-shopping-cart"></i>
									<div class="fccarttotal"><span id="fcTot"><?= $this->CartData->getTotalItem() ?></span></div>
									<div class="fcamount"><?php echo Models::curr() ?><span id="fcAmnt" class="odometer"><?php echo $this->CartData->getSubTotal() ?></span></div>
								</li>
								<li class="dropdown ht-top-shortcut">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>
									<ul class="dropdown-menu dropdown-menu-right animated slideDown">
										<?php if (!$this->UserData) : ?>
											<li><a class="_ph_RegBtn" href="/register/?ref=<?= urlencode($this->HeadData['ref']) ?>">Registration</a></li>
											<li><a class="_ph_LoginBtn" href="/login/?ref=<?= urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
										<?php else : ?>
											<li><a href="/my-account/?c=90.04">Notifications (<?= $this->NotificationBadge ?>)</a></li>
											<li><a href="/my-account/">Update Account</a></li>
											<li><a href="/my-account/?c=90.02">My Wishlists</a></li>
											<li><a href="/my-account/?c=90.03">Order History</a></li>
											<li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?= urlencode($this->HeadData['ref']) ?>">Sign Out</a></li>
										<?php endif; ?>

										<li><a href="/track-order/">Track Order</a></li>
									</ul>
								</li>
							</ul>
						</div>
					<?php endif; ?>

				</div>
				<div class="row hidden-lg">
					<div class="col-md-12">
						<input type="text" class="m-ht-search tsearch-icon" placeholder="Search for products" />
					</div>
				</div>
			</div>
		</div>
		<div class="site-nav-area slimScroll">
			<ul class="nav navbar-nav">
				<?php
				include "menu.php";
				?>
			</ul>
		</div>
	</header>

	<?php
	if ($this->mobileView) :
		//Mobile view header toggle tabs
	?>
		<div class="mb-top-search">
			<div class="search-area">
				<form method="GET" action="<?= PROJECT_FOLDER . 'search/' ?>">
					<div class="m-flex">
						<a href="javascript:;" class="tclose-icon tsearch-icon"><i class="fa fa-arrow-left"></i></a>
						<input type="text" class="search-q" name="q" placeholder="Type product id, name, category..." />
						<button type="submit" class="tsearch-btn"><i class="fa fa-search"></i></button>
					</div>
				</form>
			</div>
			<div class="mb-ts-backdrop srch-datalist" id="search-suggestions"></div>
		</div>
	<?php endif; ?>

	<div class="linear-activity" id="skeletenLoadActivity">
		<div class="indeterminate"></div>
	</div>

	<section id="skmbcontent" style="display:block">
		<?php
		if ($this->HeadData['content']) {
			echo $this->HeadData['content'];
		}
		?>