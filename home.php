<?php 

namespace _ilmComm;

$sp = $this->SingleProduct;
$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
$slideSize = array(($this->HomeGridNumber * 100), (($this->HomeGridNumber + 1) * 100));
?>

<?php if(!$this->mobileView): ?>	
	<div class="container home-floating-menu-container">
		
	</div>
<?php endif; ?>

	<script type="text/javascript">
		slideSize = {
			width: <?= $slideSize[0] ?>,
			height: <?= $slideSize[1] ?>
		};
	</script>
	<div class="homepage-top-section">	
		<div class="container">
			<div class="row">
				<div class="col-md-3 menu-selection hidden-xs">
					<div id="all-dept-menus" class="all-dept-menus"> 
						<div class="manue mainmenu index-menu">
							<ul class="nav navbar-nav slimScroll">

							<?php 
							include "layouts/menu.php";
							?>

							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-9 slider-section">
					<div id="slider">
						<div class="banner-slider" id="sliderb_container" style="position: relative;left: 0px; width: 1349px;height: 415px; overflow: hidden;">
							<div u="slides" style="cursor: move; position: absolute;left: 0px;top: 0px; width:1349px; height: 415px;overflow: hidden;">
							
							<?php
							$Slider1 = $this->TopSlider;
							while($ArrSlider = $Slider1->fetch_array()):
							?>	
								<div>
									<a href="<?= $ArrSlider['image_link'] ?>">
										<img u="image" src="<?= Models::asset($ArrSlider['image']) ?>"/>
									</a>			
								</div>
							<?php
							endwhile;
							$Slider1->free();
							?>

							</div>
							<div data-u="navigator" class="jssorb034" style="position:absolute;bottom:16px;right:16px;" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">
								<div data-u="prototype" class="i" style="width:13px;height:13px;">
									<svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
									  <path class="b" d="M11400,13800H4600c-1320,0-2400-1080-2400-2400V4600c0-1320,1080-2400,2400-2400h6800 c1320,0,2400,1080,2400,2400v6800C13800,12720,12720,13800,11400,13800z"></path>
									</svg>
								</div>
							</div>
							<style>.jssorb034{position:absolute}.jssorb034 .i{position:absolute;cursor:pointer}.jssorb034 .i .b{fill:#fff;fill-opacity:.7;stroke:#000;stroke-width:1000;stroke-miterlimit:10;stroke-opacity:.8}
							.jssorb034 .i:hover .b{fill:#000;fill-opacity:1;stroke:#fff;stroke-opacity:1}.jssorb034 .iav .b{fill:#000;fill-opacity:1;stroke:#fff;stroke-width:1600;stroke-opacity:.6}.jssorb034 .i.idn{opacity:.3}</style>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 hidden-xs" style="padding-right:0">
					<a href="<?= $this->TopSticker1['image_link']; ?>">					
						<img class="img-responsive" src="<?= $this->TopSticker1['image']; ?>" alt="" /> 
					</a>
				</div>
				<div class="col-md-9 col-xs-12">
					<div class="trending-categories">
						<div class="tc-list slimScroll">
							<div class="tc-single">
								<h2>Top Ranking</h2>
								<h4>Categories</h4>
							</div>

						<?php
						$TrCat = $this->TrendCategories;
						$TcRes = $TrCat->fetchTrending();

						while($TC = $TcRes->fetch_array()):
							$TrCat->setCatId($TC['id']);
							$TrCat->setMain($TC['main']);

							$CatLink = $TrCat->getHref();
							$CatImg = $TrCat->getCatImg('Top ranking category icon')[0];
						?>	
							<div class="tc-single">
								<a href="<?= $CatLink ?>">
									<div class="tc-single-img" style="background-image:url('<?= $CatImg ?>')"></div>
									<div class="tc-single-title"><?= htmlspecialchars($TC['main']) ?></div>
								</a>
							</div>
						<?php endwhile; ?>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<section class="main-body">

	<?php if($this->FlashSales->num_rows && $this->FlashSalesTimer): ?>	
		<div class="spd">		
			<div class="container">
				<div class="section-mb">
					<div class="ft-title">
						<div class="ft-title-left">					
							<span class="ft-ft-title">
								<img src="<?= Models::asset("images/flash-sales.gif") ?>" alt="Flash Sales" />
							</span><div class="ft-timer">
								<span class="fdt-timer">&#9673; Ends in <span id="fdl-timer" data-endin="<?= $this->FlashSalesTimer['end_in'] ?>">00:00:00</span></span>
							</div>
						</div><div class="ft-right-nav">
							<a href="products/flash-sales-168/" class="ft-more-btn">See More</a>
						</div>
					</div>
					<div class="ft-pr-sliders">
						<div <?= !$this->mobileView ? 'id="flashsale" style="position:relative;margin:0 auto;top:0px;left:0px;width:1349px;height:'. $slideSize[1] .'px;overflow:hidden;visibility:hidden;"': null ?>>
							<div <?= !$this->mobileView ? 'data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1349px;height:'. $slideSize[1] .'px;overflow:hidden;"' : 'class="m-flex ft-pr-mbl"' ?>>
								
							<?php
							while($FsPr = $this->FlashSales->fetch_assoc()):
								$sp->setPrInfo($FsPr);
								$sp->processDiscount();
								$sp->processStock();
							?>
								<div class="single-product">
									<div class="sp-image">
									
									<?php if($sp->getDiscount()): ?>
										<span class="sp-dis">-<?= $sp->getDiscount() ?>%</span>
									<?php endif; ?>
									
										<a href="<?= $sp->getHref() ?>">
											<img src="<?= $sp->getProductImage() ?>" />
										</a>
									</div>
									<div class="has-sp-nav">
										<div class="sp-pr">
											<div class="sp-pr-info">
												<a href="<?= $sp->getHref() ?>">
													<h5><?= $sp->getName() ?></h5>
												</a><p>
													<strong class="price"><?=  Models::curr($sp->getPrice()) ?></strong>
												
												<?php if($sp->getDiscount()): ?>
													<strong class="p-old"><?=  Models::curr($sp->getPrice(0)) ?></strong>
												<?php endif; ?>

												</p>
											</div>
										</div>
										<div class="sp-nav">
											<em data-prid="<?= $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
											<a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
											<a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
										</div>
									</div>
								</div>
							<?php endwhile; ?>
								
							</div>
							
						<?php if(!$this->mobileView): ?>
							<div data-u="arrowleft" class="jssora082" style="width:30px;height:40px;top:0px;left:30px;" data-autocenter="2" data-scale="0.75" data-scale-left="0.75">
								<svg viewbox="2000 0 12000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
									<path class="c" d="M4800,14080h6400c528,0,960-432,960-960V2880c0-528-432-960-960-960H4800c-528,0-960,432-960,960 v10240C3840,13648,4272,14080,4800,14080z"></path>
									<path class="a" d="M6860.8,8102.7l1693.9,1693.9c28.9,28.9,63.2,43.4,102.7,43.4s73.8-14.5,102.7-43.4l379-379 c28.9-28.9,43.4-63.2,43.4-102.7c0-39.6-14.5-73.8-43.4-102.7L7926.9,8000l1212.2-1212.2c28.9-28.9,43.4-63.2,43.4-102.7 c0-39.6-14.5-73.8-43.4-102.7l-379-379c-28.9-28.9-63.2-43.4-102.7-43.4s-73.8,14.5-102.7,43.4L6860.8,7897.3 c-28.9,28.9-43.4,63.2-43.4,102.7S6831.9,8073.8,6860.8,8102.7L6860.8,8102.7z"></path>
								</svg>
							</div>
							<div data-u="arrowright" class="jssora082" style="width:30px;height:40px;top:0px;right:30px;" data-autocenter="2" data-scale="0.75" data-scale-right="0.75">
								<svg viewbox="2000 0 12000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
									<path class="c" d="M11200,14080H4800c-528,0-960-432-960-960V2880c0-528,432-960,960-960h6400 c528,0,960,432,960,960v10240C12160,13648,11728,14080,11200,14080z"></path>
									<path class="a" d="M9139.2,8102.7L7445.3,9796.6c-28.9,28.9-63.2,43.4-102.7,43.4c-39.6,0-73.8-14.5-102.7-43.4 l-379-379c-28.9-28.9-43.4-63.2-43.4-102.7c0-39.6,14.5-73.8,43.4-102.7L8073.1,8000L6860.8,6787.8 c-28.9-28.9-43.4-63.2-43.4-102.7c0-39.6,14.5-73.8,43.4-102.7l379-379c28.9-28.9,63.2-43.4,102.7-43.4 c39.6,0,73.8,14.5,102.7,43.4l1693.9,1693.9c28.9,28.9,43.4,63.2,43.4,102.7S9168.1,8073.8,9139.2,8102.7L9139.2,8102.7z"></path>
								</svg>
							</div>
						<?php endif; ?>

						</div>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>
		
		<div class="spd">		
			<div class="container">
				<div class="section-mb">
					<div class="ft-title">
						<div class="ft-title-left">					
							<span class="ft-ft-title">TRENDING</span>
						</div>
					</div>
					<div class="ft-pr-sliders">
						<style>
							/*jssor slider arrow skin 082 css*/
							.jssora082 {display:block;position:absolute;cursor:pointer;}
							.jssora082 .c {fill:#fff;fill-opacity:.5;stroke:#000;stroke-width:160;stroke-miterlimit:10;stroke-opacity:0.3;}
							.jssora082 .a {fill:#000;opacity:.8;}
							.jssora082:hover .c {fill-opacity:.3;}
							.jssora082:hover .a {opacity:1;}
							.jssora082.jssora082dn {opacity:.5;}
							.jssora082.jssora082ds {opacity:.3;pointer-events:none;}
						</style>
					
						<div <?= !$this->mobileView ? 'id="trendsale" style="position:relative;margin:0 auto;top:0px;left:0px;width:1349px;height:'. $slideSize[1] .'px;overflow:hidden;visibility:hidden;"': null ?>>
							<div <?= !$this->mobileView ? 'data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:1349px;height:'. $slideSize[1] .'px;overflow:hidden;"' : 'class="m-flex ft-pr-mbl"' ?>>
								
							<?php
							$TrendingProducts = $this->Trendings;
							while($TrPr = $TrendingProducts->fetch_assoc()):
								$sp->setPrInfo($TrPr);
								$sp->processDiscount();
								$sp->processStock();
							?>
								<div class="single-product">
									<div class="sp-image">
									
									<?php if($sp->getDiscount()): ?>
										<span class="sp-dis">-<?= round($sp->getDiscount()) ?>%</span>
									<?php endif; ?>
									
										<a href="<?= $sp->getHref() ?>">
											<img src="<?= $sp->getProductImage() ?>" />
										</a>
									</div>
									<div class="has-sp-nav">
										<div class="sp-pr">
											<div class="sp-pr-info">
												<a href="<?= $sp->getHref() ?>">
													<h5><?= $sp->getName() ?></h5>
												</a><p>
													<strong class="price"><?=  Models::curr($sp->getPrice()) ?></strong>
												
												<?php if($sp->getDiscount()): ?>
													<strong class="p-old"><?=  Models::curr($sp->getPrice(0)) ?></strong>
												<?php endif; ?>

												</p>
											</div>
										</div>
										<div class="sp-nav">
											<em data-prid="<?= $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
											<a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
											<a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
										</div>
									</div>
								</div> 
							<?php endwhile; ?>	
								
							</div>
							
						<?php if(!$this->mobileView): ?>
							<div data-u="arrowleft" class="jssora082" style="width:30px;height:40px;top:0px;left:30px;" data-autocenter="2" data-scale="0.75" data-scale-left="0.75">
								<svg viewbox="2000 0 12000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
									<path class="c" d="M4800,14080h6400c528,0,960-432,960-960V2880c0-528-432-960-960-960H4800c-528,0-960,432-960,960 v10240C3840,13648,4272,14080,4800,14080z"></path>
									<path class="a" d="M6860.8,8102.7l1693.9,1693.9c28.9,28.9,63.2,43.4,102.7,43.4s73.8-14.5,102.7-43.4l379-379 c28.9-28.9,43.4-63.2,43.4-102.7c0-39.6-14.5-73.8-43.4-102.7L7926.9,8000l1212.2-1212.2c28.9-28.9,43.4-63.2,43.4-102.7 c0-39.6-14.5-73.8-43.4-102.7l-379-379c-28.9-28.9-63.2-43.4-102.7-43.4s-73.8,14.5-102.7,43.4L6860.8,7897.3 c-28.9,28.9-43.4,63.2-43.4,102.7S6831.9,8073.8,6860.8,8102.7L6860.8,8102.7z"></path>
								</svg>
							</div>
							<div data-u="arrowright" class="jssora082" style="width:30px;height:40px;top:0px;right:30px;" data-autocenter="2" data-scale="0.75" data-scale-right="0.75">
								<svg viewbox="2000 0 12000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
									<path class="c" d="M11200,14080H4800c-528,0-960-432-960-960V2880c0-528,432-960,960-960h6400 c528,0,960,432,960,960v10240C12160,13648,11728,14080,11200,14080z"></path>
									<path class="a" d="M9139.2,8102.7L7445.3,9796.6c-28.9,28.9-63.2,43.4-102.7,43.4c-39.6,0-73.8-14.5-102.7-43.4 l-379-379c-28.9-28.9-43.4-63.2-43.4-102.7c0-39.6,14.5-73.8,43.4-102.7L8073.1,8000L6860.8,6787.8 c-28.9-28.9-43.4-63.2-43.4-102.7c0-39.6,14.5-73.8,43.4-102.7l379-379c28.9-28.9,63.2-43.4,102.7-43.4 c39.6,0,73.8,14.5,102.7,43.4l1693.9,1693.9c28.9,28.9,43.4,63.2,43.4,102.7S9168.1,8073.8,9139.2,8102.7L9139.2,8102.7z"></path>
								</svg>
							</div> 
						<?php endif; ?>

						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section class="main-body bg-white">	
		<div class="spd">
			<div class="container">
				<div class="section-mb">
					<div class="bc-title">
						<div class="bc-main-title">New Arrivals</div>
					</div>
					<div class="ft-pr-sliders">
						<div class="new-arrivals">
							<div class="grid-row">

							<?php
							$St_i = 1;
							$newArrivals = $this->newArrivals();
							while($NaPr = $newArrivals->fetch_assoc()):
								$sp->setPrInfo($NaPr);
								$sp->processDiscount();
								$sp->processStock();
							?>	
								<div class="grids">
									<div class="bc-products">
										<div class="single-product">
											<div class="sp-image">

											<?php if($sp->getDiscount()): ?>
												<span class="sp-dis">-<?= round($sp->getDiscount()) ?>%</span>
											<?php endif; ?>

												<a href="<?= $sp->getHref() ?>">
													<img src="<?= $sp->getProductImage() ?>" />
												</a>
											</div>
											<div class="has-sp-nav">
												<div class="sp-pr">
													<div class="sp-pr-info">
														<a href="<?= $sp->getHref() ?>">
															<h5><?= $sp->getName() ?></h5>
														</a><p>
															<strong class="price"><?=  Models::curr($sp->getPrice()) ?></strong>
														
														<?php if($sp->getDiscount()): ?>
															<strong class="p-old"><?=  Models::curr($sp->getPrice(0)) ?></strong>
														<?php endif; ?>

														</p>
													</div>
												</div>
												<div class="sp-nav">
													<em data-prid="<?= $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
													<a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
													<a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
												</div>
											</div>
										</div>
									</div>
								</div>

							<?php if($St_i == 2): ?>
								<div class="grids large-grid">
									<div class="prgrid-ads-section">
										<a href="<?= $this->TopSticker2['image_link'] ?>" class="prgrid-ad-img" 
											style="background-image:url('<?= $this->TopSticker2['image'] ?>')"></a>
									</div>
								</div>
							<?php
								endif;
								$St_i++;
							endwhile;
							?>	
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="spd">
			<div class="container">
				<div class="section-browse-cat">
					<div class="bc-title">
						<div class="bc-main-title">Browse Our Categories</div>
					</div>
					<div class="bc-product-area">
						
					<?php
					$St_i = 1;
					$Cat = new Category\FetchCategories;
					$MainCats = $Cat->fetchMain();
					
					while($ArrMain = $MainCats->fetch_assoc()):
						$Cat->setCatId($ArrMain['id']);
						$Cat->setMain($ArrMain['main']);
						$Cat->setSubGroup(null);
						$Cat->setSub(null);
						
						$BrowseCatProducts = $this->browseCatProducts($Cat->CatId);
						if($BrowseCatProducts->num_rows):
					?>

					<?php if($St_i == 2): ?>
						<!--div class="bc-ads-section">
							<div class="bc-ads">
								<img class="img-responsive" src="" alt="" />
							</div>
						</div--> 
					<?php endif; ?>
					
						<div class="bc-single">
							<div class="bc-cat-name"><?= htmlspecialchars($Cat->Mainc) ?></div>
							<div class="grid-row">
							
							<?php
							$Ct_i = 1;
							while($TrPr = $BrowseCatProducts->fetch_assoc()):
								$sp->setPrInfo($TrPr);
								$sp->processDiscount();
								$sp->processStock();
							?>

							<?php
							if($Ct_i == 1):
								$CatImg = Models::asset('images/category-slides/'. Models::restyleUrl($Cat->Mainc) .'-3.jpg');
							?>
								<div class="grids large-grid onlycolspan">
									<div class="prgrid-ads-section">
										<a href="<?= $Cat->getHref() ?>" class="prgrid-ad-img"
											style="background-image:url('<?= $CatImg ?>')"></a>
									</div>
								</div>
							<?php endif; ?>

								<div class="grids">
									<div class="bc-products">
										<div class="single-product <?= $spAddClass ?>">
											<div class="sp-image">

											<?php if($sp->getDiscount()): ?>
												<span class="sp-dis">-<?= round($sp->getDiscount()) ?>%</span>
											<?php endif; ?>

												<a href="<?= $sp->getHref() ?>">
													<img src="<?= $sp->getProductImage() ?>" />
												</a>
											</div>
											<div class="has-sp-nav">
												<div class="sp-pr">
													<div class="sp-pr-info">
														<a href="<?= $sp->getHref() ?>">
															<h5><?= $sp->getName() ?></h5>
														</a><p>
															<strong class="price"><?=  Models::curr($sp->getPrice()) ?></strong>
														
														<?php if($sp->getDiscount()): ?>
															<strong class="p-old"><?=  Models::curr($sp->getPrice(0)) ?></strong>
														<?php endif; ?>

														</p>
													</div>
												</div>
												<div class="sp-nav">
													<em data-prid="<?= $sp->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
													<a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
													<a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							<?php
								$Ct_i++;
							endwhile;
							?>
							
							</div>
							<div class="bc-cat-all"><div>&nbsp;</div><a href="<?= $Cat->getHref() ?>">View All</a></div>
						</div>
					<?php
							$St_i++;
						endif;
					endwhile;
					?>
						
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<script defer src="<?= Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>