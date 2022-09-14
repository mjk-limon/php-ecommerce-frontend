<?php if (!empty($this->Filters)) : ?>
    <div class="tt-filter">

        <?php
        foreach ($this->Filters as $FKey => $FVal) :
            // Parse array from filter
            $EFVal = explode("_-_", $FVal);
        ?>
            <div class="ttf-single">
                <?php echo ucwords($FKey) . " : " . implode(", ", $EFVal) ?>
                <span class="ttf-close"
                      data-fkey="<?php echo $FKey ?>"
                      data-fval="<?php echo $FVal ?>">&times;</span>
            </div>
        <?php endforeach; ?>

    </div>
<?php endif; ?>
