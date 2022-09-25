<section class="filter-form brand-filter-form section-mb">
    <h4>brand</h4>
    <div class="ff-main scroll-pane">

        <?php while ($Br = $this->AllBrands->fetch()): ?>
            <div class="brand-box">
                <label class="checkbox bb-check">
                    <input class="fpCbox" type="checkbox" name="brand" value="<?php echo $Br->getBrandName() ?>"
                        <?php echo $this->checkFieldBySortval("brand", $Br->getBrandName()) ?> />
                    <i></i>

                    <?php if (file_exists($Br->getBrandImage())) : ?>
                        <img src="<?php echo asset($Br->getBrandImage()) ?>" alt="<?php echo $Br->getBrandName() ?>" />
                    <?php else : ?>
                        <h5><?php echo $Br->getBrandName() ?></h5>
                    <?php endif; ?>

                </label>
            </div>
        <?php endwhile; ?>

    </div>
</section>
