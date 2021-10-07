<?php

namespace _ilmComm;

$Cat = new Category\FetchCategories;

$MainCats = $Cat->fetchMain();
$submenu_addClass = $this->mobileView ? ' animated slideDown' : null;
$menu_clearfix = $this->mobileView ? 2 : 3;
?>
<?php
while ($ArrMain = $MainCats->fetch_assoc()) {
    $Cat->setCatId($ArrMain['id']);
    $Cat->setMain($ArrMain['main']);
    $Cat->setSubGroup(null);
    $Cat->setSub(null);
?>
    <li class="dropdown">
        <a href="<?php echo $Cat->getHref() ?>">
            <span><img src="<?php echo Models::baseUrl('images/category-slides/' . Models::restyleUrl($Cat->Mainc) . '-1.png?rand=' . rand()) ?>"></span>
            <?php echo htmlspecialchars($Cat->Mainc) ?> <i class="fa fa-angle-down"></i>
        </a>
        <ul role="menu" class="sub-menu<?php echo $submenu_addClass ?>">
            <div class="col-xs-12 sub-cols view-all hidden-md hidden-lg">
                <a href="<?php echo $Cat->getHref() ?>">
                    View All <?php echo htmlspecialchars($Cat->Mainc) ?> &nbsp;<i class="fa fa-long-arrow-right"></i>
                </a>
            </div>

            <?php
            $col4i = 1;
            $SubGroupCats = $Cat->fetchSubGroup();
            $TotalSubGroupCats = $SubGroupCats->num_rows;

            while ($ArrSubGrp = $SubGroupCats->fetch_assoc()) {
                $Cat->setCatId($ArrSubGrp['id']);
                $Cat->setSubGroup($ArrSubGrp['header']);
                $Cat->setSub(null);
            ?>
                <div class="col-md-4 col-xs-6 sub-cols">
                    <a href="<?php echo $Cat->getHref() ?>">
                        <h3><?php echo htmlspecialchars($Cat->SubGroup)  ?></h3>
                    </a>

                    <?php
                    $SubCats = $Cat->fetchSub();
                    $TotalSubCats = $SubCats->num_rows;

                    while ($ArrSub = $SubCats->fetch_array()) {
                        $Cat->setCatId($ArrSub['id']);
                        $Cat->setSub($ArrSub['sub']);
                    ?>
                        <li>
                            <a href="<?php echo $Cat->getHref() ?>">
                                <?php echo htmlspecialchars($Cat->Sub); ?>
                            </a>
                        </li>
                    <?php
                        if ($TotalSubCats == 1  && empty($Cat->Sub)) {
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

                if (($TotalSubGroupCats == 1)  && empty($Cat->SubGroup)) {
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