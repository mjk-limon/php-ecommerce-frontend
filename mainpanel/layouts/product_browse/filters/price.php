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
