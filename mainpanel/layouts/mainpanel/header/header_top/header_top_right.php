<div class="col-md-6 col-sm-12">
    <div class="header-right">
        <ul class="list-unstyled list-inline">
            <?php if ($this->UserData) : ?>
                <li class="dropdown">
                    <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">
                        <span class="key"><i class="fa fa-user"></i> My Account</span><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/my-account/">Update Account</a></li>
                        <li><a href="/my-account/?c=90.02">My Wishlists</a></li>
                        <li><a href="/my-account/?c=90.03">Order History</a></li>
                        <li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?php echo urlencode($this->HeadData['ref']) ?>">Logout</a></li>
                    </ul>
                </li>
            <?php endif; ?>

            <li class="dropdown dropdown-small">
                <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="#">
                    <span class="key"><?php echo $this->Language ?></span><b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="?lang=en">English</a></li>
                    <li><a href="?lang=bn">বাংলা</a></li>
                </ul>
            </li>
            <li class="dropdown dropdown-small">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                    <span class="key"><?php echo curr(); ?></span><b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li id="cur_BDT"><a href="<?php echo base_url('?cur=BDT') ?>">BDT</a></li>
                    <li id="cur_USD"><a href="<?php echo base_url('?cur=USD') ?>">USD</a></li>
                    <li id="cur_INR"><a href="<?php echo base_url('?cur=INR') ?>">INR</a></li>
                    <li id="cur_GBP"><a href="<?php echo base_url('?cur=GBP') ?>">GBP</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>
