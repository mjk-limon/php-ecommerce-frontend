<?php

// Main categories
$ci = $this->AllCategories;
$MainCats = $ci->get($ci::FETCH_MAIN);

// Menu classes and clearfixes
$submenu_addClass = $this->mobileView ? 'animated slideDown' : null;
$menu_clearfix = $this->mobileView ? 2 : 3;

while ($ArrMain = $MainCats->fetch()) {
    // Sub group categories
    $SubGroupCats = $ArrMain->getFetchable()->get($ci::FETCH_SUB_GROUP);
    $TotalSubGroupCats = $SubGroupCats->num_rows;
?>
    <li class="dropdown">
        <a href="<?php echo $ArrMain->getCategoryLink($ArrMain::CATEGORY_LINK_FMAIN) ?>">
            <span><img src="<?php echo asset(current($ArrMain->getCategoryImage("Category icon"))) ?>"></span>
            <?php echo htmlspecialchars($ArrMain->getMain()) ?>
            <i class="fa fa-angle-down"></i>
        </a>
        <ul role="menu" class="sub-menu <?php echo $submenu_addClass ?>">
            <div class="col-xs-12 sub-cols view-all hidden-md hidden-lg">
                <a href="<?php echo $ArrMain->getCategoryLink() ?>">
                    View All <?php echo htmlspecialchars($ArrMain->getMain()) ?>
                    <i class="fa fa-long-arrow-right"></i>
                </a>
            </div>

            <?php
            // Init column break
            $col4i = 1;

            while ($ArrSubGrp = $SubGroupCats->fetch()) {
                // Sub categories
                $SubCats = $ArrSubGrp->getFetchable()->get($ci::FETCH_SUB);
                $TotalSubCats = $SubCats->num_rows;
            ?>
                <div class="col-md-4 col-xs-6 sub-cols">
                    <a href="<?php echo $ArrSubGrp->getCategoryLink($ArrMain::CATEGORY_LINK_FSUBGROUP) ?>">
                        <h3><?php echo htmlspecialchars($ArrSubGrp->getSubGroup())  ?></h3>
                    </a>

                    <?php while ($ArrSub = $SubCats->fetch()) { ?>
                        <li>
                            <a href="<?php echo $ArrSub->getCategoryLink($ArrMain::CATEGORY_LINK_FSUB) ?>">
                                <?php echo htmlspecialchars($ArrSub->getSub()); ?>
                            </a>
                        </li>

                        <?php if ($TotalSubCats == 1  && empty($ArrSub->getSub())) { ?>
                            <div class="no-catsub"></div>
                        <?php } ?>

                    <?php } ?>

                </div>

                <?php
                if ($col4i % $menu_clearfix == 0) {
                    echo '<div class="clearfix"></div>';
                }

                if (($TotalSubGroupCats == 1) && empty($ArrSubGrp->getSubGroup())) {
                    echo '<div class="no-cathead"></div>';
                }
                ?>

            <?php
                $col4i++;
            }
            ?>

            <div class="clearfix"></div>
        </ul>
    </li>
<?php } ?>
