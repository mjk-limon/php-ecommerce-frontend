<?php if (!$this->mobileView) : ?>
    <div class="col-md-3p5 col-md-3 product-filter-sidebar">

        <section class="filter-form section-mb">
            <h4>filter by price</h4>
            <div class="ff-main">
                <div class="price-range-box">
                    <div style="padding: 2rem">
                        <div id="slider" data-min="<?php echo reset($this->PriceSortData) ?>" data-max="<?php echo end($this->PriceSortData) ?>"></div>
                    </div>
                    <form id="priceSort-form" action="" method="POST" style="display:none">
                        <li><input type="text" title="Price must be an integer number" pattern="[0-9]+" name="min" placeholder="Min" /></li>
                        <li class="hypen">-</li>
                        <li><input type="text" title="Price must be an integer number" pattern="[0-9]+" name="max" placeholder="Max" /></li>
                        <li><button>Apply</button></li>
                    </form>
                </div>
            </div>
        </section>


        <section class="filter-form categories-filter-form section-mb">
            <h4>Product categories</h4>
            <div class="ff-main scroll-pane slimScroll" style="max-height:600px;">

                <?php
                $MainCats = $this->AllCategories->get($this->AllCategories::FETCH_MAIN);
                while ($ArrMain = $MainCats->fetch()) :
                    // Sub groups
                    $SubGroupCats = $ArrMain->getFetchable()->get($this->AllCategories::FETCH_SUB_GROUP);
                    $TotalSubGroupCats = $SubGroupCats->num_rows;
                ?>
                    <label class="checkbox bb-check">
                        <span><?php echo $this->getFilterTotalProduct('category', 'main', $ArrMain->getCategoryId()) ?></span>
                        <a href="<?php echo $ArrMain->getCategoryLink() ?>"><?php echo $ArrMain->getMain() ?></a>

                        <?php
                        while ($ArrSubGrp = $SubGroupCats->fetch()) :
                            // Sub menus
                            $SubCats = $ArrSubGrp->getFetchable()->get($this->AllCategories::FETCH_SUB_GROUP);
                            $TotalSubCats = $SubCats->num_rows;
                        ?>
                            <label class="checkbox bb-check">
                                <span><?php echo $this->getFilterTotalProduct('category', 'header', $ArrSubGrp->getCategoryId()) ?></span>
                                <a href="<?php echo $ArrSubGrp->getCategoryLink() ?>"><?php echo $ArrSubGrp->getSubGroup() ?></a>

                                <?php while ($ArrSub = $SubCats->fetch()) : ?>
                                    <label class="checkbox bb-check">
                                        <span><?php echo $this->getFilterTotalProduct('category', 'sub', $ArrSub->getCategoryId()) ?></span>
                                        <a href="<?php echo $ArrSub->getCategoryLink() ?>"><?php echo $ArrSub->getSub() ?></a>
                                    </label>
                                <?php endwhile; ?>

                            </label>
                        <?php endwhile; ?>
                    </label>
                <?php endwhile; ?>

            </div>
        </section>

        <section class="filter-form brand-filter-form section-mb">
            <h4>filter by brand</h4>
            <div class="ff-main scroll-pane slimScroll">

                <?php while($Brand = $this->AllBrands->fetch()): ?>
                    <label class="checkbox bb-check">
                        <span><?php echo $this->getFilterTotalProduct('brand', $Brand->getBrandName()) ?></span>
                        <input class="fpCbox" type="checkbox" name="brand" 
                               value="<?php echo $Brand->getBrandName() ?>"
                               <?php echo $this->checkFieldBySortval("brand", $Brand->getBrandName()) ?> />
                        <i></i> <?php echo $Brand->getBrandName() ?>
                    </label>
                <?php endwhile; ?>

            </div>
        </section>
    </div>
<?php endif; ?>