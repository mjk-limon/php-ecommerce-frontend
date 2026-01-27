<div class="spd">
    <div class="container">
        <div class="section-browse-cat">
            <div class="bc-title">
                <div class="bc-main-title">Browse Our Categories</div>
            </div>
            <div class="bc-product-area">

                <?php
                $MainCats = $this->AllCategories->get($this->AllCategories::FETCH_MAIN);
                while ($Cat = $MainCats->fetch()) {
                    $BrowseCatProducts = $this->home->browseCatProducts($Cat->getCategoryId());

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
