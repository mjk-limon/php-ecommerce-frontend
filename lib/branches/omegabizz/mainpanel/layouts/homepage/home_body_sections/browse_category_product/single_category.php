<div class="bc-single">
    <div class="bc-cat-all">
        <a href="<?php echo $Cat->getCategoryLink() ?>">View All</a>
        <span class="bc-cat-name"><?php echo htmlspecialchars($Cat->getMain()) ?></span>
    </div>

    <div class="grid-row">
        <div class="grids large-grid onlycolspan">
            <div class="prgrid-ads-section">
                <a href="<?php echo $Cat->getCategoryLink() ?>" class="prgrid-ad-img"
                   style="background-image:url('<?php echo asset(current($Cat->getCategoryImage('Homepage category sample'))) ?>')"></a>
            </div>
        </div>

        <?php while ($TrPr = $BrowseCatProducts->fetch_assoc()) : ?>
            <div class="grids">
                <div class="bc-products">
                    <?php $this->layout('global.single_product', ['sp' => $this->SingleProduct, 'pr_info' => $TrPr]); ?>
                </div>
            </div>
        <?php endwhile; ?>

    </div>
</div>
