<?php

namespace _ilmComm;

$Cmp = $this->getComp();
$Specs = $Cmp->getSpecs();
$Prs1Info = $Cmp->getFirstProductInfo();
$Prs2Info = $Cmp->getSecondProductInfo();
$Prs3Info = $Cmp->getThirdProductInfo();
?>

<section class="main-body inner-page">
    <div class="spd">
        <div class="container">
            <div class="section-mb">
                <div class="product-comparison">
                    <table class="table">
                        <thead>
                            <tr>
                                <th width="20%">
                                    <div class="intro">Product Comparison</div>
                                    <div class="intro-tag">Find and select products to see the differences and similarities between them</div>
                                </th>
                                <th class="text-center prinfo" width="26.66667%">
                                    <?php if ($Prs1Info) : ?>
                                        <img src="<?php echo $Prs1Info['image'] ?>" class="pr-thumbnail" />
                                        <h4><?php echo $Prs1Info['name'] ?></h4>
                                        <p class="prinfo-brand">
                                            By:
                                            <?php echo $Prs1Info['brand'] ?>
                                        </p>
                                        <p class="prinfo-rating">
                                            <span class="stars"><?php echo $Prs1Info['rating'] ?></span>
                                            <span>(Total Rating: <?php echo $Prs1Info['rating_total'] ?>)</span>
                                        </p>
                                        <p class="prinfo-price"><?php echo Models::curr($Prs1Info['price']) ?></p>
                                    <?php endif; ?>
                                </th>
                                <th class="text-center prinfo" width="26.66667%">
                                    <?php if ($Prs2Info) : ?>
                                        <img src="<?php echo $Prs2Info['image'] ?>" class="pr-thumbnail" />
                                        <h4><?php echo $Prs2Info['name'] ?></h4>
                                        <p class="prinfo-brand">
                                            By:
                                            <?php echo $Prs2Info['brand'] ?>
                                        </p>
                                        <p class="prinfo-rating">
                                            <span class="stars"><?php echo $Prs2Info['rating'] ?></span>
                                            <span>(Total Rating: <?php echo $Prs2Info['rating_total'] ?>)</span>
                                        </p>
                                        <p class="prinfo-price"><?php echo Models::curr($Prs2Info['price']) ?></p>
                                    <?php endif; ?>
                                </th>
                                <th class="text-center prinfo" width="26.66667%">
                                    <?php if ($Prs3Info) : ?>
                                        <img src="<?php echo $Prs3Info['image'] ?>" class="pr-thumbnail" />
                                        <h4><?php echo $Prs3Info['name'] ?></h4>
                                        <p class="prinfo-brand">
                                            By:
                                            <?php echo $Prs3Info['brand'] ?>
                                        </p>
                                        <p class="prinfo-rating">
                                            <span class="stars"><?php echo $Prs3Info['rating'] ?></span>
                                            <span>(Total Rating: <?php echo $Prs3Info['rating_total'] ?>)</span>
                                        </p>
                                        <p class="prinfo-price"><?php echo Models::curr($Prs3Info['price']) ?></p>
                                    <?php endif; ?>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <?php foreach ($Specs as $SSpc) : ?>
                                <tr>
                                    <td class="spectitle">
                                        <?php echo $SSpc ?>
                                    </td>
                                    <td>
                                        <?php
                                        if ($Prs1Info && array_key_exists($SSpc, $Prs1Info['specs'])) {
                                            echo $Prs1Info['specs'][$SSpc];
                                        }
                                        ?>
                                    </td>
                                    <td>
                                        <?php
                                        if ($Prs2Info && array_key_exists($SSpc, $Prs2Info['specs'])) {
                                            echo $Prs2Info['specs'][$SSpc];
                                        }
                                        ?>
                                    </td>
                                    <td>
                                        <?php
                                        if ($Prs3Info && array_key_exists($SSpc, $Prs3Info['specs'])) {
                                            echo $Prs3Info['specs'][$SSpc];
                                        }
                                        ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>

                            <tr class="pr-nav-section">
                                <td></td>
                                <td>
                                    <?php if ($Prs1Info) : ?>
                                        <div class="sp-nav-group">
                                            <em data-prid="<?php echo $Prs1Info['id'] ?>" data-size="" data-colr="" data-qty="1"></em>
                                            <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
                                            <a href="javascript:;" class="cCompareNav cmpremove">Remove</a>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if ($Prs2Info) : ?>
                                        <div class="sp-nav-group">
                                            <em data-prid="<?php echo $Prs2Info['id'] ?>" data-size="" data-colr="" data-qty="1"></em>
                                            <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
                                            <a href="javascript:;" class="cCompareNav cmpremove">Remove</a>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if ($Prs3Info) : ?>
                                        <div class="sp-nav-group">
                                            <em data-prid="<?php echo $Prs3Info['id'] ?>" data-size="" data-colr="" data-qty="1"></em>
                                            <a href="javascript:;" class="add-cart cAddBuyNav">Add To Cart</a>
                                            <a href="javascript:;" class="cCompareNav cmpremove">Remove</a>
                                        </div>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
