<div class="spd">
    <div class="container">
        <div class="section-mb">
            <div class="row">
                
                <?php
                $Slider = $this->getSliders(3);
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div class="col-md-4">
                        <div class="single-layout-grid">
                            <div class="slg-image">
                                <a href="<?php echo $ArrSlider['image_link'] ?>">
                                    <img src="<?php echo asset($ArrSlider['image']) ?>" />
                                </a>
                            </div>
                            <div class="slg-text">
                                <h5><?php echo $ArrSlider['image_heading'] ?></h5>
                                <p><?php echo $ArrSlider['image_text1'] ?></p>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>

            </div>
        </div>
    </div>
</div>