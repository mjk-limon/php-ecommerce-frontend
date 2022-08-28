<?php

namespace _ilmComm;

?>

<section class="main-body bg-white">

    <?php
    // Get Brand List
    $BrandLists = $this->brandLists();
    if (is_array($BrandLists) && count($BrandLists)) :
        // Brand exists
    ?>
        <div class="spd">
            <div class="container">
                <div class="section-mb">
                    <div class="bc-title">
                        <div class="bc-main-title">All Brands</div>
                    </div>
                    <div class="ft-pr-sliders">
                        <div class="homepage-brand-section">

                            <?php
                            // Format brand list
                            $FormattedBrandList = array_combine(array_column($BrandLists, "brand"), $BrandLists);

                            // Group formatted brand by A,B,C,D....
                            $BrandGroups = $this->groupBrandList($FormattedBrandList);
                            
                            // Fetch all brand by group name
                            foreach ($BrandGroups as $GK => $GK_Val) :
                            ?>
                                <div class="brand-group" style="margin-bottom: 1rem">
                                    <div class="bc-cat-name"><?php echo $GK ?></div>
                                    <div class="flex brand-flex">

                                        <?php
                                        foreach ($GK_Val as $BrName) :
                                            // Brand info from brand name
                                            $BrandInfo = rec_arr_val($FormattedBrandList, $BrName);

                                            // Brand info var from array
                                            $BrLink = rec_arr_val($BrandInfo, 'link');
                                            $BrImg = rec_arr_val($BrandInfo, 'image');
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