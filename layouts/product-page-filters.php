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
    <h4>brand</h4>
    <div class="ff-main scroll-pane">

        <?php
        $AllBrands = $this->AllBrands;
        foreach ($AllBrands as $Brand) :
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
