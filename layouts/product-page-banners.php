<?php 

namespace _ilmComm;

?>

<?php if (file_exists($this->CatImages[0])) : ?>
    <div class="product-page-banner-area">
        <div id="myCarousel" class="carousel slide product-page-carousel" data-ride="carousel">
            <div class="carousel-inner">
                <div class="item active">
                    <div class="ppc-single-slide">
                        <div class="ppc-single-background" style="background-image: url('<?php echo Models::asset($this->CatImages[0]) ?>);"></div>
                        <div class="ppc-single-image">
                            <img data-src="<?php echo Models::asset($this->CatImages[0]) ?>">
                        </div>
                    </div>
                </div>

                <?php if (file_exists($this->CatImages[1])) : ?>
                    <div class="item">
                        <div class="ppc-single-slide">
                            <div class="ppc-single-background" style="background-image: url('<?php echo Models::asset($this->CatImages[1]) ?>);"></div>
                            <div class="ppc-single-image">
                                <img data-src="<?php echo Models::asset($this->CatImages[1]) ?>">
                            </div>
                        </div>
                    </div>
                <?php endif; ?>

                <?php if (file_exists($this->CatImages[2])) : ?>
                    <div class="item">
                        <div class="ppc-single-slide">
                            <div class="ppc-single-background" style="background-image: url('<?php echo Models::asset($this->CatImages[2]) ?>);"></div>
                            <div class="ppc-single-image">
                                <img data-src="<?php echo Models::asset($this->CatImages[2]) ?>">
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
<?php endif; ?>

<?php if ($this->PrsTypeInfo['t'] == 'campaign'): ?>
    
<?php endif; ?>