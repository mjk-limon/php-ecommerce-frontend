<?php if ($Colors = array_filter($this->ProductDetails->getColors())) : ?>
    <div class="pr-sc-area">
        <div>Select Variant:</div>
        <ul class="color-selection">

            <?php
            foreach ($Colors as $Color) :
                $resColor = restyle_url($Color, true);
                $background = str_replace(" ", ", ", $Color, $count);
                if ($count) {
                    $background = 'linear-gradient(45deg, ' . $background . ')';
                }
                $colrPrev = (file_exists(doc_root("proimg/{$this->Prid}/{$resColor}-texture.png")) ?
                    "url('" . asset("proimg/{$this->Prid}/{$resColor}-texture.png") . "') no-repeat center / 100% 100%" :
                    $background
                );
            ?>
                <li class="cs-btn">
                    <i style="background:<?php echo $colrPrev ?>"></i> <?php echo $Color ?>
                </li>
            <?php endforeach; ?>

        </ul>
    </div>
<?php endif; ?>
