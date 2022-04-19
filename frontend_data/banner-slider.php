<?php
$categorySample = array(
    "Category icon"    => array("total" => 1, "type" => "png", "width" => "19", "height" => "19"),
    "Top ranking category icon"    => array("total" => 1, "type" => "png", "width" => "300", "height" => "300"),
    "Homepage category sample" => array("total" => 1, "type" => "jpg", "width" => "600", "height" => "430"),
    "Product page banner" => array("total" => 3, "type" => "jpg", "width" => "900", "height" => "300")
);

$innerPages = array(
    "about-us", "store-location", "term-of-use", "privacy-policy", "testimonials", "blog",
    "photo-confirmations", "payment-methods", "locations-we-ship-to", "shipping-returns"
);

$bannerToEdit = array(
    "home page banners" => array("page" => "index", "position" => 1, "fields" => "2")
);

$stickersToEdit    = array(
    "home page stickers top 1" => array("page" => "index", "position" => 2, "fields" => "2", "scale" => "450,215"),
    "home page stickers new arrival" => array("page" => "index", "position" => 3, "fields" => "2", "scale" => "460,700"),
    "offer text" => array("page" => "index", "position" => 4, "fields" => "5_-_Link Title", "omit_img" => true)
);

$stickersToEdit_NoDb = array();

$addPrOthers = array(
    "SKU" => ["type" => "text", "name" => "sku"]
);
