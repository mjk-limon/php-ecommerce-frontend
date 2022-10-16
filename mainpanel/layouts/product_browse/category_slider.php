<?php if ($this->CatImages && file_exists($this->CatImages[0])) : ?>
    <div class="container">
        <div class="row" style="margin-bottom: 20px;">
            <div class="col-md-12">
                <div id="myCarousel" class="carousel slide product-page-carousel" data-ride="carousel">
                    <div class="carousel-inner">

                        <?php
                        $this->layout('product_browse.category_slider.single', ['i' => 0]);

                        if (file_exists($this->CatImages[1])) {
                            $this->layout('product_browse.category_slider.single', ['i' => 1]);
                        }
                        if (file_exists($this->CatImages[1])) {
                            $this->layout('product_browse.category_slider.single', ['i' => 1]);
                        }
                        ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>
