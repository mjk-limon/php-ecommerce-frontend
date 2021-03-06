<?php

namespace _ilmComm;

use _ilmComm\Brands\FetchBrands\FetchFromArray;

?>

<section class="filter-form section-mb">
    <div class="filter-by-titile">Filter By:</div>
    <h4>price</h4>
    <div class="ff-main">
        <div class="price-range-box">
            <form id="priceSort-form" action="" method="POST">
                <li><input type="text" title="Price must be an integer number" pattern="[0-9]+" name="min" placeholder="Min" /></li>
                <li class="hypen">-</li>
                <li><input type="text" title="Price must be an integer number" pattern="[0-9]+" name="max" placeholder="Max" /></li>
                <li><button>Apply</button></li>
            </form>
        </div>
    </div>
    <div class="ff-main scroll-pane slimScroll">

        <?php
        foreach ($this->PriceSortData as $PSKey => $lblmp) :
            if (isset($this->PriceSortData[($PSKey + 1)])) {
                $lblmxp = $this->PriceSortData[($PSKey + 1)];
                $prlbl = $lblmp . " - " . $lblmxp;
                $prval = preg_replace("/\s+/", "", $prlbl);
            } else {
                $prlbl = "More than " . $lblmp;
                $prval = $lblmp . "-";
            }
        ?>
            <label class="radio">
                <input class="fpCbox" type="radio" name="price" value="<?= $prval ?>" <?= $this->checkFieldBySortval("price", $prval) ?> />
                <i></i> <?= $prlbl ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form brand-filter-form section-mb">
    <h4>brand</h4>
    <div class="ff-main scroll-pane">

        <?php
        $FB = new FetchFromArray;
        $FB->setBrandArr($this->AllBrands);

        foreach ($FB->get() as $Brand) :
            $this->SingleBrand->setBrand($Brand);
            $bName = $this->SingleBrand->getBrandName();
            $bImage = $this->SingleBrand->getBrandImage();
        ?>
            <div class="brand-box">
                <label class="checkbox bb-check">
                    <input class="fpCbox" type="checkbox" name="brand" value="<?= $bName ?>" <?= $this->checkFieldBySortval("brand", $bName) ?> />
                    <i></i>

                    <?php if (file_exists($bImage)) : ?>
                        <img src="<?= Models::baseUrl($bImage) ?>" alt="<?= $bName ?>" />
                    <?php else : ?>
                        <h5><?= $bName ?></h5>
                    <?php endif; ?>
                </label>
            </div>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>size</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php
        $AllSizes = $this->AllSizes;
        foreach ($AllSizes as $Size) :
        ?>
            <label class="checkbox">
                <input class="fpCbox" type="checkbox" name="size" value="<?= $Size ?>" <?= $this->checkFieldBySortval("size", $Size) ?> />
                <i></i> <?= htmlspecialchars($Size) ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form colr-filter-form section-mb">
    <h4>colour</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php
        $AllColors = $this->AllColors;
        foreach ($AllColors as $Color) :
            $Background = str_replace(" ", ", ", $Color, $count);
            if ($count) {
                $Background = 'linear-gradient(to right, ' . $Background . ')';
            }
        ?>
            <label class="checkbox">
                <input class="fpCbox" type="checkbox" name="colors" value="<?= $Color ?>" <?= $this->checkFieldBySortval("colors", $Color) ?> />
                <i style="background:<?= $Background ?>"></i> <?= htmlspecialchars($Color) ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>Discount</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php for ($psi = 1; $psi <= 9; $psi++) : ?>
            <label class="radio">
                <input class="fpCbox" type="radio" name="discount" value="<?= $psi * 10 ?>" <?= $this->checkFieldBySortval("discount", ($psi * 10)) ?> />
                <i></i> More than <?= $psi * 10 ?>%
            </label>
        <?php endfor; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>Availability</h4>
    <div class="ff-main">
        <label class="checkbox">
            <input class="fpCbox" type="checkbox" name="availability" value="1" <?= $this->checkFieldBySortval("availability", "1") ?> />
            <i></i> In Stock Only
        </label>
    </div>
</section>