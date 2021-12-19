<?php

namespace _ilmComm;

?>

<section class="filter-form section-mb">
    <h4>filter by price</h4>
    <div class="ff-main">
        <div class="price-range-box">
            <div style="padding: 2rem">
                <div id="slider"
                     data-min="<?php echo reset($this->PriceSortData) ?>"
                     data-max="<?php echo end($this->PriceSortData) ?>"></div>
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


<section class="filter-form brand-filter-form section-mb">
    <h4>Product categories</h4>
    <div class="ff-main scroll-pane slimScroll" style="max-height:600px;">

        <?php
        $Cat = $this->AllCategories;
        $MainCats = $Cat->fetchMain();
        while ($CatInfo = $MainCats->fetch_assoc()) :
            $Cat->setCatId($CatInfo['id']);
            $Cat->setMain($CatInfo['main']);
            $Cat->setSubGroup(null);
            $Cat->setSub(null);
        ?>
            <label class="checkbox bb-check">
                <span><?php echo $this->getFilterTotalProduct('category', 'main', $Cat->CatId) ?></span>
                <?php echo $Cat->Mainc ?>

                <?php
                $SubGroupCats = $Cat->fetchSubGroup();
                $TotalSubGroupCats = $SubGroupCats->num_rows;

                while ($ArrSubGrp = $SubGroupCats->fetch_assoc()) :
                    $Cat->setCatId($ArrSubGrp['id']);
                    $Cat->setSubGroup($ArrSubGrp['header']);
                    $Cat->setSub(null);
                ?>
                    <label class="checkbox bb-check">
                        <span><?php echo $this->getFilterTotalProduct('category', 'header', $Cat->CatId) ?></span>
                        <?php echo $Cat->SubGroup ?>

                        <?php
                        $SubCats = $Cat->fetchSub();
                        $TotalSubCats = $SubCats->num_rows;

                        while ($ArrSub = $SubCats->fetch_array()) :
                            $Cat->setCatId($ArrSub['id']);
                            $Cat->setSub($ArrSub['sub']);
                        ?>
                            <label class="checkbox bb-check">
                                <span><?php echo $this->getFilterTotalProduct('category', 'sub', $Cat->CatId) ?></span>
                                <?php echo $Cat->Sub ?>
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

        <?php
        $AllBrands = $this->AllBrands;
        foreach ($AllBrands as $Brand) :
            $this->SingleBrand->setBrand($Brand);
            $bName = $this->SingleBrand->getBrandName();
            $bImage = $this->SingleBrand->getBrandImage();
        ?>
            <label class="checkbox bb-check">
                <span><?php echo $this->getFilterTotalProduct('brand', $bName) ?></span>
                <input class="fpCbox" type="checkbox" name="brand" value="<?= $bName ?>" <?= $this->checkFieldBySortval("brand", $bName) ?> />
                <i></i> <?php echo $bName ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>
