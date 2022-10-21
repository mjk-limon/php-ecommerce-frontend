<div class="product-page-products">
    <div class="grid-row grid3">
        <?php foreach ($this->AllProducts as $Product) : ?>
            <div class="grids">
                <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $Product]); ?>
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