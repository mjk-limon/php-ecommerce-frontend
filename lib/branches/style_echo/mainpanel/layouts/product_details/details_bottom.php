<div class="spd">
    <div class="container">
        <div class="section-mb">
            <div class="product-page-products" style="padding-left: 0;padding-right: 0;">
                <h4>CUSTOMER ALSO VIEWED</h4>
                <div class="grid-row grid5">

                    <?php
                    $Suggestions = $this->productSuggestion(true, 10);
                    while ($Rpr = $Suggestions->fetch_array()) :
                    ?>
                        <div class="grids">
                            <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $Rpr]); ?>
                        </div>
                    <?php endwhile; ?>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="spd">
    <div class="container">
        <div class="section-mb">
            <div class="product-page-products" style="padding-left: 0;padding-right: 0;">
                <h4>YOU MAY ALSO LIKE</h4>
                <div class="grid-row grid5">

                    <?php
                    $Suggestions = $this->productSuggestion(false, 10);
                    while ($Rpr = $Suggestions->fetch_array()) :
                    ?>
                        <div class="grids">
                            <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $Rpr]); ?>
                        </div>
                    <?php
                    endwhile;
                    $Suggestions->free();
                    ?>

                </div>
            </div>
        </div>
    </div>
</div>