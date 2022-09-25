<?php

// Category 
$ci = new _ilmComm\Category\FetchCategories\AllCategories;

$submenu_addClass = $this->mobileView ? 'animated slideDown' : null;
$menu_clearfix = $this->mobileView ? 2 : 3;

$MainCats = $ci->fetch($ci::FETCH_MAIN);
while ($ArrMain = $MainCats->fetch()) {
?>
    <li class="dropdown">
        <a href="<?php echo $ArrMain->getHref() ?>">
            <span><img src="<?php echo asset(current($ArrMain->getCatImg("Category icon"))) ?>"></span>
            <?php echo htmlspecialchars($ArrMain->getMain()) ?>
            <i class="fa fa-angle-down"></i>
        </a>
        <ul role="menu" class="sub-menu <?php echo $submenu_addClass ?>">
            <div class="col-xs-12 sub-cols view-all hidden-md hidden-lg">
                <a href="<?php echo $ArrMain->getHref() ?>">
                    View All <?php echo htmlspecialchars($ArrMain->getMain()) ?>
                    <i class="fa fa-long-arrow-right"></i>
                </a>
            </div>

            <?php
            $col4i = 1;
            $SubGroupCats = $ArrMain->getFetchable()->fetch($ci::FETCH_SUB);
            $TotalSubGroupCats = $SubGroupCats->num_rows;

            while ($ArrSubGrp = $SubGroupCats->fetch()) {
            ?>
                <div class="col-md-4 col-xs-6 sub-cols">
                    <a href="<?php echo $ArrSubGrp->getHref() ?>">
                        <h3><?php echo htmlspecialchars($ArrSubGrp->getSubGroup())  ?></h3>
                    </a>

                    <?php
                    $SubCats = $ArrSubGrp->getFetchable()->fetch($ci::FETCH_SUB);
                    $TotalSubCats = $SubCats->num_rows;

                    while ($ArrSub = $SubCats->fetch()) {
                    ?>
                        <li>
                            <a href="<?php echo $ArrSub->getHref() ?>">
                                <?php echo htmlspecialchars($ArrSub->getSub()); ?>
                            </a>
                        </li>
                    <?php
                        if ($TotalSubCats == 1  && empty($ArrSub->getSub())) {
                            echo '<div class="no-catsub"></div>';
                        }
                    }
                    $SubCats->free();
                    ?>

                </div>
            <?php
                if ($col4i % $menu_clearfix == 0) {
                    echo '<div class="clearfix"></div>';
                }

                if (($TotalSubGroupCats == 1) && empty($Cat->SubGroup)) {
                    echo '<div class="no-cathead"></div>';
                }

                $col4i++;
            }
            $SubGroupCats->free();
            ?>

            <div class="clearfix"></div>
        </ul>
    </li>
<?php
}
$MainCats->free();
?>
