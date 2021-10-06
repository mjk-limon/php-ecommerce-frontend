<?php

namespace _ilmComm;

$Rvw = $this->SingleReview;
$PrComments = $this->ProductReviews;
if ($PrComments->num_rows) :
    while ($Cmnt = $PrComments->fetch_array()) :
        $Rvw->setRvArr($Cmnt);
?>
        <div class="media">
            <div class="media-left">
                <img src="<?= Models::baseUrl($Rvw->getUserImage()) ?>" class="media-object">
            </div>
            <div class="media-body">
                <div class="clearfix">
                    <h4 class="media-heading"><?= $Rvw->getName() ?></h4>
                    <span class="text-muted d-block">Reviewed on <?= date("F j, Y", strtotime($Rvw->getReviewTime())) ?></span>
                    <div class="media-rat"><span class="stars"><?= $Rvw->getRating() ?></span></div>
                </div>
                <p><?= $Rvw->getContent() ?></p>
            </div>
        </div>
        <hr />
    <?php endwhile; ?>

    <div class="ilm-paging">
        <div class="more-pr-by-ajax"></div>
        <a href="javascript:;" data-tcls="alm-cmnts" data-noqvar="true" class="_ilmPaging noRoute">Load more comments</a>
    </div>

<?php else : ?>
    <div class="media no-comment">
        <div class="media-body text-center">
            <p><i class="fa fa-meh-o fa-5x"></i></p>
            No Reviews Yet !
        </div>
    </div>
<?php
endif;
$PrComments->free();
?>