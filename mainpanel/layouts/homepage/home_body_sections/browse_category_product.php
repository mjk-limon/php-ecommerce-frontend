<?php

use _ilmComm\Category\FetchCategories;

?>

<div class="spd">
    <div class="container">
        <div class="section-browse-cat">
            <div class="bc-title">
                <div class="bc-main-title">Browse Our Categories</div>
            </div>
            <div class="bc-product-area">

                <?php
                $Cat = new FetchCategories;
                $MainCats = $Cat->fetchMain();

                while ($ArrMain = $MainCats->fetch_assoc()) {
                    $Cat->setCatId($ArrMain['id']);
                    $Cat->setMain($ArrMain['main']);
                    $Cat->setSubGroup(null);
                    $Cat->setSub(null);

                    $BrowseCatProducts = $this->browseCatProducts($Cat->CatId);
                    if ($BrowseCatProducts->num_rows) {
                        $this->layout(
                            'homepage.home_body_sections.browse_category_product.single_category',
                            ['Cat' => $Cat, 'BrowseCatProducts' => $BrowseCatProducts]
                        );
                    }
                }
                ?>

            </div>
        </div>
    </div>
</div>
