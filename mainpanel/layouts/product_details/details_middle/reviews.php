<div class="row">
    <?php if (get_site_settings('prat')) : ?>
        <div class="col-md-4 col-xs-12">
            <h4>Product Rating</h4>
            <?php $this->layout('product_details.details_middle.reviews.ratings'); ?>
        </div>
    <?php endif; ?>

    <div class="col-md-8 col-xs-12">
        <h4>Reviews</h4>
        <div class="user-review-section _nrp">
            <div id="rv-main-area" class="_nrt">
                <?php $this->layout('product_details.details_middle.reviews.all_reviews'); ?>
            </div>
            <div class="new-qus-reply">
                <?php $this->layout('product_details.details_middle.reviews.write_review'); ?>
            </div>
        </div>
    </div>
</div>
