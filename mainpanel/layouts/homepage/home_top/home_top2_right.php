<div class="col-md-9 col-xs-12">
    <div class="trending-categories">
        <div class="tc-list slimScroll">
            <div class="tc-single">
                <h2>Top Ranking</h2>
                <h4>Categories</h4>
            </div>

            <?php while ($tc = $this->TrendCategories->fetch()) : ?>
                <div class="tc-single">
                    <a href="<?php echo $tc->getCategoryLink() ?>">
                        <div class="tc-single-img"
                             style="background-image:url('<?php echo current($tc->getCategoryImage('Top ranking category icon')) ?>')"></div>
                        <div class="tc-single-title"><?php echo htmlspecialchars($tc->getMain()) ?></div>
                    </a>
                </div>
            <?php endwhile; ?>

        </div>
    </div>
</div>
