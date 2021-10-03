<?php

namespace _ilmComm;

$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
?>

<?php if (!isset($this->onlyload) || $this->onlyload != "ppp-ws") : ?>
	<div class="top-title">
		<div class="top-title-left">
			<h4><?= $this->PrsTitle ?></h4>

		<?php if ($this->Filters) : ?>
			<div class="tt-filter">
			<?php
			foreach ($this->Filters as $FKey => $FVal) :
				$EFVal = explode("_-_", $FVal);
			?>
				<div class="ttf-single">
					<?= ucwords($FKey) . " : " . implode(", ", $EFVal) ?>
					<span class="ttf-close" data-fkey="<?= $FKey ?>" data-fval="<?= $FVal ?>">&times;</span>
				</div>
			<?php endforeach; ?>
			</div>
		<?php endif; ?>

			<div class="clearfix tt-total-pr">
				<div class="toolbar-sorter pull-right hidden-xs">
					<input type="hidden" id="sortVal" name="fpCbox" name="sort" value="" />
					<label class="sorter-label">Sort By:</label>
					<div class="sort-options _desV">
						<li class="active"><a href="javascript:;" data-sv="1">Popular</a></li>
						<li><a href="javascript:;" data-sv="2">New</a></li>
						<li>
							Price
							<div class="hover-drop-panel">
								<a href="javascript:;" data-sv="3">Low to high</a>
								<a href="javascript:;" data-sv="4">High to low</a>
							</div>
						</li>
						<li>
							Discount
							<div class="hover-drop-panel">
								<a href="javascript:;" data-sv="5">Low to high</a>
								<a href="javascript:;" data-sv="6">High to low</a>
							</div>
						</li>
					</div>
				</div>
				Total <?= $this->TotalProduct ?> Products Found.
			</div>
		</div>
	</div>
<?php endif; ?>

	<div class="product-page-products">
		<div class="grid-row grid4">
		<?php
		foreach ($this->AllProducts as $Product) :
			$this->SingleProduct->setPrInfo($Product);
			$this->SingleProduct->processDiscount();
			$this->SingleProduct->processStock();
		?>
			<div class="grids">
				<div class="single-product <?= $spAddClass ?>">
					<div class="sp-image">

						<?php if ($this->SingleProduct->getDiscount()) : ?>
							<span class="sp-dis">-<?= round($this->SingleProduct->getDiscount()) ?>%</span>
						<?php endif; ?>

						<a href="<?= $this->SingleProduct->getHref() ?>">
							<img src="<?= Models::asset("images/preloader.gif") ?>" data-src="<?= $this->SingleProduct->getProductImage() ?>" />
						</a>
					</div>
					<div class="has-sp-nav">
						<div class="sp-pr">
							<div class="sp-pr-info">
								<a href="<?= $this->SingleProduct->getHref() ?>">
									<h5><?= $this->SingleProduct->getName() ?></h5>
								</a>
								<p>
									<strong class="price"><?= Models::curr($this->SingleProduct->getPrice()) ?></strong>
									<?php if ($this->SingleProduct->getDiscount()) : ?>
										<strong class="p-old"><?= Models::curr($this->SingleProduct->getPrice(0)) ?></strong>
									<?php endif; ?>
								</p>
							</div>
						</div>

					<?php if (!$this->mobileView) : ?>
						<div class="sp-nav">
							<em data-prid="<?= $this->SingleProduct->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
							<a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
							<a href="javascript:;" class="buy-now cAddBuyNav">Buy Now</a>
						</div>
					<?php endif; ?>

					</div>
				</div>
			</div>
		<?php endforeach; ?>

		</div>

	<?php if (count($this->AllProducts)) : ?>
		<div class="ilm-paging">
			<div class="more-pr-by-ajax"></div>
			<div class="pp-nav">
				<a href="javascript:;" data-tcls="alm-single" class="_ilmPaging noRoute">View More <i class="fa fa-angle-down"></i></a>
			</div>
		</div>
	<?php endif; ?>
	
	</div>