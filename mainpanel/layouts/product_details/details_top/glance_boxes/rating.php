<?php

$ratClass = !get_site_settings('prat') ? 'hidden' : null;
?>

<div class="pr-glancebox <?php echo $ratClass ?>">
    <div class="gb-title">Product Rating</div>
    <h3 class="gb-val"><?php echo $this->ProductDetails->getRating("r_r") ?></h3>
    <span class="d-block"><span class="stars"><?php echo $this->ProductDetails->getRating("r_r") ?></span></span>
    <p><small><em>(Total Ratings: <?php echo $this->ProductDetails->getRating("r_t") ?>)</em></small></p>
</div>
