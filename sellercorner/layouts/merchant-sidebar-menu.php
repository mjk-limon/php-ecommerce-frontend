<?php

namespace _ilmComm;

?>

<ul class="nav" id="side-menu">
    <li>
        <a class="nav-link" href="<?php echo Models::baseUrl('sellercorner/home/') ?>">
            <i class="fa fa-home menu-icons"></i>
            Dashboard
        </a>
    </li>
    <li>
        <a class="nav-link" href="#menu-products" data-toggle="collapse">
            <i class="fa fa-cubes menu-icons"></i>
            Product Management <span class="caret"></span>
        </a>
        <ul id="menu-products" class="collapse">
            <li class="nav-item">
                <a href="<?php echo Models::baseUrl('sellercorner/new-deal/') ?>" class="nav-link">
                    <i class="fa fa fa-angle-right"></i> Add Product
                </a>
            </li>
            <li class="nav-item">
                <a href="<?php echo Models::baseUrl('sellercorner/deals/') ?>" class="nav-link">
                    <i class="fa fa fa-angle-right"></i> All Product
                </a>
            </li>
        </ul>
    </li>
    <li>
        <a href="<?php echo Models::baseUrl('sellercorner/orders/') ?>">
            <i class="fa fa-paper-plane-o menu-icons"></i>
            Order Management
        </a>
    </li>
    <li>
        <a href="<?php echo Models::baseUrl('sellercorner/payments/') ?>">
            <i class="fa fa-money menu-icons"></i>
            Payments
        </a>
    </li>
    <li>
        <a href="<?php echo Models::baseUrl('sellercorner/user-account/') ?>">
            <i class="fa fa-user menu-icons"></i>
            My Profile
        </a>
    </li>
</ul>
