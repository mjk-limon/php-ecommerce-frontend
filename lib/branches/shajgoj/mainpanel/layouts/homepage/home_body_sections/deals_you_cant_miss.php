<div class="spd">
    <div class="container">
        <div class="section-browse-cat">
            <div class="bc-title">
                <div class="bc-main-title">DEALS YOU CANNOT MISS</div>
            </div>
            <div class="grid-row grid3">
                
                <?php
                $Slider = $this->getSliders(8);
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div class="grids">
                        <div class="single-layout-grid">
                            <div class="slg-image">
                                <a href="<?php echo $ArrSlider['image_link'] ?>">
                                    <img src="<?php echo asset($ArrSlider['image']) ?>" />
                                </a>
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