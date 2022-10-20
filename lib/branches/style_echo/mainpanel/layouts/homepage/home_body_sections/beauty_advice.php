<div class="spd">
    <div class="container">
        <div class="section-browse-cat">
            <div class="bc-title">
                <div class="bc-main-title">BEAUTY ADVICE</div>
            </div>
            <div class="row">
                
                <?php
                $Slider = $this->getSliders(8);
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div class="col-md-6">
                        <div class="single-layout-grid">
                            <div class="slg-image">
                                <a href="https://www.youtube.com/watch?v=<?php echo $ArrSlider['image_text1']; ?>" rel="prettyPhoto" title="YouTube View">
                                    <img src="https://img.youtube.com/vi/<?php echo $ArrSlider['image_text1']; ?>/hqdefault.jpg" class="video-gallery" />
                                    <img src="<?php echo asset("assets/images/play.png") ?>" class="video-play" />
                                </a>
                            </div>
                            <div class="slg-text slg-text-ps">
                                <h5><?php echo $ArrSlider['image_heading'] ?></h5>
                                <p><?php echo $ArrSlider['image_text2'] ?></p>
                            </div>
                        </div>
                    </div>
                <?php
                endwhile;
                $Slider->free();
                ?>

            </div>
        </div>
    </div>
</div>