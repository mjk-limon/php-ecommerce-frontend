<?php

use _ilmComm\Brands\FetchBrands\FetchFromArray;

?>

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
                    <input class="fpCbox" type="checkbox" name="brand" value="<?php echo $bName ?>"
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
