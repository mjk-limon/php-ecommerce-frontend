<div class="spd">
    <div class="container">
        <div class="section-browse-cat">
            <div class="bc-title">
                <div class="bc-main-title">SHOP BY BRAND</div>
            </div>
            <div class="layout-grid row">

                <?php
                $Slider = $this->getSliders(6);
                while ($ArrSlider = $Slider->fetch_array()) :
                ?>
                    <div class="single-layout-grid col-md-2 col-xs-6">
                        <div class="single-layout-grid-inner">
                            <div class="slg-image">
                                <a href="<?php echo $ArrSlider['image_link'] ?>">
                                    <img src="<?php echo asset($ArrSlider['image']) ?>" />
                                </a>
                            </div>
                            <div class="slg-text slg-text-ps">
                                <h5><?php echo $ArrSlider['image_heading'] ?></h5>
                                <p><?php echo $ArrSlider['image_text1'] ?></p>
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