<?php

namespace _ilmComm;

$BrandLists = $this->brandLists();
?>

<section class="main-body bg-white">

    <?php if (is_array($BrandLists) && count($BrandLists)) : ?>
        <div class="spd">
            <div class="container">
                <div class="section-mb">
                    <div class="bc-title">
                        <div class="bc-main-title">All Brands</div>
                    </div>
                    <div class="ft-pr-sliders">
                        <div class="homepage-brand-section">
                            <?php
                            $FormattedBrandList = array_combine(array_column($BrandLists, "brand"), $BrandLists);
                            $BrandGroups = $this->groupBrandList($FormattedBrandList);
                            foreach ($BrandGroups as $GK => $GK_Val) :
                            ?>
                                <div class="brand-group" style="margin-bottom: 1rem">
                                    <div class="bc-cat-name"><?php echo $GK ?></div>
                                    <div class="flex brand-flex">

                                        <?php
                                        foreach ($GK_Val as $BrName) :
                                            $BrLink = $FormattedBrandList[$BrName]['link'];
                                            $BrImg = $FormattedBrandList[$BrName]['image'];
                                        ?>
                                            <div class="single-brand">
                                                <div class="single-brand-info">
                                                    <a href="<?php echo $BrLink ?>">
                                                        <div class="sb-brand-image-placeholder">
                                                            <div class="sb-brand-image" style="background-image:url('<?php echo $BrImg ?>')"></div>
                                                        </div>
                                                        <div class="sb-brand-title"><?php echo $BrName ?></div>
                                                    </a>
                                                </div>
                                            </div>
                                        <?php endforeach; ?>

                                    </div>
                                </div>
                            <?php endforeach; ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>

</section>
