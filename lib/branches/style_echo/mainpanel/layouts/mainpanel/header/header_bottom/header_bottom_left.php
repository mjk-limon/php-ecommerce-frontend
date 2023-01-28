<?php if (!$this->mobileView) : ?>

    <div class="col-md-12" id="all-dept-btn">
        <div class="manue mainmenu cacaallpaje">
            <ul class="nav navbar-nav">

                <?php $this->layout('category_lists') ?>

                <li><a href="/page/about-us/">About Us</a></li>
                <li><a href="/contact/">Support</a></li>

            </ul>
        </div>
    </div>
<?php else : ?>
    <div class="col-xs-12">
        <div class="serachbox">
            <form action="<?php echo PROJECT_FOLDER . 'search/' ?>" method="get">
                <div class="searchfld deskv">
                    <input type="text" placeholder="Search for Proudcts, Brands..." name="q" autocomplete="off" class="input-text search-q" />
                    <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
                    <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                </div>
            </form>
        </div>
    </div>
<?php endif; ?>
