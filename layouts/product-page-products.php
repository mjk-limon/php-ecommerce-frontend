<?php

namespace _ilmComm;

$spAddClass = Models::getSiteSettings('navhover') ? 'fixed-nav' : null;
?>

<?php if (!isset($this->onlyload) || $this->onlyload != "ppp-ws") : ?>
    <div class="serachbox product-page-filter-searchbox">
        <form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
            <div class="searchfld deskv">
                <input type="text" placeholder="Search for Proudcts, Categories..." name="q" autocomplete="off" class="input-text search-q" />
                <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
            </div>
        </form>
    </div>

    <div class="top-title">
        <div class="top-title-left">
            <h4><?= $this->PrsTitle ?></h4>

            <?php if ($this->Filters) : ?>
                <div class="tt-filter">
                    <?php
                    foreach ($this->Filters as $FKey => $FVal) :
                        $EFVal = explode("_-_", $FVal);
                    ?>
                        <div class="ttf-single">
                            <?= ucwords($FKey) . " : " . implode(", ", $EFVal) ?>
                            <span class="ttf-close" data-fkey="<?= $FKey ?>" data-fval="<?= $FVal ?>">&times;</span>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="tt-total-pr">
                <div class="tt-total-pr-label">Total <?= $this->TotalProduct ?> Products Found.</div>
                <div class="toolbar-sorter hidden-xs">
                    <input type="hidden" id="sortVal" name="fpCbox" name="sort" value="" />

                    <div class="sort-options _desV">
                        <select id="sortVal" name="fpCbox" name="sort" value="">
                            <option value="1">Default Sorting</option>
                            <option value="2">Sort By Popularity</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>

<div class="product-page-products">
    <div class="grid-row grid3">
        <?php
        foreach ($this->AllProducts as $Product) :
            $this->SingleProduct->setPrInfo($Product);
            $this->SingleProduct->processDiscount();
            $this->SingleProduct->processStock();
        ?>
            <div class="grids">
                <div class="single-product <?= $spAddClass ?> m-flex">
                    <div class="sp-image">

                        <?php if ($this->SingleProduct->getDiscount()) : ?>
                            <span class="sp-dis">SALE</span>
                        <?php endif; ?>

                        <a href="<?= $this->SingleProduct->getHref() ?>">
                            <img src="<?= Models::asset("images/preloader.gif") ?>" data-src="<?= $this->SingleProduct->getProductImage() ?>" />
                        </a>
                    </div>
                    <div class="has-sp-nav">
                        <div class="sp-pr">
                            <div class="sp-pr-info">
                                <a href="<?= $this->SingleProduct->getHref() ?>">
                                    <h5><?= $this->SingleProduct->getName() ?></h5>
                                </a>
                                <p>
                                    <?php if ($this->SingleProduct->getDiscount()) : ?>
                                        <strong class="p-old"><?= Models::curr($this->SingleProduct->getPrice(0)) ?></strong>
                                    <?php endif; ?>

                                    <strong class="price"><?= Models::curr($this->SingleProduct->getPrice()) ?></strong>
                                </p>
                                <div style="color: #FF5722;text-align: center;font-weight: bold;">&nbsp;</div>
                                <p style="color: #ffc168;">☆☆☆☆☆</p>
                                <p>50ml</p>
                            </div>
                        </div>

                        <div class="sp-nav">
                            <em data-prid="<?= $this->SingleProduct->getProductId() ?>" data-size="" data-colr="" data-qty="1"></em>
                            <a href="javascript:;" class="add-cart cAddBuyNav"><i class="fa fa-heart-o"></i></a>
                            <a href="javascript:;" class="buy-now cAddBuyNav">ADD TO CART</a>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>

    </div>

    <?php if (count($this->AllProducts)) : ?>
        <div class="ilm-paging">
            <div class="more-pr-by-ajax"></div>
            <div class="pp-nav">
                <a href="javascript:;" data-tcls="alm-single" class="_ilmPaging noRoute">View More <i class="fa fa-angle-down"></i></a>
            </div>
        </div>
    <?php endif; ?>

</div>