<?php

$BrandList = $this->extModel("Brands")->brandLists(true);
$BrandGroups = $this->extModel("Brands")->groupBrandList($BrandList);
$TopBrands = array_slice($BrandList, 0, 9);
?>

<div class="col-md-4" style="position: static;">
    <div class="mainmenu-area-quicklinks">
        <ul class="m-a-links">
            <li>
                <a href="javascript:;">BRANDS</a>
                <div class="header-floating-menu animated fadeInUp">
                    <div class="hfm-brands" style="display:flex;height:100%;">
                        <div class="hfm-brandsection-left slimScroll" style="width:27.5%;height:100%;flex:0 0 27.5%">
                            <div class="hfm-bl-sec">
                                <h5 class="hfm-title">TOP BRANDS</h5>

                                <div class="brand-group" style="margin-bottom: 1rem">

                                    <?php foreach ($TopBrands as $GK_Val) : ?>
                                        <div class="brand-flex">

                                            <?php
                                            foreach ($GK_Val as $BrName) :
                                                $BrLink = $BrandList[$BrName]['link'];
                                                $BrImg = $BrandList[$BrName]['image'];
                                                $BrCnt = $BrandList[$BrName]['total_prs'];
                                            ?>
                                                <div class="single-brand">
                                                    <div class="single-brand-info">
                                                        <a href="<?php echo $BrLink ?>">
                                                            <div class="sb-brand-title">
                                                                <?php echo $BrName ?>
                                                                <span class="label label-default"><?php echo $BrCnt ?></span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            <?php endforeach; ?>

                                        </div>
                                    <?php endforeach; ?>

                                </div>
                            </div>
                            <div class="hfm-bl-sec">
                                <h5 class="hfm-title">ALL BRANDS</h5>

                                <?php foreach ($BrandGroups as $GK => $GK_Val) : ?>
                                    <div class="brand-group" style="margin-bottom: 1rem" id="<?php echo $GK . "1" ?>">
                                        <div class="bc-cat-name" style="color:var(--accent)">
                                            <?php echo $GK ?>
                                        </div>
                                        <div class="brand-flex">

                                            <?php
                                            foreach ($GK_Val as $BrName) :
                                                $BrLink = $BrandList[$BrName]['link'];
                                                $BrImg = $BrandList[$BrName]['image'];
                                                $BrCnt = $BrandList[$BrName]['total_prs'];
                                            ?>
                                                <div class="single-brand">
                                                    <div class="single-brand-info">
                                                        <a href="<?php echo $BrLink ?>">
                                                            <div class="sb-brand-title">
                                                                <?php echo $BrName ?>
                                                                <span class="label label-default"><?php echo $BrCnt ?></span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            <?php endforeach; ?>

                                        </div>
                                    </div>
                                <?php endforeach; ?>

                            </div>
                        </div>
                        <div class="hfm-brandsection-right" style="width:72.5%;flex:0 0 72.5%">
                            <div class="hfmr-lnav">
                                <ul class="nav brand-env-nav">
                                    <li><a href="">#</a></li>

                                    <?php foreach (range('A', 'Z') as $Char) : ?>
                                        <li>
                                            <a href="javascript:;" onclick="_ilm.jumpToSection('#<?php echo $Char ?>1', null, '.hfm-brandsection-left')">
                                                <?php echo $Char ?>
                                            </a>
                                        </li>
                                    <?php endforeach; ?>

                                </ul>
                            </div>
                            <div class="hfmr-full">
                                <h5 class="hfm-title">TOP BRANDS</h5>
                                <div class="flex brand-flex flex-wrap top-brands">

                                    <?php
                                    foreach ($TopBrands as $GK_Val) :
                                        foreach ($GK_Val as $BrName) :
                                            $BrLink = $BrandList[$BrName]['link'];
                                            $BrImg = $BrandList[$BrName]['image'];
                                    ?>
                                            <div class="single-brand">
                                                <div class="single-brand-info">
                                                    <a href="<?php echo $BrLink ?>">
                                                        <div class="sb-brand-image-placeholder">
                                                            <div class="sb-brand-image"
                                                                 style="background-image:url('<?php echo $BrImg ?>')"></div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        endforeach;
                                    endforeach;
                                    ?>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
