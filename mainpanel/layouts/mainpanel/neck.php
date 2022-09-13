<div id="skbc-top-margin"></div>

<?php if ($this->mobileView) : ?>
    <div class="mb-top-search">
        <div class="search-area">
            <form method="GET" action="<?php echo PROJECT_FOLDER . 'search/' ?>">
                <div class="m-flex">
                    <a href="javascript:;" class="tclose-icon tsearch-icon"><i class="fa fa-arrow-left"></i></a>
                    <input type="text" class="search-q" name="q" placeholder="Type product id, name, category..." />
                    <button type="submit" class="tsearch-btn"><i class="fa fa-search"></i></button>
                </div>
            </form>
        </div>
        <div class="mb-ts-backdrop srch-datalist" id="search-suggestions"></div>
    </div>

    <section id="skmbcategories" style="display:none">
        <div class="mainmenu">
            <ul class="nav navbar-nav">
                <?php $this->layout("category_list"); ?>
            </ul>
        </div>
    </section>

    <section id="skmbcart" class="mbl-tab-sc" style="display:none">
        <div class="sc-body">
            <div class="sc-body-top">
                <h4>Shopping Cart</h4>
                <span class="scb-ct"><?php echo $this->CartData->getTotalItem() ?> ITEM(S)</span>
            </div>
            <div id="fsc-content" class="fsc-content slimScroll"></div>
        </div>
    </section>
<?php endif; ?>
