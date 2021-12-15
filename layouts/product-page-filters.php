<?php

namespace _ilmComm;

?>

<section class="filter-form section-mb">
    <h4>filter by price</h4>
    <div class="ff-main">
        <div class="price-range-box">
            <div style="padding: 2rem">
                <div id="slider"></div>
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
    <div class="ff-main scroll-pane slimScroll">

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
                        <?php echo $Cat->SubGroup ?>

                        <?php
                        $SubCats = $Cat->fetchSub();
                        $TotalSubCats = $SubCats->num_rows;

                        while ($ArrSub = $SubCats->fetch_array()) :
                            $Cat->setCatId($ArrSub['id']);
                            $Cat->setSub($ArrSub['sub']);
                        ?>
                            <label class="checkbox bb-check">
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
                <input class="fpCbox" type="checkbox" name="brand" value="<?= $bName ?>" <?= $this->checkFieldBySortval("brand", $bName) ?> />
                <i></i> <?php echo $bName ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>


<section class="filter-form section-mb">
    <h4>filter by size</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php
        $AllSizes = $this->AllSizes;
        foreach ($AllSizes as $Size) :
        ?>
            <label class="checkbox">
                <input class="fpCbox" type="checkbox" name="size" value="<?= $Size ?>" <?= $this->checkFieldBySortval("size", $Size) ?> />
                <i></i> <?php echo htmlspecialchars($Size) ?>
            </label>

        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form colr-filter-form section-mb">
    <h4>filter by colour</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php
        $AllColors = $this->AllColors;
        foreach ($AllColors as $Color) :
            $Background = str_replace(" ", ", ", $Color, $count);
            if ($count)
                $Background = 'linear-gradient(to right, ' . $Background . ')';
        ?>
            <label class="checkbox">
                <input class="fpCbox" type="checkbox" name="colors" value="<?php echo $Color ?>" <?php echo $this->checkFieldBySortval("colors", $Color) ?> />
                <i style="background:<?php echo $Background ?>"></i>
                <?php echo htmlspecialchars($Color) ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>Availability</h4>
    <div class="ff-main">
        <label class="checkbox">
            <input class="fpCbox" type="checkbox" name="availability" value="1" <?php echo $this->checkFieldBySortval("availability", "1") ?> />
            <i></i> In Stock Only
        </label>
    </div>
</section>
