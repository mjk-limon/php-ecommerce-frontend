<?php

namespace _ilmComm;

$BrandLists = $this->brandLists();
?>
	
	<section class="main-body bg-white">
	
	<?php if($BrandLists->num_rows): ?>
		<div class="spd">
			<div class="container">
				<div class="section-mb">
					<div class="bc-title">
						<div class="bc-main-title">All Brands</div>
					</div>
					<div class="ft-pr-sliders">
						<div class="homepage-brand-section">
						<?php
						$BrandList = array();
						while($BrInfo = $BrandLists->fetch_assoc()) {
							$BrandList[$BrInfo['image_heading']] = [
								'link'	=> "/search/?q=&a_s_t=brand&astval=" . urlencode($BrInfo['image_heading']),
								'image'	=> Models::asset($BrInfo['image'])
							];
						}
						
						$BrandGroups = $this->groupBrandList($BrandList);
						foreach($BrandGroups as $GK => $GK_Val):
						?>
							<div class="brand-group" style="margin-bottom: 1rem">
								<div class="bc-cat-name"><?= $GK ?></div>
								<div class="flex brand-flex">
								
								<?php
								foreach($GK_Val as $BrName):
									$BrLink = $BrandList[$BrName]['link'];
									$BrImg = $BrandList[$BrName]['image'];
								?>	
									<div class="single-brand">
										<div class="single-brand-info">
											<a href="<?= $BrLink ?>">
												<div class="sb-brand-image-placeholder">
													<div class="sb-brand-image" style="background-image:url('<?= $BrImg ?>')"></div>
												</div>
												<div class="sb-brand-title"><?= $BrName ?></div>
											</a>
										</div>
									</div>
								<?php endforeach; ?>

								</div>
							</div> 
						<?php endforeach; ?>

						</div>
					</div>
				</div>
			</div>
		</div> 
	<?php endif; ?>

	</section>