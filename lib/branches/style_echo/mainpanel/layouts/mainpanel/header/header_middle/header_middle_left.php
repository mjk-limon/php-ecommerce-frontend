<?php
$BrandList = $this->extModel("Brands")->brandLists(true);
?>

<div class="cols logo-cols ht-right-item">
    <div class="logo">
        <a href="/" id="home-btn">
            <img src="<?php echo get_logo() ?>">
        </a>
    </div>

    <div class="brand-group" style="margin-bottom: 1rem">

        <div class="brand-flex">

            <?php foreach ($BrandList as $BrName) : ?>
                <div class="single-brand">
                    <div class="single-brand-info">
                        <a href="<?php echo $BrName['link'] ?>">
                            <div class="sb-brand-title">
                                <?php if ($BrName['image']) : ?>
                                    <img src="<?php echo $BrName['image'] ?>" alt="<?php echo $BrName['brand'] ?>" />
                                <?php else:  ?>
                                    <?php echo $BrName['brand'] ?>
                                <?php endif ?>
                            </div>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>

        </div>
    </div>
</div>