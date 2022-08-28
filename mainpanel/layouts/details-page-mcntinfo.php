<?php

namespace _ilmComm;

// Merchant info
$Mcnt = $this->MerchantInfo;

// Merchant delivery speed
$DeliverySpeed = $Mcnt->getMerchantDeliverySpeed();

// Merchant positive rating
$PositiveRating = ($Mcnt->getMerchantRating() / 5) * 100;

// Merchant response rate
$ResponseRate = $Mcnt->getMerchantResponseRate();

// Merchant overall score
$OverallScore = round(($DeliverySpeed + $PositiveRating + $ResponseRate) / 3, 2);
?>

<div class="seller-top">
    <h4 class="seller-title"><?php echo $Mcnt->getMerchantName(); ?></h4>
    <div class="seller-score">
        <p class="rat-title">Overall Score:</p>
        <h1><?php echo $OverallScore ?></h1>
    </div>
</div>
<div class="seller-ratings">
    <div class="row-rat">
        <p class="rat-title">Delivery Speed:</p>
        <span class="rating-progress">
            <span style="width:<?php echo $DeliverySpeed ?>%"></span>
        </span>
    </div>
    <div class="row-rat">
        <p class="rat-title">Positive Rating:</p>
        <span class="rating-progress">
            <span style="width:<?php echo $PositiveRating ?>%"></span>
        </span>
    </div>
    <div class="row-rat">
        <p class="rat-title">Response Rate:</p>
        <span class="rating-progress">
            <span style="width:<?php echo $ResponseRate ?>%"></span>
        </span>
    </div>
</div>
<div><a href="">Visit Seller</a></div>