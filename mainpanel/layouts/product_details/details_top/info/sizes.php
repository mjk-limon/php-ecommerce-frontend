<?php if ($Sizes = array_filter($this->ProductDetails->getSizes())) : ?>
    <div class="pr-sc-area">
        <div>Select size:</div>
        <ul class="size-selection">

            <?php foreach ($Sizes as $Size) : ?>
                <li class="ss-btn"><?php echo $Size ?></li>
            <?php endforeach; ?>

        </ul>
    </div>
<?php endif; ?>