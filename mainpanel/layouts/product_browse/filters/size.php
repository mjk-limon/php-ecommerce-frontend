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
