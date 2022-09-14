<div class="spd">
    <div class="container">
        <div class="section-mb">
            <div class="bc-title">
                <div class="bc-main-title">New Arrivals</div>
            </div>
            <div class="ft-pr-sliders">
                <div class="new-arrivals">
                    <div class="grid-row">

                        <?php
                        $St_i = 1;
                        $newArrivals = $this->newArrivals();
                        while ($NaPr = $newArrivals->fetch_assoc()) :
                        ?>
                            <div class="grids">
                                <div class="bc-products">
                                    <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $NaPr]); ?>
                                </div>
                            </div>
                            <?php $this->layout('homepage.home_body_sections.new_arrivals.ads', ['i' => $St_i]); ?>

                        <?php
                            $St_i++;
                        endwhile;
                        ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
