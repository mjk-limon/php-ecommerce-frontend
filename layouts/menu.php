<?php

namespace _ilmComm;

$Cat = new Category\FetchCategories;

$MainCats = $Cat->fetchMain();
$submenu_addClass = $this->mobileView ? ' animated slideDown' : null;
$menu_clearfix = $this->mobileView ? 2 : 6;
?>

<?php
while ($ArrMain = $MainCats->fetch_assoc()) {
	$Cat->setCatId($ArrMain['id']);
	$Cat->setMain($ArrMain['main']);
	$Cat->setSubGroup(null);
	$Cat->setSub(null);
	$bgimg = 'images/category-slides/' . Models::restyleUrl($Cat->Mainc) . '-1.png';
	$bgimg = file_exists($bgimg) 
			? "style=\"background-image: url(" . Models::asset($bgimg) .")\" class=\"has-bg\"" 
			: '';
?>
	<li> 
		<a href="<?= $Cat->getHref() ?>" <?php echo $bgimg ?>>
			<?= htmlspecialchars($Cat->Mainc) ?>
		</a>
		<ul role="menu" class="sub-menu<?= $submenu_addClass ?>">
			<?php
			$col4i = 1;
			$SubGroupCats = $Cat->fetchSubGroup();
			$TotalSubGroupCats = $SubGroupCats->num_rows;

			while ($ArrSubGrp = $SubGroupCats->fetch_assoc()) {
				$Cat->setCatId($ArrSubGrp['id']);
				$Cat->setSubGroup($ArrSubGrp['header']);
				$Cat->setSub(null);
			?>
				<div class="col-md-2 col-xs-6 sub-cols">
					<a href="<?= $Cat->getHref() ?>">
						<h3><?= htmlspecialchars($Cat->SubGroup)  ?></h3>
					</a>

					<?php
					$SubCats = $Cat->fetchSub();
					$TotalSubCats = $SubCats->num_rows;

					while ($ArrSub = $SubCats->fetch_array()) {
						$Cat->setCatId($ArrSub['id']);
						$Cat->setSub($ArrSub['sub']);
					?>
						<li>
							<a href="<?= $Cat->getHref() ?>">
								<?= htmlspecialchars($Cat->Sub); ?>
							</a>
						</li>
					<?php
						if ($TotalSubCats == 1  && empty($Cat->Sub))
							echo '<div class="no-catsub"></div>';
					}
					$SubCats->free();
					?>

				</div>
			<?php
				if (($TotalSubGroupCats == 1)  && empty($Cat->SubGroup))
					echo '<div class="no-cathead"></div>';

				$col4i++;
			}
			$SubGroupCats->free();
			?>
		</ul>
	</li>
<?php
}
$MainCats->free();
?>