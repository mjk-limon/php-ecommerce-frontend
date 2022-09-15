<div class="col-md-9 slider-section">
    <div id="slider">
        <div class="banner-slider" id="sliderb_container" style="position: relative;left: 0px; width: 1349px;height: 415px; overflow: hidden;">
            <div u="slides" style="cursor: move; position: absolute;left: 0px;top: 0px; width:1349px; height: 415px;overflow: hidden;">

                <?php
                $Slider1 = $this->TopSlider;
                while ($ArrSlider = $Slider1->fetch_array()) :
                ?>
                    <div>
                        <a href="<?php echo $ArrSlider['image_link'] ?>">
                            <img u="image" src="<?php echo asset($ArrSlider['image']) ?>" />
                        </a>
                    </div>
                <?php endwhile; ?>

            </div>
            <div data-u="navigator" class="jssorb034" style="position:absolute;bottom:16px;right:16px;" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">
                <div data-u="prototype" class="i" style="width:13px;height:13px;">
                    <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                        <path class="b" d="M11400,13800H4600c-1320,0-2400-1080-2400-2400V4600c0-1320,1080-2400,2400-2400h6800 c1320,0,2400,1080,2400,2400v6800C13800,12720,12720,13800,11400,13800z"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="trending-categories">
            <div class="tc-list">
                <a href="/campaign/">
                    <img src="<?php echo $this->TopSticker3['image'] ?>" alt="Banner image">
                </a>
                <a href="<?php echo $this->TopSticker4['image_link'] ?>">
                    <img src="<?php echo $this->TopSticker4['image'] ?>" alt="Banner image">
                </a>
            </div>

            <?php if ($this->mobileView && ($HeadCampaignIcon = $this->getStickers(7))) : ?>
                <div class="tc-list" style="margin-top:10px;align-items:center;">
                    <a href="<?php echo $HeadCampaignIcon['image_link'] ?>">
                        <img src="<?php echo asset($HeadCampaignIcon['image']) ?>">
                    </a>
                </div>
            <?php endif; ?>
            
        </div>
    </div>
</div>