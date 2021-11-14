<?php

namespace _ilmComm;

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