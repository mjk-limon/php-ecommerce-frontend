<?php

namespace _ilmComm;

// Single review
$Rvw = $this->SingleReview;

// Get product reviews
$PrComments = $this->ProductReviews;
?>

<?php
if ($PrComments->num_rows) :
    while ($Cmnt = $PrComments->fetch_assoc()) :
        // Set review info
        $Rvw->setReviewInfo($Cmnt);
?>
        <div class="media">
            <div class="media-left">
                <img src="<?php echo asset($Rvw->getUserImage()) ?>" class="media-object">
            </div>
            <div class="media-body">
                <div class="clearfix">
                    <span class="pull-right"><?php echo date("F j, Y", strtotime($Rvw->getReviewTime())) ?></span>
                    <h4 class="media-heading"><?php echo $Rvw->getReviewerName() ?></h4>
                    <div class="media-rat"><span class="stars"><?php echo $Rvw->getRating() ?></span></div>
                </div>
                <p><?php echo $Rvw->getReviewContent() ?></p>
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
<?php endif; ?>
