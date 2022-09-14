<?php if (!$this->mobileView) : ?>
    <div class="header_top">
        <div class="container">
            <div class="row">
                <?php $this->layout("mainpanel.header.header_top.header_top_left"); ?>
                <?php $this->layout("mainpanel.header.header_top.header_top_middle"); ?>
                <?php $this->layout("mainpanel.header.header_top.header_top_right"); ?>
            </div>
        </div>
    </div>
<?php endif; ?>
