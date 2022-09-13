<?php if (!$this->mobileView) : ?>
    <div class="col-md-9 deskv-hm-movable">
        <div class="row">
            <div class="col-md-9 hidden-xs">
                <div class="serachbox">
                    <form action="<?php echo PROJECT_FOLDER . 'search/' ?>" method="get">
                        <div class="searchfld deskv">
                            <input type="text" name="q" class="input-text search-q" placeholder="Search here" autocomplete="off" />
                            <button type="submit" class="subs"><i class="fa fa-search subsi"></i></button>
                            <div id="search-suggestions" class="srch-datalist slimScroll"></div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-3 hidden-xs">
                <ul class="wishlistall">
                    <li><a href="/my-account/?c=90.04" title="Notification"><i class="fa fa-bell"></i> <span class="badge"><?php echo $this->NotificationBadge ?></span></a></li>
                    <li><a href="/contact/" title="Support"><i class="fa fa-question-circle"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
<?php else : ?>
    <div class="col-xs-7 head-right-col_">
        <ul class="ht-right">
            <li>
                <input type="text" class="m-ht-search tsearch-icon" placeholder="Search for products" />
            </li>
            <li class="dropdown ht-top-shortcut">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a>
                <ul class="dropdown-menu dropdown-menu-right animated slideDown">
                    <li>
                        <a href="javascript:;" onclick="$('#ht-currency').collapse('toggle');event.stopPropagation()">
                            Currency
                            <span class="caret"></span>
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
<?php endif; ?>
