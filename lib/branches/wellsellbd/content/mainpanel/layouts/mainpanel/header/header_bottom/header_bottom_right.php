<?php if (!$this->mobileView) : ?>
    <div class="col-md-9 cols hidden-xs">
        <div class="mainmenu-area-quicklinks">
            <ul class="m-a-links">
                <li><a href="/">Home</a></li>
                <li><a href="/brands/">Brands</a></li>

                <?php if (adm_fet("_ilm_prd", "special_offer")) : ?>
                    <li><a href="/search/?q=&a_s_t=special_offer"><?php echo $this->HeaderOfferText ?></a></li>
                <?php else : ?>
                    <li><a href="/search/?q=&a_s_t=flash_sales"><?php echo $this->HeaderOfferText ?></a></li>
                <?php endif; ?>

                <li><a href="/track-order/">Track Order</a></li>

                <?php if (!$this->UserData) : ?>
                    <li><a class="_ph_RegBtn" href="/register/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Join free</a></li>
                    <li><a class="_ph_LoginBtn" href="/login/?ref=<?php echo urlencode($this->HeadData['ref']) ?>">Sign in</a></li>
                <?php else : ?>
                    <li><a href="/my-account/">User Account</a></li>
                <?php endif; ?>

                <li><a href="/contact/">Support</a></li>
            </ul>
        </div>
    </div>
<?php endif; ?>