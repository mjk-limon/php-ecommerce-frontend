<div class="spd">
    <div class="container">
        <div class="section-browse-cat">
            <div class="bc-title">
                <div class="bc-main-title">SHOP BY CONCERN</div>
            </div>
            <div class="grid-row grid5">

                <?php
                $Slider = $this->getSliders(10);
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div class="grids single-layout-grid-holder">
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