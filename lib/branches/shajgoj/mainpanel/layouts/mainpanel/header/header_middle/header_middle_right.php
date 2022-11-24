<div class="col-md-6 ht-right deskv-hm-movable">
    <div class="serachbox">
        <form action="<?= PROJECT_FOLDER . 'search/' ?>" method="get">
            <div class="searchfld deskv">
                <input type="text" placeholder="Search for Proudcts, Brands..." name="q" autocomplete="off" class="input-text search-q" />
                <button type="submit" class="subs"><i class="pe-7s-search subsi"></i></button>
                <div id="search-suggestions" class="srch-datalist slimScroll"></div>
            </div>
        </form>
    </div>
    <div class="ht-right-icon icon-my-account">
        <a class="cb chp db" href="/my-account/">
            <i class="pe-7s-user"></i>
            <span class="htricon-tag">User Account</span>
        </a>
        <div class="header-floating-menu login-menu animated fadeInUp">
            <ul class="nav">
                <?php if (!$this->UserData) : ?>
                    <li><a href="/login/">Login/Registration</a></li>
                <?php else : ?>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Order History</a></li>
                    <li><a href="">Wishlists</a></li>
                    <li><a href="">Logout</a></li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
    <div class="ht-right-icon icon-shopping-bag">
        <a class="cart-contents sc-btn" href="javascript:;" title="View your shopping cart">
            <i class="pe-7s-shopbag"></i>
            <span class="htricon-tag">Cart</span>
            <span class="count">0</span>
        </a>
    </div>
</div>