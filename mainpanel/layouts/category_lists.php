<?php

// Category 
$ci = new _ilmComm\Category\CategoryInfo\CategoryInfo;

$submenu_addClass = $this->mobileView ? 'animated slideDown' : null;
$menu_clearfix = $this->mobileView ? 2 : 3;

$MainCats = $ci->getFetchable()->fetchMain();
while ($ArrMain = $MainCats->fetch_assoc()) {
    $ci->setCatArr($ArrMain);
?>
    <li class="dropdown">
        <a href="<?php echo $ci->getHref() ?>">
            <span><img src="<?php echo current($ci->getCatImg("Category icon")) ?>"></span>
            <?php echo htmlspecialchars($ci->getMain()) ?>
            <i class="fa fa-angle-down"></i>
        </a>
        <ul role="menu" class="sub-menu <?php echo $submenu_addClass ?>">
            <div class="col-xs-12 sub-cols view-all hidden-md hidden-lg">
                <a href="<?php echo $ci->getHref() ?>">
                    View All <?php echo htmlspecialchars($ci->getMain()) ?>
                    <i class="fa fa-long-arrow-right"></i>
                </a>
            </div>

            <?php
            $col4i = 1;
            $SubGroupCats = $ci->getFetchable()->fetchSubGroup();
            $TotalSubGroupCats = $SubGroupCats->num_rows;

            while ($ArrSubGrp = $SubGroupCats->fetch_assoc()) {
                $ci->setCatArr($ArrSubGrp);
            ?>
                <div class="col-md-4 col-xs-6 sub-cols">
                    <a href="<?php echo $ci->getHref() ?>">
                        <h3><?php echo htmlspecialchars($ci->getSubGroup())  ?></h3>
                    </a>

                    <?php
                    $SubCats = $ci->getFetchable()->fetchSub();
                    $TotalSubCats = $SubCats->num_rows;

                    while ($ArrSub = $SubCats->fetch_array()) {
                        $ci->setCatArr($ArrSub);
                    ?>
                        <li>
                            <a href="<?php echo $ci->getHref() ?>">
                                <?php echo htmlspecialchars($ci->getSub()); ?>
                            </a>
                        </li>
                    <?php
                        if ($TotalSubCats == 1  && empty($ci->getSub())) {
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