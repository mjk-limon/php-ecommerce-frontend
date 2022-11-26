<div class="spd">
    <div class="container">
        <div class="section-mb">
            <div class="bc-title">
                <div class="bc-main-title">SHOP BY CATEGORY</div>
            </div>
            <div class="grid-row grid4">

                <?php
                $Slider = $this->getSliders(9);
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
                <?php endwhile; ?>

            </div>
        </div>
    </div>
</div>
