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
	<link href="<?php echo Models::asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
	<link href="<?php echo Models::asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
	<link href="<?php echo Models::asset("assets/vendors/boo_tslider/__ilm_boo_tslider.css") ?>" rel="stylesheet">
	<link href="<?php echo Models::asset("assets/vendors/anim/_ilm_anim.css") ?>" rel="stylesheet">
	<link href="<?php echo Models::asset("assets/vendors/flexslider/_ds_flex.css") ?>" rel="stylesheet" />
	<link href="<?php echo Models::asset('assets/vendors/rtopvideoplayer/rtop.videoPlayer.1.0.2.min.css') ?>" rel="stylesheet" />

	<link href="<?php echo Models::asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">
	<link href="<?php echo Models::asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
	<link href="<?php echo Models::asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">

	<script src="<?php echo Models::asset("assets/vendors/_jquery/jqu_ilm_plugin.js") ?>"></script>
	<script src="<?php echo Models::asset("assets/vendors/flexslider/__ds_jqu_flex.js") ?>"></script>

	<?php if ($this->mobileView) : ?>
		<link href="<?php echo Models::asset("assets/_ilm_own/css/__des_respon_sive.css") ?>" rel="stylesheet">
	<?php else : ?>
		<script src="<?php echo Models::asset("assets/vendors/imagezoom/__ds_details_zoom.js") ?>"></script>
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
	<?php if (!$this->mobileView) : ?>
		<div class="floating-sc">
			<div class="sc-btn">
				<i class="fa fa-shopping-cart" aria-hidden="true"></i>
				<div><span id="fcTot"><?= $this->CartData->getTotalItem() ?></span> ITEM(S)</div>
			</div>
			<div class="sc-body">
				<div class="clearfix sc-body-top">
					<span class="floating-sc-close">&times;</span>
					<h4>Shopping Cart</h4>
					<span class="scb-ct"><?= $this->CartData->getTotalItem() ?> ITEM(S)</span>
				</div>
				<div id="fsc-content" class="fsc-content slimScroll"></div>
			</div>
		</div>
	<?php endif; ?>

	<header id="header">
		<?php
		if (!$this->mobileView) :
			//Desktop view header top

		?>
			<div class="header_top">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-sm-12">
							<div class="header-right">
								<ul class="list-unstyled list-inline">

									<?php if ($this->UserData) : ?>
										<li class="dropdown">
											<a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">
												<span class="key"><i class="fa fa-user"></i> My Account</span><b class="caret"></b></a>
											<ul class="dropdown-menu">
												<li><a href="/my-account/">Update Account</a></li>
												<li><a href="/my-account/?c=90.02">My Wishlists</a></li>
												<li><a href="/my-account/?c=90.03">Order History</a></li>
												<li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?= urlencode($this->HeadData['ref']) ?>">Logout</a></li>
											</ul>
										</li>
									<?php else : ?>
										<li><a href="">Login</a></li>
									<?php endif; ?>

									<li class="dropdown dropdown-small">
										<a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">
											<span class="key"><?= $this->Language ?></span><b class="caret"></b>
										</a>
										<ul class="dropdown-menu">
											<li><a href="?lang=en">English</a></li>
										</ul>
									</li>
									<li class="dropdown dropdown-small">
										<a data-toggle="dropdown" class="dropdown-toggle" href="#">
											<span class="key"><?= Models::curr(); ?></span><b class="caret"></b>
										</a>
										<ul class="dropdown-menu">
											<li id="cur_BDT"><a href="<?= Models::baseUrl('?cur=BDT') ?>">BDT</a></li>
											<li id="cur_USD"><a href="<?= Models::baseUrl('?cur=USD') ?>">USD</a></li>
											<li id="cur_INR"><a href="<?= Models::baseUrl('?cur=INR') ?>">INR</a></li>
											<li id="cur_GBP"><a href="<?= Models::baseUrl('?cur=GBP') ?>">GBP</a></li>
										</ul>
									</li>
									<li><a href="">Contact</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		<?php endif; ?>

		<div class="site-branding-area">
			<div class="container">
				<div class="row flex branding-flex deskv-hm">
					<div class="col-md-3 col-xs-5 cols logo-cols">
						<div class="logo">
							<a href="/" id="home-btn">
								<img src="<?php echo Models::getLogo() ?>" style="display: none;">
								<svg viewBox="0 0 137 31" style="width: 170px;">
									<g fill="#FB8033">
										<path d="M12.2887 16.9813c.2457-.0542.4028-.3016.3604-.5518-.0542-.2574-.3044-.4326-.5546-.3676a.4463.4463 0 0 0-.3666.5356c.0524.2646.2998.4443.5608.3838m9.5469-1.9923c.2474-.0569.4027-.3016.3612-.5527-.056-.261-.307-.4362-.5563-.3703-.2628.0416-.4155.2954-.3667.5401.0506.2583.3008.4371.5618.383m-8.4017 4.1037c.2926-.2393.3278-.6421.1192-.9248-.2375-.2736-.644-.3233-.9266-.1093-.2755.2095-.326.625-.0994.9086.2132.2817.6268.3522.9068.1255m7.8047-6.125c.2926-.2393.326-.6439.1165-.9256-.2348-.271-.643-.3215-.922-.1066-.2728.2122-.3297.6268-.1003.9085.214.2818.6267.3513.9058.1238m-5.2408 7.6042c.1842-.4443-.0587-.969-.504-1.128-.4705-.1833-.96.047-1.1523.522-.1743.447.065.95.5256 1.1289.4624.1535.96-.0686 1.1307-.5229m3.5465-9.4665c.1762-.4389-.0596-.9663-.5084-1.1243-.4687-.1798-.9564.0514-1.1524.522-.176.4488.0677.9518.523 1.1288.4641.15.9626-.065 1.1378-.5265m1.5841 5.5235c-.0786.3621.0994.7008.4507.793.3468.0957.7035-.1247.7947-.4561.0912-.3405-.1174-.6864-.4615-.7758-.3432-.1003-.6927.1084-.7839.4389m-1.304 1.7927c-.365.3784-.365.987.0071 1.3664.3812.3649.9808.3585 1.325-.0036.3946-.3694.4018-.9907.0252-1.3502-.383-.3793-.9763-.3793-1.3574-.0126m-2.004 1.0503c-.5157.1291-.8742.661-.7469 1.1822.113.5437.6593.886 1.1912.7676.5437-.111.8715-.6583.7632-1.1912-.1292-.5464-.6584-.8652-1.2075-.7586m-6.3001-5.4079c-.0976.3559.1047.6945.4614.803.3279.0857.6837-.1193.7731-.458.0994-.345-.1201-.6909-.4524-.7839-.337-.0912-.6873.1048-.7821.439m1.193-2.8042c-.3595.381-.3766.978-.0054 1.3456.373.3775.9717.3811 1.3628 0 .363-.3676.363-.9645-.0127-1.3456-.372-.3703-.9745-.3658-1.3447 0m2.917-1.632c-.5518.113-.8877.653-.7812 1.1777.1373.5374.6602.8805 1.2084.7541.531-.1165.8706-.6466.7532-1.183-.1246-.5302-.6602-.8752-1.1804-.7488m6.3787 11.9817c.2872.279.7135.288.9863-.0018.2754-.2556.2908-.6837.0036-.9582-.2628-.2836-.718-.28-.9781-.0172-.27.2737-.2728.7198-.0118.9772M10.815 10.3515c.278.2746.7215.2872.9915-.0036.262-.2682.2719-.709-.0027-.9772-.2763-.27-.7107-.2646-.9844-.0018-.2646.27-.2646.7108-.0045.9826m13.1584 8.8388c.3604.1545.765-.0216.9158-.3711.1454-.3514-.0208-.7632-.3721-.9095-.3576-.1571-.7604.0127-.8977.3721-.1635.3603.0208.7722.354.9085m.988-2.7229c.4651 0 .8408-.364.8426-.8245.0127-.4543-.3513-.8408-.8146-.8471-.4515-.0055-.8426.3495-.8543.8155.0045.456.373.8363.8263.8561m-.0126-2.9486c.5545-.2087.82-.8327.5924-1.3908-.2095-.5392-.82-.8291-1.3619-.6114-.5671.2221-.8444.8362-.6267 1.388.2221.5618.8399.8291 1.3962.6142m-15.6492-.4444c.3648.1364.7667-.028.9167-.382.1417-.3522-.02-.7595-.3712-.914-.355-.1499-.774.028-.9113.3812-.1463.3495.0199.7577.3658.9148m-.466 3.1122c.448.0027.83-.3658.8399-.8264.0081-.4497-.373-.83-.8074-.838-.4687-.0091-.848.3485-.857.8091-.01.4687.3639.8462.8245.8553m.8191 3.2765c.5491-.2123.8354-.8264.6087-1.4017-.204-.5509-.8336-.8254-1.3818-.597-.5554.2132-.8236.8346-.6114 1.381.2195.549.8273.8326 1.3845.6177m9.9939 2.6876c-.3766.1545-.5735.5826-.4064.9763.1571.3838.6033.5753.9826.4218.3838-.1635.577-.5934.4019-.9907-.1472-.3893-.596-.5726-.9781-.4074m-2.7617.392c-.5527-.01-1.0052.4516-1.017 1.0088.0118.5744.4643 1.0097 1.0088 1.025.56-.0126 1.0142-.4506 1.0269-1.0124.0081-.5518-.4489-1.0079-1.0187-1.0214m-2.6064-.522c-.5916-.2493-1.2608.0533-1.5064.6457-.2276.588.0641 1.2662.6511 1.492.5762.2339 1.2535-.0298 1.4875-.624a1.1624 1.1624 0 0 0-.6322-1.5137m-2.2876-1.6509c-.4895-.5057-1.3032-.5048-1.7963-.0117-.513.5084-.5184 1.3113-.0226 1.8134.5112.4994 1.3167.503 1.8189.0136.503-.5022.503-1.3105 0-1.8153m1.612-12.929c-.3865.1535-.5671.597-.4163.9754.1725.3919.6087.5743.9952.4253.3884-.168.5609-.6177.4001-.9934-.1535-.3929-.5987-.568-.979-.4073m3.3434-1.034c-.559-.0019-1.0223.455-1.0223 1.0213.009.5284.4488.9944 1.0178.9962.5473.0117 1.015-.4498 1.0042-1.006.0109-.5374-.447-1.0053-.9997-1.0116m3.4698.4173c-.5826-.2385-1.2572.0532-1.5028.6267-.234.5807.056 1.278.633 1.5091.6033.2357 1.269-.0505 1.5028-.642.243-.5907-.047-1.2518-.633-1.4938m3.2196 1.9913c-.5094-.503-1.3168-.513-1.818.0054-.4958.4778-.4958 1.2897 0 1.7864.5012.504 1.3086.512 1.8125.0127.5049-.5094.5175-1.305.0055-1.8045m.1372 15.6483c.2213.2592.6078.2881.8616.0705.2583-.2132.289-.6015.0668-.8544-.2131-.2474-.6023-.2763-.8507-.0668-.2565.2176-.289.6024-.0777.8507m1.8514-1.6662c.3116.2312.7541.168.9817-.149.2348-.3116.1653-.7478-.14-.9808-.3215-.2303-.7622-.1689-.987.1454-.2313.3134-.1644.7523.1453.9844m1.6103-2.275c.4263.1788.9157-.0325 1.0792-.4633.1707-.4253-.0262-.9076-.4615-1.081a.8255.8255 0 0 0-1.0783.4651c-.1662.4245.0397.9085.4606 1.0792m1.0937-2.9631c.4768.0578.9148-.298.9663-.7749.0542-.4886-.3016-.9166-.7785-.969-.4895-.046-.923.3025-.9717.7785-.0533.4786.3007.922.7839.9654m.2194-3.0751c.5834-.0984.978-.6656.8643-1.2517-.0957-.5807-.662-.9727-1.2526-.8661-.5834.1129-.9745.6647-.8652 1.2535.1138.5843.6656.978 1.2535.8643M9.1504 7.2827c.2294.253.6069.2881.858.0732.2573-.2267.2871-.6078.0767-.858-.2195-.2483-.6105-.2835-.8598-.0668-.2546.224-.2844.5997-.075.8516m-1.752 2.0185c.3134.2294.7523.1662.9817-.1544.2348-.307.1689-.746-.1409-.9709-.316-.2366-.7559-.1698-.9817.1418-.2366.3116-.1661.7496.141.9835m-1.398 2.6859c.4244.1652.913-.0316 1.0873-.467.1706-.4235-.038-.9103-.4633-1.0783-.4272-.1706-.9068.0298-1.0892.4624-.1653.4209.0397.9059.4651 1.0829m-.6539 3.1627c.4805.0596.9158-.3026.979-.7812.038-.484-.3134-.914-.8001-.9645-.476-.0515-.9095.3007-.9619.7785-.0541.4813.298.923.783.9672m.3477 3.4499c.5943-.1039.98-.6656.8698-1.2472-.1057-.5861-.6602-.9862-1.2527-.8688-.586.1084-.9735.662-.8688 1.2508.1075.578.663.978 1.2517.8652m16.3898 6.348c-.2502.1346-.3387.4579-.2032.7071.1355.252.4507.3423.7053.2078.2493-.1346.3505-.4507.2087-.7027-.1355-.2546-.4534-.3504-.7108-.2122m-2.0763.7604c-.3206.1003-.4985.4362-.4064.7496.0994.3251.4326.504.7578.4136.3142-.1002.5048-.438.4046-.7622-.0976-.3134-.4353-.4922-.756-.401m-2.4013.3893c-.3902.019-.68.3585-.6539.7441.0316.3893.3594.6819.7478.6539.3847-.0235.6782-.3567.652-.7469-.0144-.3856-.3603-.6737-.746-.6511m-2.6759-.271a.9134.9134 0 0 0-1.0693.7135c-.0984.5021.225.9736.7162 1.0756.5048.0975.9772-.2258 1.0747-.7261.093-.4931-.232-.9727-.7216-1.063m-2.7364-1.0006c-.5301-.2601-1.1768-.046-1.4486.484-.2583.5293-.0506 1.166.4723 1.4486.5338.262 1.1795.047 1.4567-.4894.2656-.5211.047-1.1723-.4804-1.4432M9.8756 23.033c-.5139-.475-1.3132-.448-1.7846.0578-.4804.513-.4497 1.3158.057 1.7873.5093.4777 1.314.4542 1.789-.0524.4768-.522.4543-1.3177-.0614-1.7927m-1.9002-2.6814c-.3666-.661-1.193-.9067-1.8595-.5454-.661.364-.9004 1.193-.5383 1.8559.3586.6583 1.1867.913 1.8523.5536.663-.3658.9068-1.1976.5455-1.864m3.2982-15.25c-.2547.1327-.3486.455-.2104.7062.1363.2483.4533.3513.709.2086.2492-.1382.345-.4588.2104-.709-.1373-.2538-.4643-.344-.709-.2059m2.2289-1.0015c-.3179.092-.4931.4307-.4028.7532.1012.3197.4344.503.7514.4064.3242-.0958.5003-.4399.4028-.7569-.0912-.3197-.4245-.4994-.7514-.4027m2.6497-.6322c-.381.027-.6728.3576-.652.7432.028.3839.3594.6828.7496.6593.3883-.0235.6791-.364.6547-.7523-.0298-.3874-.3603-.6737-.7523-.6502m3.1275-.1084a.9044.9044 0 0 0-1.072.7189c-.0957.4913.2321.9726.7207 1.0639.4994.0984.9736-.2285 1.072-.7162.094-.5012-.2348-.97-.7207-1.0666m3.2576.7893c-.5256-.2637-1.1723-.0496-1.4405.4994-.2583.522-.0433 1.175.4895 1.4378.5337.2574 1.184.0497 1.4432-.4949.2619-.5383.0442-1.1731-.4922-1.4423m3.1835 1.9318c-.514-.4814-1.314-.456-1.7882.055-.4705.5149-.4516 1.316.0614 1.7946.5076.4714 1.3158.448 1.789-.0605.4751-.514.4525-1.3168-.0622-1.7891m2.563 3.2223c-.3612-.6584-1.1903-.9085-1.8595-.5509-.6629.3658-.9085 1.1957-.5482 1.856.3621.6655 1.1912.9148 1.8595.5598.6647-.3666.9095-1.2011.5482-1.8649m-9.1034 20.8006c.0876.4335.513.7098.9401.616.43-.0886.7027-.514.6132-.9384-.0857-.4263-.5138-.699-.9383-.6132-.4245.0912-.7044.5093-.615.9356m3.1672-.765c.2123.467.7659.6656 1.2237.4543a.9259.9259 0 0 0 .448-1.23c-.2186-.4624-.7595-.6638-1.2246-.4453-.457.2168-.6548.7632-.447 1.221m3.243-1.5732c.4.4886 1.1172.559 1.5985.15a1.1287 1.1287 0 0 0 .1481-1.5986c-.392-.4795-1.1063-.5527-1.5922-.1454-.4777.391-.5518 1.1081-.1544 1.594m3.0544-2.6163c.5915.4136 1.4196.2619 1.8297-.3305.4136-.6042.2592-1.4216-.3333-1.8307-.6087-.4163-1.4215-.269-1.8351.3333-.4046.5924-.2628 1.4233.3387 1.8279m2.2306-3.402c.8056.2727 1.6853-.1753 1.9571-.989.2682-.8037-.1707-1.6834-.988-1.957a1.5463 1.5463 0 0 0-1.9525.9853c-.271.8146.1697 1.6888.9834 1.9607M13.125 1.1777c.0921.438.513.709.941.6177a.79.79 0 0 0 .6142-.9383c-.0904-.4263-.5157-.7027-.9375-.6114-.4344.0894-.7062.5048-.6177.932M9.8386 2.404c.214.4615.7676.662 1.2264.4416.4615-.2077.6602-.7559.448-1.2156-.2177-.4597-.7677-.6583-1.2229-.4515-.4633.2176-.6602.7613-.4515 1.2255M6.5169 4.6429c.4.485 1.1135.5573 1.6012.1481.4832-.3937.5518-1.1126.1535-1.5913-.4018-.4867-1.1117-.559-1.6003-.1526-.485.3965-.5572 1.1118-.1544 1.5958m-2.797 3.3389c.5979.4172 1.4152.261 1.8379-.336a1.3264 1.3264 0 0 0-.3432-1.8324c-.597-.4128-1.417-.262-1.828.3332-.4162.5979-.2627 1.4224.3333 1.8352m-1.7041 4.184c.8091.271 1.6843-.1742 1.9552-.9834.2682-.8083-.1689-1.6852-.988-1.9562a1.5468 1.5468 0 0 0-1.9553.9835c-.2637.8047.1698 1.688.988 1.9562m14.9177 17.4328c-.3784 0-.681.3098-.681.6819 0 .3775.3026.6782.681.6837.3748-.0055.681-.3062.681-.6837 0-.372-.3062-.6819-.681-.6819m-2.8647-.4307c-.429-.0858-.8552.1905-.9392.6168-.0912.4263.186.8498.6132.9374.4236.0912.8499-.1824.9375-.615.0903-.429-.1879-.8462-.6115-.9392m-3.0091-1.0504c-.4588-.2203-1.0043-.019-1.2183.4417-.2114.465-.0145 1.0105.4488 1.2246.4552.2131 1.0052.019 1.2228-.4507.2123-.4524.0064-1.006-.4533-1.2156M8.118 26.1714c-.4877-.4046-1.2011-.3287-1.6012.15-.4046.484-.3324 1.1957.15 1.5948a1.128 1.128 0 0 0 1.603-.1508c.4-.4813.3278-1.203-.1518-1.594m-2.5648-2.8502c-.4137-.5934-1.2328-.745-1.8307-.3297-.597.4055-.7477 1.2283-.3422 1.8307.4154.5906 1.2372.7396 1.8378.3278.596-.4082.7514-1.231.335-1.8288m-1.5795-3.5375c-.2754-.812-1.1497-1.2526-1.9552-.9853-.821.2691-1.2545 1.1515-.9908 1.958.2674.8154 1.1434 1.2544 1.9571.9861.8146-.2709 1.2553-1.1442.989-1.9588m-.3966-4.3034c0-.9844-.7974-1.789-1.79-1.789-.9861 0-1.7872.8046-1.7872 1.789 0 .9935.801 1.7981 1.7873 1.7981.9925 0 1.79-.8046 1.79-1.798M16.9252 0c-.3757-.0018-.6782.3044-.6782.68 0 .3758.3025.6828.6782.6828.3784 0 .681-.307.681-.6827s-.3026-.6819-.681-.68m3.1961.2483c-.428-.094-.8444.1788-.9374.6132-.0885.428.187.8453.6114.9338.4263.0948.8526-.1797.9402-.615a.786.786 0 0 0-.6142-.932m3.4481.9302c-.4624-.2068-1.0042-.0082-1.2219.447-.2077.456-.0108 1.0088.447 1.2201.4634.2204 1.0134.018 1.2247-.4443a.9168.9168 0 0 0-.4498-1.2228m3.617 1.8703c-.4832-.4046-1.1957-.3314-1.5967.1536-.3992.4795-.3341 1.1984.1517 1.5949.485.4028 1.2039.3323 1.5958-.1509.4064-.4876.3315-1.1993-.1508-1.5976m3.2847 3.0977c-.411-.5933-1.231-.7478-1.8316-.3296-.5942.409-.745 1.2336-.336 1.826.4146.6052 1.2337.7587 1.8361.3388.5988-.4182.745-1.2274.3315-1.8352m2.3616 4.0622c-.2745-.8164-1.1515-1.2562-1.957-.9862-.812.271-1.2545 1.1443-.9872 1.957.2746.8075 1.1497 1.2491 1.9553.9836.8155-.2691 1.2544-1.1515.9889-1.9544m1.0287 5.2715c0-.9844-.8038-1.789-1.7945-1.789-.988 0-1.79.8046-1.79 1.789 0 .9935.802 1.7981 1.79 1.7981.9907 0 1.7945-.8046 1.7945-1.798"></path>
									</g>
									<g fill="#666666">
										<path d="M100.6927 18.759c0 1.704.0632 1.7492 1.6003 1.7492h5.1388c.2185 0 .4018.1834.4018.4055v1.2987c0 .2863-.1011.3884-.4018.4272-.653.102-1.9724.2827-4.3847.2827-3.3731 0-5.1559.0244-5.1559-4.1634v-6.4293c0-4.186 1.7828-4.1624 5.156-4.1624 2.4122 0 3.7316.1833 4.3846.2835.3007.0389.4018.1427.4018.4281v1.2987c0 .2213-.1833.4082-.4018.4082h-5.1388c-1.537 0-1.6003.0452-1.6003 1.744v1.864h6.4925c.2258 0 .4028.1851.4028.4046v1.4666c0 .2213-.177.4064-.4028.4064h-6.4925v2.2876zm29.9988 4.1741c-1.7936 0-3.6088-.3088-4.5842-.5328-.2014-.0416-.3856-.1825-.3856-.4055v-1.463c0-.2231.1842-.3866.3856-.3866h.0397c.8129.102 2.7112.3667 4.587.3667 1.8035 0 2.3553-.6476 2.3553-1.8252 0-1.5236-3.6314-2.368-5.4042-3.0986-1.7647-.7316-2.3906-2.1323-2.3906-3.552 0-2.237 1.7963-3.8626 5.5686-3.8626 1.9345 0 3.7046.3685 4.3937.5337.204.0416.364.1834.364.3857v1.5027c0 .2014-.1382.3658-.345.3658h-.038c-1.3402-.121-2.7292-.3685-4.493-.3685-1.5028 0-2.6272.5284-2.6272 1.4432 0 .6683.7623 1.2824 1.6627 1.6419.9004.3549 2.0817.8146 3.431 1.3583 1.7077.6927 2.8167 1.7005 2.8167 3.6504 0 2.05-1.277 4.2464-5.3365 4.2464zm-10.785-10.1736c0-1.5245-1.1804-2.1738-3.2124-2.1738-.4235 0-2.2686.0406-2.6344.0795v4.4072c.3279.0199 2.2958.0614 2.6344.0614 2.0934 0 3.2124-.4046 3.2124-2.191v-.1833zm3.0435 10.003h-2.4772c-.2222 0-.3026-.206-.4028-.4065l-2.9225-4.9265h-.4534c-.5238 0-2.1656-.0578-2.6344-.083v5.0095c0 .2222-.1607.4064-.3829.4064h-2.0257c-.224 0-.4064-.1842-.4064-.4064V9.0396c0-.4064.2393-.55.6467-.6087 1.0539-.1635 3.3252-.2637 4.8027-.2637 3.1266 0 6.0094 1.118 6.0094 4.5923v.1833c0 2.1513-1.0756 3.329-2.7392 3.9756l3.188 5.4376c.0416.0623.0416.1192.0416.1653 0 .1373-.0831.2411-.2439.2411zM95.404 10.684h-4.0468v11.672c0 .222-.187.4063-.411.4063h-2.0076c-.2221 0-.4055-.1842-.4055-.4064V10.6841h-4.0495c-.2204 0-.4037-.14-.4037-.364v-1.723c0-.2267.1833-.3875.4037-.3875H95.404c.2194 0 .4018.1608.4018.3874v1.7232c0 .224-.1824.364-.4018.364zM75.9853 22.9223c-3.263 0-6.0743-1.4206-6.0743-5.751V8.6186c0-.2258.1851-.3865.4073-.3865h2.005c.2248 0 .4063.1607.4063.3865v8.5525c0 2.3174 1.0693 3.4165 3.2557 3.4165 2.192 0 3.2612-1.099 3.2612-3.4165V8.6187c0-.2258.1806-.3865.4037-.3865h2.0076c.2249 0 .4082.1607.4082.3865v8.5525c0 4.3305-2.8123 5.751-6.0807 5.751zm-16.2488-4.1634c0 1.7042.0659 1.7493 1.5994 1.7493H66.47c.224 0 .4082.1834.4082.4055v1.2987c0 .2863-.103.3884-.4082.4272-.6475.102-1.9688.2827-4.381.2827-3.3677 0-5.1532.0244-5.1532-4.1634v-6.4293c0-4.186 1.7855-4.1624 5.1532-4.1624 2.4122 0 3.7335.2312 4.381.3314.3053.0397.4082.047.4082.3314v1.3475c0 .2213-.1842.4082-.4082.4082h-5.1342c-1.5335 0-1.5994.0452-1.5994 1.744v1.7366h6.4925c.223 0 .4064.1852.4064.4037v1.595c0 .2212-.1834.4063-.4064.4063h-6.4925v2.2876zm-8.6952-5.9994c0-1.5245-1.1795-2.1738-3.2079-2.1738-.4272 0-2.2731.0406-2.6353.0795v4.4072c.3206.0199 2.2867.0614 2.6353.0614 2.0862 0 3.2079-.4046 3.2079-2.191v-.1833zm3.0444 10.003h-2.4773c-.2221 0-.3043-.206-.4046-.4065l-2.9216-4.9265h-.4488c-.5292 0-2.1693-.0578-2.6353-.083v5.0095c0 .2222-.1644.4064-.3874.4064h-2.0284c-.2213 0-.4046-.1842-.4046-.4064V9.0396c0-.4064.2402-.55.6484-.6087 1.0567-.1635 3.3244-.2637 4.8073-.2637 3.123 0 6.0084 1.118 6.0084 4.5923v.1833c0 2.1513-1.0747 3.329-2.7373 3.9756l3.1817 5.4376c.0424.0623.0424.1192.0424.1653 0 .1373-.0813.2411-.243.2411z"></path>
									</g>
								</svg>
							</a>
						</div>
					</div>

					<?php
					if (!$this->mobileView) :
						//Desktop view header middle
					?>
						<div class="col-md-9 deskv-hm-movable">
							<div class="row">
								<div class="col-md-9 hidden-xs">
									<div class="mainmenu-area-quicklinks">
										<ul class="m-a-links">
											<li><a href="/">Home</a></li>
											<li><a href="/my-account/?c=90.02">Wishlists</a></li>
											<li><a href="/brands/">Brands</a></li>
											<li><a href="/track-order/">Track Order</a></li>

											<?php if (!$this->UserData) : ?>
												<li><a class="_ph_RegBtn" href="/register/?ref=<?= urlencode($this->HeadData['ref']) ?>">Join free</a></li>
												<li><a class="_ph_LoginBtn" href="/login/?ref=<?= urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
											<?php else : ?>
												<li><a href="/my-account/">User Account</a></li>
											<?php endif; ?>

											<li><a href="/contact/">Support</a></li>
										</ul>
									</div>
								</div>
								<div class="col-md-3 hidden-xs">
									<ul class="wishlistall">
										<li><a href="/my-account/?c=90.04" title="Notification"><i class="fa fa-bell"></i> <span class="badge"><?= $this->NotificationBadge ?></span></a></li>
										<li>
											<a href="/contact/" title="Support"><i class="fa fa-question-circle"></i></a>
											<div class="serachbox" style="display: none;">
												<form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
													<div class="searchfld deskv">
														<input type="text" placeholder="Search here" name="q" autocomplete="off" class="input-text search-q" />
														<button type="submit" class="subs"><i class="fa fa-search subsi"></i></button>
														<div id="search-suggestions" class="srch-datalist slimScroll"></div>
													</div>
												</form>
											</div>
										</li>
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
								<li><input type="text" class="m-ht-search tsearch-icon" placeholder="Search for products" />
								</li>
								<li class="dropdown ht-top-shortcut">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>
									<ul class="dropdown-menu dropdown-menu-right animated slideDown">
										<li>
											<a href="javascript:;" onclick="$('#ht-currency').collapse('toggle');event.stopPropagation()">Currency <span class="caret"></span></a>
											<ul class="collapse" id="ht-currency">
												<li id="cur_BDT"><a href="<?= Models::baseUrl('?cur=BDT') ?>">BDT</a></li>
												<li id="cur_USD"><a href="<?= Models::baseUrl('?cur=USD') ?>">USD</a></li>
												<li id="cur_INR"><a href="<?= Models::baseUrl('?cur=INR') ?>">INR</a></li>
												<li id="cur_GBP"><a href="<?= Models::baseUrl('?cur=GBP') ?>">GBP</a></li>
											</ul>
										</li>

										<?php if (!$this->UserData) : ?>
											<li><a class="_ph_RegBtn" href="/register/?ref=<?= urlencode($this->HeadData['ref']) ?>">Join free</a></li>
											<li><a class="_ph_LoginBtn" href="/login/?ref=<?= urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
										<?php else : ?>
											<li><a href="/my-account/?c=90.04">Notifications (<?= $this->NotificationBadge ?>)</a></li>
											<li><a href="/my-account/">Update Account</a></li>
											<li><a href="/my-account/?c=90.02">My Wishlists</a></li>
											<li><a href="/my-account/?c=90.03">Order History</a></li>
											<li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?= urlencode($this->HeadData['ref']) ?>">Sign Out</a></li>
										<?php endif; ?>

										<li><a href="/brands/">Brands</a></li>
										<li><a href="/track-order/">Track Order</a></li>
									</ul>
								</li>
							</ul>
						</div>
					<?php endif; ?>

				</div>
			</div>
		</div>

		<div class="sticky-wrapper">
			<div class="mainmenu-area1">
				<div class="container">
					<div class="row deskv-hb">

						<?php
						if ($this->mobileView) :
							//Desktop view header bottom
						?>
							<div class="col-xs-4 m-hb-grid cntntTab active" data-target="#skmbcontent">
								<div class="m-hb-grid-menu">
									<i class="fa fa-th-large"></i> Main
								</div>
							</div>

							<div class="col-xs-4 m-hb-grid tb-2" data-target="#skmbcategories">
								<div class="m-hb-grid-menu">
									<i class="fa fa-th-list"></i> Categories
								</div>
							</div>

							<div class="col-xs-4 m-hb-grid tb-3" data-target="#skmbcart">
								<div class="m-hb-grid-menu sc-btn">
									<span id="fcTot" class="badge"><?= $this->CartData->getTotalItem() ?></span>
									<i class="fa fa-shopping-cart "></i> Cart
								</div>
							</div>
							<div class="tabbed-section__highlighter"></div>
						<?php endif; ?>

					</div>
				</div>
			</div>
		</div>
	</header>
	<div id="skbc-top-margin"></div>

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

		<section id="skmbcategories" style="display:none">
			<div class="mainmenu">
				<ul class="nav navbar-nav">

					<?php
					include "menu.php";
					?>

				</ul>
			</div>
		</section>

		<section id="skmbcart" class="mbl-tab-sc" style="display:none">
			<div class="sc-body">
				<div class="sc-body-top">
					<h4>Shopping Cart</h4>
					<span class="scb-ct"><?= $this->CartData->getTotalItem() ?> ITEM(S)</span>
				</div>
				<div id="fsc-content" class="fsc-content slimScroll"></div>
			</div>
		</section>
	<?php endif; ?>

	<section id="skmbcontent" style="display:block">
		<?php
		if ($this->HeadData['content']) {
			echo $this->HeadData['content'];
		}
		?>