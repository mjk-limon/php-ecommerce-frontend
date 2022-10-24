<div class="ht-right-icon-pack ht-right-item">
    <div class="ht-right-icon icon-my-account">
        <a class="cb chp db" href="/my-account/"><i class="pe-7s-user"></i></a>
        <div class="header-floating-menu login-menu animated fadeInUp">
            <ul class="nav">
                
                <?php if (!$this->UserData) : ?>
                    <li><a href="/login/">Login/Registration</a></li>
                <?php else : ?>
                    <li><a href="/my-account/">Dashboard</a></li>
                    <li><a href="/my-account/?c=90.03">Order History</a></li>
                    <li><a href="/my-account/?c=90.02">Wishlists</a></li>
                    <li><a href="/my-account/?logout">Logout</a></li>
                <?php endif; ?>
                
            </ul>
        </div>
    </div>
    <div class="ht-right-icon icon-shopping-bag">
        <a class="cart-contents" href="/my-account/?c=90.04" title="Wishlists">
            <i class="pe-7s-bell"></i>
            <span class="count"><?php echo $this->NotificationBadge ?></span>
        </a>
    </div>
    <div class="ht-right-icon icon-shopping-bag">
        <a class="cart-contents sc-btn" href="javascript:;" title="View your shopping cart">
            <i class="pe-7s-shopbag"></i>
            <span class="count">0</span>
        </a>
    </div>
</div>
