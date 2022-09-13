<?php if (!$this->mobileView) : ?>
    <div class="col-md-3" id="all-dept-btn" style="padding-right:0px">
        <div class="manue dropdown mainmenu cacaallpaje">
            <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" href="javascript:;">
                <i class="fa fa-list-ul" aria-hidden="true"></i> ALL DEPARTMENTS
            </a>
            <ul class="nav navbar-nav dropdown-menu">

                <?php $this->layout("category_lists"); ?>

            </ul>
        </div>
    </div>
<?php else : ?>
    <div class="col-xs-4 m-hb-grid cntntTab active" data-target="#skmbcontent">
        <div class="m-hb-grid-menu">
            <i class="fa fa-th-large"></i> Main
        </div>
    </div>

    <div class="col-xs-4 m-hb-grid tb-2" data-target="#skmbcategories">
        <div class="m-hb-grid-menu">
            <i class="fa fa-th-list"></i> Categories
        </div>
    </div>

    <div class="col-xs-4 m-hb-grid tb-3" data-target="#skmbcart">
        <div class="m-hb-grid-menu sc-btn">
            <span id="fcTot" class="badge"><?php echo $this->CartData->getTotalItem() ?></span>
            <i class="fa fa-shopping-cart "></i> Cart
        </div>
    </div>
    <div class="tabbed-section__highlighter"></div>
<?php endif; ?>
