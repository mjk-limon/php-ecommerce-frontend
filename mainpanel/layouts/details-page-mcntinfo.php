<?php

namespace _ilmComm;

$Mcnt = $this->MerchantInfo;
$DeliverySpeed = $Mcnt->getMerchantDeliverySpeed();
$PositiveRating = ($Mcnt->getMerchantRating() / 5) * 100;
$ResponseRate = $Mcnt->getMerchantResponseRate();
$OverallScore = round(($DeliverySpeed + $PositiveRating + $ResponseRate) / 3, 2);
?>

<div class="seller-top">
    <h4 class="seller-title"><?= $Mcnt->getMerchantName(); ?></h4>
    <div class="seller-score">
        <p class="rat-title">Overall Score:</p>
        <h1><?= $OverallScore ?></h1>
    </div>
</div>
<div class="seller-ratings">
    <div class="row-rat">
        <p class="rat-title">Delivery Speed:</p>
        <span class="rating-progress"><span style="width:<?= $DeliverySpeed ?>%"></span></span>
    </div>
    <div class="row-rat">
        <p class="rat-title">Positive Rating:</p>
        <span class="rating-progress"><span style="width:<?= $PositiveRating ?>%"></span></span>
    </div>
    <div class="row-rat">
        <p class="rat-title">Response Rate:</p>
        <span class="rating-progress"><span style="width:<?= $ResponseRate ?>%"></span></span>
    </div>
</div>
<div><a href="">Visit Seller</a></div>