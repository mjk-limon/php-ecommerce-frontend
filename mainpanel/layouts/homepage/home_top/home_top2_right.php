<div class="col-md-9 col-xs-12">
    <div class="trending-categories">
        <div class="tc-list slimScroll">
            <div class="tc-single">
                <h2>Top Ranking</h2>
                <h4>Categories</h4>
            </div>

            <?php
            $TrCat = $this->TrendCategories;
            $TcRes = $TrCat->fetchTrending();

            while ($TC = $TcRes->fetch_array()) :
                $TrCat->setCatId($TC['id']);
                $TrCat->setMain($TC['main']);

                $CatLink = $TrCat->getHref();
                $CatImg = $TrCat->getCatImg('Top ranking category icon')[0];
            ?>
                <div class="tc-single">
                    <a href="<?php echo $CatLink ?>">
                        <div class="tc-single-img" style="background-image:url('<?php echo $CatImg ?>')"></div>
                        <div class="tc-single-title"><?php echo htmlspecialchars($TC['main']) ?></div>
                    </a>
                </div>
            <?php endwhile; ?>

        </div>
    </div>
</div>
