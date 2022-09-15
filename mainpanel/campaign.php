<section class="main-body">
	<div class="spd">
		<div class="container">
			<h2 class="page-title">Campaigns</h2>
			<div class="campaigns">			
				<div class="row">
				<?php
					$Campaigns = $this->allCampaigns();
					while($Camp = $Campaigns->fetch_assoc()):
						$CampInfo = $this->campaignInfo($Camp);
				?>	
					<div class="col-md-6 campaign-col">
						<div class="single-campaign">
							<div class="sc-info">
								<a href="<?= $CampInfo->getHref() ?>">
									<div class="sc-info-timer">
										<div class="timer-section"
											data-staring="<?= $CampInfo->getStartFrom() ?>"
											data-timeout="<?= $CampInfo->getEndsIn() ?>">
											<div class="sct-timertitle"></div>
											<div class="sct-unit">										
												<span class="sct-label">Days</span>
												<span class="sct-val sct-days">00</span>
											</div>
											<div class="sct-unit">
												<span class="sct-label">Hour</span>
												<span class="sct-val sct-hour">00</span>
											</div>
											<div class="sct-unit">
												<span class="sct-label">Min</span>
												<span class="sct-val sct-min">00</span>
											</div>
											<div class="sct-unit">
												<span class="sct-label">Sec</span>
												<span class="sct-val sct-sec">00</span>
											</div>
										</div>
									</div>
									<div class="sc-info-title">
										<h3><?= $CampInfo->getCategory('main') ?></h3>
									</div>
									<div class="sc-banner" style="background-image: url('<?= $CampInfo->getBanner() ?>')"></div>
								</a>
							</div>
						</div>
					</div>
				<?php endwhile; ?>

				</div>
			</div>
		</div>
	</div>
</section>

<script type="text/javascript">
	$('.timer-section').each(function(){
		var $T = $(this),
			startsIn = $T.data("staring"),
			countDown = $T.data("timeout"),
			FdlStartTime = new Date(startsIn).getTime(),
			FdlEndTime = new Date(countDown).getTime(),
			FldCountDownTimer;
		
		FldCountDownTimer = setInterval(function() {
			var now = new Date().getTime(),
				distance;
			
			if(FdlStartTime > now) {
				$T.find('.sct-timertitle').html('Starts in');
				distance = FdlStartTime - now;
			} else {
				$T.find('.sct-timertitle').html('');
				distance = FdlEndTime - now;
			}
				
			var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
				hours = Pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 2),
				minutes = Pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 2),
				seconds = Pad(Math.floor((distance % (1000 * 60)) / 1000), 2);
			
			$T.find('.sct-days').html(days);
			$T.find('.sct-hour').html(hours);
			$T.find('.sct-min').html(minutes);
			$T.find('.sct-sec').html(seconds);
			
			if (distance < 0) {
				clearInterval(FldCountDownTimer);
				$T.html("EXPIRED");
				$T.closest('.single-campaign').css({"opacity": "0.6", "pointer-events": "none"});
			}
		}, 1000);
	});	
	
	var Pad = function(num, size) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
</script>