<div class="site-branding-area">
    <div class="container">
        <div class="header_top_content_section">
            <div class="row flex branding-flex deskv-hm">

                <?php if (!$this->mobileView) : ?>
                    <div class="col-md-2 ht-right deskv-hm-movable">
                        <div class="logo">
                            <a href="/" id="home-btn">
                                <img src="<?php echo get_logo() ?>">
                            </a>
                        </div>
                    </div>
                    <div class="col-md-10 ht-right deskv-hm-movable">
                        <?php $this->layout("mainpanel.header.header_middle.header_middle_left"); ?>
                        <?php $this->layout("mainpanel.header.header_middle.header_middle_middle"); ?>
                        <?php $this->layout("mainpanel.header.header_middle.header_middle_right"); ?>

                        <div class="col-md-12" id="all-dept-btn">
                            <div class="manue mainmenu cacaallpaje">
                                <ul class="nav navbar-nav">

                                    <?php $this->layout('category_lists') ?>

                                    <li><a href="/page/about-us/">About Us</a></li>
                                    <li><a href="/contact/">Support</a></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                <?php else : ?>
                    <div class="col-xs-12 head-right-col_">
                        <ul class="ht-right">
                            <li>
                                <div class="ht-right-icon icon-toggle-sidemenu">
                                    <a href="javascript:;">
                                        <i class="pe-7s-keypad"></i>
                                    </a>
                                </div>
                            </li>
                            <li style="width:70%">
                                <div class="logo">
                                    <a href="/" id="home-btn">
                                        <img src="<?php echo get_logo() ?>">
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div class="ht-right-icon icon-shopping-bag">
                                    <a class="cart-contents sc-btn" href="javascript:;" title="View your shopping cart">
                                        <i class="pe-7s-shopbag"></i>
                                        <span class="count">0</span>
                                    </a>
                                </div>
                            </li>
                            <li class="dropdown ht-top-shortcut">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>
                                <ul class="dropdown-menu dropdown-menu-right animated slideDown">
                                    <li>
                                        <a href="javascript:;" onclick="$('#ht-currency').collapse('toggle');event.stopPropagation()">
                                            Currency <span class="caret"></span>
                                        </a>
                                        <ul class="collapse" id="ht-currency">
                                            <li id="cur_BDT"><a href="<?php echo base_url('?cur=BDT') ?>">BDT</a></li>
                                            <li id="cur_USD"><a href="<?php echo base_url('?cur=USD') ?>">USD</a></li>
                                            <li id="cur_INR"><a href="<?php echo base_url('?cur=INR') ?>">INR</a></li>
                                            <li id="cur_GBP"><a href="<?php echo base_url('?cur=GBP') ?>">GBP</a></li>
                                        </ul>
                                    </li>

                                    <?php if (!$this->UserData) : ?>
                                        <li><a class="_ph_RegBtn" href="/register/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Join free</a></li>
                                        <li><a class="_ph_LoginBtn" href="/login/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
                                    <?php else : ?>
                                        <li><a href="/my-account/?c=90.04">Notifications (<?php echo $this->NotificationBadge ?>)</a></li>
                                        <li><a href="/my-account/">Update Account</a></li>
                                        <li><a href="/my-account/?c=90.02">My Wishlists</a></li>
                                        <li><a href="/my-account/?c=90.03">Order History</a></li>
                                        <li><a class="_ph_LogoutBtn" href="/my-account/?logout=1&ref=<?php echo urlencode($this->HeadData['ref']) ?>">Sign Out</a></li>
                                    <?php endif; ?>

                                    <li><a href="/brands/">Brands</a></li>
                                    <li><a href="/track-order/">Track Order</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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

            </div>
        </div>
    </div>
</div>