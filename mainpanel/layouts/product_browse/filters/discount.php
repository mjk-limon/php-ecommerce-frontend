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
