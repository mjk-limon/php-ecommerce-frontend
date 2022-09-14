<div class="clearfix tt-total-pr">
    <div class="toolbar-sorter pull-right hidden-xs">
        <input type="hidden" id="sortVal" name="fpCbox" name="sort" value="" />
        <label class="sorter-label">Sort By:</label>
        <div class="sort-options _desV">
            <li class="active"><a href="javascript:;" data-sv="1">Popular</a></li>
            <li><a href="javascript:;" data-sv="2">New</a></li>
            <li>
                Price
                <div class="hover-drop-panel">
                    <a href="javascript:;" data-sv="3">Low to high</a>
                    <a href="javascript:;" data-sv="4">High to low</a>
                </div>
            </li>
            <li>
                Discount
                <div class="hover-drop-panel">
                    <a href="javascript:;" data-sv="5">Low to high</a>
                    <a href="javascript:;" data-sv="6">High to low</a>
                </div>
            </li>
        </div>
    </div>
    Total <?php echo $this->TotalProduct ?> Products Found.
</div>
