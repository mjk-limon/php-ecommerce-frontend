<div class="sticky-wrapper">
    <div class="mainmenu-area1">
        <div class="container">
            <div class="row deskv-hb">
                <?php if (!$this->mobileView) : ?>
                    <?php $this->layout('mainpanel.header.header_bottom.header_bottom_left'); ?>
                    <?php $this->layout('mainpanel.header.header_bottom.header_bottom_middle'); ?>
                    <?php $this->layout('mainpanel.header.header_bottom.header_bottom_right'); ?>
                <?php else : ?>
                    <div class="col-xs-12">
                        <div class="serachbox">
                            <form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
                                <div class="searchfld deskv">
                                    <input type="text" placeholder="Search for Proudcts, Brands..." name="q" autocomplete="off" class="input-text search-q" />
                                    <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
                                    <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
