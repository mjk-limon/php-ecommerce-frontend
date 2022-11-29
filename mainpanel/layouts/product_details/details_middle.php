<div class="spd">
    <div class="container">
        <div class="section-mb details-page-bottom">
            <h4 class="discription-review-title">
                <span><a href="javascript:;" data-target="#pr-dis" data-toggle="DRtab" class="active true">Product Full Description</a></span>
                <span>|</span>
                <span><a href="javascript:;" id="DRRvwBtn" data-target="#pr-rvw" class="true" data-toggle="DRtab">Ratings &amp; Reviews</a></span>
            </h4>

            <div class="discription-review-body">
                <div id="pr-dis">
                    <?php echo $this->ProductDetails->getDescription(); ?>
                </div>
                <div id="pr-rvw" style="display:none">
                    <?php $this->layout('product_details.details_middle.reviews'); ?>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="spd">
    <div class="container">
        <div class="row">
            <?php if (get_site_settings('qtpr')) : ?>
                <div class="col-md-8">
                    <?php $this->layout('product_details.details_middle.questions'); ?>
                </div>
            <?php endif; ?>

            <div class="col-md-4">
                <?php $this->layout('product_details.details_middle.merchant_info'); ?>
            </div>
        </div>
    </div>
</div>