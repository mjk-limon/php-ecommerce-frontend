<?php

namespace _ilmComm;

$Prs = $this->AllProducts;
?>

<section class="main-body">
    <div class="container">
        <?php if (file_exists($this->CatImages[0])) : ?>
            <div class="row" style="margin-bottom: 20px;">
                <div class="col-md-12">
                    <div id="myCarousel" class="carousel slide product-page-carousel" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="item active">
                                <div class="ppc-single-slide">
                                    <div class="ppc-single-background" style="background-image: url('<?php echo asset($this->CatImages[0]) ?>);"></div>
                                    <div class="ppc-single-image">
                                        <img data-src="<?php echo asset($this->CatImages[0]) ?>">
                                    </div>
                                </div>
                            </div>

                            <?php if (file_exists($this->CatImages[1])) : ?>
                                <div class="item">
                                    <div class="ppc-single-slide">
                                        <div class="ppc-single-background" style="background-image: url('<?php echo asset($this->CatImages[1]) ?>);"></div>
                                        <div class="ppc-single-image">
                                            <img data-src="<?php echo asset($this->CatImages[1]) ?>">
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>

                            <?php if (file_exists($this->CatImages[2])) : ?>
                                <div class="item">
                                    <div class="ppc-single-slide">
                                        <div class="ppc-single-background" style="background-image: url('<?php echo asset($this->CatImages[2]) ?>);"></div>
                                        <div class="ppc-single-image">
                                            <img data-src="<?php echo asset($this->CatImages[2]) ?>">
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <?php if ($this->TotalProduct) : ?>
            <div class="row">

                <?php if (!$this->mobileView) : ?>
                    <div class="col-md-2p5 col-md-3 product-filter-sidebar">
                        <?php include "layouts/product-page-filters.php" ?>
                    </div>
                <?php endif; ?>

                <div class="col-md-9p5 col-md-9 product-main-panel">
                    <div class="section-mb features_items">
                        <div id="pp-main-area" class="v3">
                            <?php include "layouts/product-page-products.php" ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php else : ?>
            <div class="row">
                <div class="col-md-12">
                    <div class="empty-product-page">
                        <img src="<?php echo asset("assets/images/pp-empty.png") ?>" alt="" />
                        <h4>WE CAN'T SEEM TO FIND THE PRODUCT YOU ARE LOOKING FOR</h4>
                        <h4>PLEASE HAVE A LOOK OUR OTHER CATEGORIES</h4>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php if ($this->mobileView) : ?>
    <div class="mb-floating-filter-btns" id="pp-mbl-srt-area">
        <li>
            <a href="#mb-psort" data-toggle="collapse"><i class="fa fa-random"></i> Sort</a>
            <div id="mb-psort" class="collapse mb-psort-nav sort-options">
                <ul>
                    <li class="active"><a href="javascript:;" data-sv="1">Popular</a></li>
                    <li><a href="javascript:;" data-sv="2">New added</a></li>
                    <li><a href="javascript:;" data-sv="3">Price Low to High</a></li>
                    <li><a href="javascript:;" data-sv="4">Price High to Low</a></li>
                    <li><a href="javascript:;" data-sv="5">Discount Low to High</a></li>
                    <li><a href="javascript:;" data-sv="6">Discount High to Low</a></li>
                </ul>
            </div>
        </li>
        <li><a href="#mb-filter-modal" data-toggle="modal"><i class="fa fa-filter"></i> Filters</a></li>
    </div>

    <div class="modal right fade" id="mb-filter-modal" role="dialogue" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <?php
                    include "layouts/product-page-filters.php"
                    ?>

                    <a class="mb-ff-navs" href="javascript:;" data-dismiss="modal">Apply Filters</a>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>

<script defer src="<?php echo asset("assets/_ilm_own/js/productPage_scripts.js") ?>"></script>
