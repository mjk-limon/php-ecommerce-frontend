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
        foreach ($this->PriceSortData as $PSKey => $MinPrice) :
            if ($MaxPrice = rec_arr_val($this->PriceSortData, ($PSKey + 1))) {
                // Minprice and Max price exists
                $SingleFilterLabel = "{$MinPrice} - {$MaxPrice}";
                $FilterFieldValue = preg_replace("/\s+/", "", $SingleFilterLabel);
            } else {
                // Only minprice exists
                $SingleFilterLabel = "More than {$MinPrice}";
                $FilterFieldValue = "{$MinPrice}-";
            }
        ?>
            <label class="radio">
                <input class="fpCbox" type="radio" name="price"
                       value="<?php echo $FilterFieldValue ?>"
                       <?php echo $this->checkFieldBySortval("price", $FilterFieldValue) ?> />
                <i></i> <?php echo $SingleFilterLabel ?>
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
            // Set brand info
            $this->SingleBrand->setBrand($Brand);

            // Get brand name and image
            $bName = $this->SingleBrand->getBrandName();
            $bImage = $this->SingleBrand->getBrandImage();
        ?>
            <div class="brand-box">
                <label class="checkbox bb-check">
                    <input class="fpCbox" type="checkbox" name="brand"
                           value="<?php echo $bName ?>"
                           <?php echo $this->checkFieldBySortval("brand", $bName) ?> />
                    <i></i>

                    <?php if (file_exists($bImage)) : ?>
                        <img src="<?php echo asset($bImage) ?>" alt="<?php echo $bName ?>" />
                    <?php else : ?>
                        <h5><?php echo $bName ?></h5>
                    <?php endif; ?>

                </label>
            </div>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>size</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php foreach ($this->AllSizes as $SingleSize) : ?>
            <label class="checkbox">
                <input class="fpCbox" type="checkbox" name="size"
                       value="<?php echo $SingleSize ?>"'
                       <?php echo $this->checkFieldBySortval("size", $SingleSize) ?> />
                <i></i> <?php echo htmlspecialchars($SingleSize) ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form colr-filter-form section-mb">
    <h4>colour</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php
        foreach ($this->AllColors as $SingleColor) :
            // Check multiple color
            $Background = str_replace(" ", ", ", $SingleColor, $ColorCount);

            // CSS gradient if multiple color
            $ColorCount && $Background = 'linear-gradient(to right, ' . $Background . ')';
        ?>
            <label class="checkbox">
                <input class="fpCbox" type="checkbox" name="colors"
                       value="<?php echo $SingleColor ?>"
                       <?php echo $this->checkFieldBySortval("colors", $SingleColor) ?> />
                <i style="background:<?php echo $Background ?>"></i>
                <?php echo htmlspecialchars($SingleColor) ?>
            </label>
        <?php endforeach; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>Discount</h4>
    <div class="ff-main scroll-pane slimScroll">

        <?php for ($psi = 1; $psi <= 9; $psi++) : ?>
            <label class="radio">
                <input class="fpCbox" type="radio" name="discount"
                       value="<?php echo $psi * 10 ?>"
                       <?php echo $this->checkFieldBySortval("discount", ($psi * 10)) ?> />
                <i></i> More than <?php echo $psi * 10 ?>%
            </label>
        <?php endfor; ?>

    </div>
</section>

<section class="filter-form section-mb">
    <h4>Availability</h4>
    <div class="ff-main">
        <label class="checkbox">
            <input class="fpCbox" type="checkbox" name="availability"
                   value="1"
                   <?php echo $this->checkFieldBySortval("availability", "1") ?> />
            <i></i> In Stock Only
        </label>
    </div>
</section>
