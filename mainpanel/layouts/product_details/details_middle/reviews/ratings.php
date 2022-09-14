<div class="row ratings">
    <div class="col-md-4 col-xs-5 rating-review text-center">
        <h1><?php echo $this->ProductDetails->getRating("r_r") ?></h1>
        <h4>/5</h4>
        <span class="stars"><?php echo $this->ProductDetails->getRating("r_r") ?></span>
        <p><small><em>(Total Ratings: <?php echo $this->ProductDetails->getRating("r_t") ?>)</em></small></p>
    </div>
    <div class="col-md-8 col-xs-7 user-rating">

        <?php
        for ($RI = 5; $RI > 0; $RI--) :
            $BarWidth = @($this->ProductDetails->getRating("r_" . $RI) / $this->ProductDetails->getRating("r_t")) * 100;
        ?>
            <div class="row-rat">
                <?php echo $RI ?> Star
                <span class="rating-progress">
                    <span style="width:<?php echo $BarWidth ?>%"></span>
                </span>
            </div>
        <?php endfor; ?>

    </div>
</div>