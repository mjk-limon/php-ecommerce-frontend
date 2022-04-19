<?php
$categorySample = array(
    "category background" => array("total" => 1, "type" => "png", "width" => "90", "height" => "25"),
    "Product page banner" => array("total" => 1, "type" => "jpg", "width" => "1920", "height" => "130")
);

$innerPages = array(
    "about-us", "store-location", "term-of-use", "privacy-policy", "testimonials", "blog",
    "photo-confirmations", "payment-methods", "locations-we-ship-to", "shipping-returns"
);

$bannerToEdit = array(
    "home page banners" => array("page" => 'index', "position" => 1, "fields" => "2"),
    "category samples" => array("page" => 'index', "position" => 3, "fields" =>"2,3,5", "scale" => "625,460"),
    "spotlight" => array("page" => 'index', "position" => 4, "fields" =>"2,3,5", "scale" => "625,460"),
    "new arrivals" => array("page" => 'index', "position" => 5, "fields" =>"2,3,5", "scale" => "625,460"),
    "shop by concern" => array("page" => 'index', "position" => 6, "fields" =>"2,3,5", "scale" => "460,460"),
    "product review" => array("page" => 'index', "position" => 7, "fields" =>"2,3,5", "scale" => "625,460"),
    "beauty advice" => array("page" => 'index', "position" => 8, "fields" => "3,5_-_Youtube video key,7", "omit_img" => true)
);

$stickersToEdit = array(
    "home page top banner"  => array("page" => 'index', "position" => 2, "fields" => "2")
);

$stickersToEdit_NoDb = array();

$addPrOthers = array(
    "Short Description" => array(
        "type" => "textbox-html",
        "name" => "prshortdes"
    ),
    "Product Tags" => array(
        "type" => "textbox-plain",
        "name" => "tags"
    ),
    "SKU" => array(
        "type" => "text",
        "name" => "sku"
    )
);
