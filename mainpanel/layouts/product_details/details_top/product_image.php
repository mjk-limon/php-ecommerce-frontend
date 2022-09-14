<div class="col-md-4 single-top-left">

    <?php if ($this->mobileView) : ?>
        <h2 class="pr-name"><?php echo $this->ProductDetails->getName() ?></h2>
    <?php endif; ?>

    <div class="flexslider" id="flexslider">
        <ul class="slides">

            <?php
            $this->zoom_item = "";
            foreach ($this->ProductImages as $Image) :
                $this->zoom_item .= "{src: '" . asset($Image) . "',w: 1200,h: 1200},";
            ?>
                <li data-thumb="<?php echo asset($Image) ?>">
                    <div class="thumb-image detail_images">
                        <img src="<?php echo asset($Image) ?>" class="img-responsive"
                            alt="<?php echo $Image ?>"
                            data-imagezoom="true">
                    </div>
                </li>
            <?php endforeach; ?>

            <div class="clearfix"></div>
        </ul>
    </div>
</div>
