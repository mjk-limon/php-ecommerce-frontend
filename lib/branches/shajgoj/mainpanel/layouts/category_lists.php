<?php

// Main categories
$ci = $this->AllCategories;
$MainCats = $ci->get($ci::FETCH_MAIN);

// Menu classes and clearfixes
$submenu_addClass = $this->mobileView ? 'animated slideDown' : null;
$menu_clearfix = $this->mobileView ? 2 : 6;

while ($ArrMain = $MainCats->fetch()) :
    // Sub group categories
    $SubGroupCats = $ArrMain->getFetchable()->get($ci::FETCH_SUB_GROUP);
    $TotalSubGroupCats = $SubGroupCats->num_rows;

    $catIcon = current($ArrMain->getCategoryImage('Category icon'));
    $singleCatBgTexture = file_exists(doc_root($catIcon))
        ? 'style="background-image:url(' . asset($catIcon) . ')" class="has-bg"'
        : '';
?>
    <li class="dropdown">
        <a href="<?php echo $ArrMain->getCategoryLink() ?>" <?php echo $singleCatBgTexture ?>>
            <?php echo htmlspecialchars($ArrMain->getMain()) ?>

            <?php if ($this->mobileView) : ?>
                <i class="pe-7s-angle-down toggle-sidemenuitem"></i>
            <?php endif; ?>
        </a>
        <ul role="menu" class="sub-menu<?php echo $submenu_addClass ?>">

            <?php
            // Init column break
            $col4i = 1;

            while ($ArrSubGrp = $SubGroupCats->fetch()) :
                // Sub categories
                $SubCats = $ArrSubGrp->getFetchable()->get($ci::FETCH_SUB);
                $TotalSubCats = $SubCats->num_rows;
            ?>
                <div class="col-md-2 col-xs-6 sub-cols">
                    <a href="<?php echo $ArrSubGrp->getCategoryLink() ?>">
                        <h3><?php echo htmlspecialchars($ArrSubGrp->getSubGroup())  ?></h3>
                    </a>

                    <?php while ($ArrSub = $SubCats->fetch()) : ?>
                        <li>
                            <a href="<?php echo $ArrSub->getCategoryLink() ?>">
                                <?php echo htmlspecialchars($ArrSub->getSub()); ?>
                            </a>
                        </li>

                        <?php if ($TotalSubCats == 1  && empty($ArrSub->getSub())) : ?>
                            <div class="no-catsub"></div>
                        <?php endif; ?>

                    <?php endwhile; ?>

                </div>

                <?php
                if ($col4i % $menu_clearfix == 0) {
                    echo '<div class="clearfix"></div>';
                }

                if (($TotalSubGroupCats == 1)  && empty($ArrSubGrp->getSubGroup())) {
                    echo '<div class="no-cathead"></div>';
                }
                ?>

            <?php
                $col4i++;
            endwhile;
            ?>

        </ul>
    </li>
<?php endwhile; ?>