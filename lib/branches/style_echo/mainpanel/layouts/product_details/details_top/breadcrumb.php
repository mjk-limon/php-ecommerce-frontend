<?php

use _ilmComm\Category\CategoryInfo\SingleCategory;

$cat = new SingleCategory;
$cat->setCategoryId($this->ProductDetails->getCategory());
$cat->buildInfo();
?>

<div class="page-navigator">
    <div class="container">
        <ol class="breadcrumb">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="<?php echo $cat->getCategoryLink() ?>">
                    <?php echo $cat->getMain(); ?>
                </a>
            </li>

            <?php if ($subGroup = $cat->getSubGroup()) : ?>
                <li>
                    <a href="<?php echo $cat->getCategoryLink() ?>">
                        <?php echo $subGroup; ?>
                    </a>
                </li>

                <?php if ($sub = $cat->getSub()) : ?>
                    <li>
                        <a href="<?php echo $cat->getCategoryLink() ?>">
                            <?php echo $sub ?>
                        </a>
                    </li>
                <?php endif; ?>

            <?php endif; ?>

            <li class="active"><?php echo $this->ProductDetails->getName() ?></li>
        </ol>
    </div>
</div>
