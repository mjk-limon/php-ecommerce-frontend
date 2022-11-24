<?php if (!isset($this->onlyload) || $this->onlyload != "ppp-ws") : ?>

    <!--div class="serachbox product-page-filter-searchbox">
        <form action="<?php echo PROJECT_FOLDER . 'search/' ?>" method="get">
            <div class="searchfld deskv">
                <input type="text" placeholder="Search for Proudcts, Categories..." name="q" autocomplete="off" class="input-text search-q" />
                <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
            </div>
        </form>
    </div-->

    <div class="top-title">
        <div class="top-title-left">
            <h4><?php echo $this->PrsTitle ?></h4>

            <?php if ($this->Filters) : ?>
                <div class="tt-filter">
                    <?php
                    foreach ($this->Filters as $FKey => $FVal) :
                        $EFVal = explode("_-_", $FVal);
                    ?>
                        <div class="ttf-single">
                            <?php echo ucwords($FKey) . " : " . implode(", ", $EFVal) ?>
                            <span class="ttf-close" data-fkey="<?php echo $FKey ?>" data-fval="<?php echo $FVal ?>">&times;</span>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="tt-total-pr">
                <div class="tt-total-pr-label">Total <?php echo $this->TotalProduct ?> Products Found.</div>
                <div class="toolbar-sorter hidden-xs">
                    <input type="hidden" id="sortVal" name="fpCbox" name="sort" value="" />

                    <div class="sort-options _desV">
                        <select id="sortVal" name="fpCbox" name="sort" value="">
                            <option value="1">Default Sorting</option>
                            <option value="2">Sort By Popularity</option>
                            <option value="4">Sort By Average Rating</option>
                            <option value="5">Sort By Newness</option>
                            <option value="6">Sort By Price: Low to High</option>
                            <option value="7">Sort By Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>