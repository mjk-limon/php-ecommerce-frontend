<?php if (!$this->ProductDetails->getProductId()) : ?>
    <div class="row">
        <div class="col-xs-12">
            <div class="empty-product-page">
                <img src="<?php echo asset("images/pp-empty.png") ?>" alt="" />
                <h4>PRODUCT NOT FOUND</h4>
                <h4>INVALID PRODUCT ID OR PRODUCT MAY BE DELETED</h4>
            </div>
        </div>
    </div>
<?php
    return;
endif;
?>
