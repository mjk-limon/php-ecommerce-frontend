<section class="main-body">
    <?php $this->layout('product_browse.category_slider'); ?>

    <div class="container">
        <?php if ($this->TotalProduct) : ?>
            <div class="row">

                <?php !$this->mobileView && $this->layout('product_browse.filters') ?>
                <?php $this->layout('product_browse.products') ?>

            </div>
        <?php else : ?>

            <?php $this->layout('product_browse.no_product') ?>

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

    <div class="modal right pr-filter-modal fade" id="mb-filter-modal" role="dialogue" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row filters-holder">
                        <?php $this->layout('product_browse.filters') ?>
                    </div>

                    <a class="mb-ff-navs" href="javascript:;" data-dismiss="modal">Apply Filters</a>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>

<script defer src="<?php echo asset("assets/_ilm_own/js/productPage_scripts.js") ?>"></script>
