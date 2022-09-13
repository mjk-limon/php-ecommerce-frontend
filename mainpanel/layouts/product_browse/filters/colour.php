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
