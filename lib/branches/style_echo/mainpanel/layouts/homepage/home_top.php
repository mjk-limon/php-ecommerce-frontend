<div class="homepage-top-section">
    <div id="slider">
        <div class="banner-slider" id="sliderb_container" style="position: relative;left: 0px; width: 1920px;height: 490px; overflow: hidden;">
            <div data-u="loading" style="position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-position:50% 50%;background-repeat:no-repeat;background-image:url('images/puff-x.svg');background-color:rgba(0, 0, 0, 0.7);background-size:30px 30px;"></div>
            <div u="slides" style="cursor: move; position: absolute;left: 0px;top: 0px; width:1920px; height: 490px;overflow: hidden;">

                <?php
                $Slider = $this->TopSlider;
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div>
                        <a href="<?php echo $ArrSlider['image_link'] ?>">
                            <img u="image" src="<?php echo asset($ArrSlider['image']) ?>" />
                        </a>
                    </div>
                <?php
                endwhile;
                $Slider->free();
                ?>

            </div>
            <div data-u="navigator" class="jssorb061" style="position:absolute;bottom:12px;right:12px;" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">
                <div data-u="prototype" class="i" style="width:12px;height:12px;">
                    <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                        <circle class="b" cx="8000" cy="8000" r="5800"></circle>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>