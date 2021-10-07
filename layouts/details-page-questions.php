<?php

namespace _ilmComm;

$Qus = $Rpls = $this->SingleQuestion;
$PrQuestions = $this->ProductQuestions;
?>

<?php
if ($PrQuestions->num_rows) :
    while ($Rqs = $PrQuestions->fetch_assoc()) :
        $Qus->setQusArr($Rqs);
        $Replies = $Qus->getReplies();
?>
        <div class="media">
            <div class="media-left"><i class="fa fa-question-circle-o fa-2x media-object"></i></div>
            <div class="media-body">
                <h4 class="media-heading"><?= $Qus->getContent() ?></h4>
                <p><?= $Qus->getName() ?> (<?= date('F j, Y', strtotime($Qus->getQuestionTime())) ?>)</p>

                <div class="qstn-reply-section">
                    <h5>Replies (<?= $Replies->num_rows ?>)</h5>
                    <div class="qstn-replies _nrp">
                        <div class="_nrt">

                            <?php
                            while ($Rqrs = $Replies->fetch_array()) :
                                $Rpls->setQusArr($Rqrs);
                            ?>
                                <div class="media">
                                    <div class="media-body">
                                        <h4 class="media-heading"><?= $Rpls->getContent() ?></h4>
                                        <p>
                                            <?php
                                            if ($Rpls->getEmail() == 'admin-panel') {
                                                echo '<i class="fa fa-shield"></i> ';
                                            }
                                            echo $Rpls->getName();
                                            ?>
                                            (<?= date('F j, Y', strtotime($Rpls->getQuestionTime())) ?>)
                                        </p>
                                    </div>
                                </div>
                            <?php endwhile; ?>

                        </div>

                        <?php if ($this->UserData) : ?>
                            <div class="new-qus-reply">
                                <form class="replyRvwForm" action="" method="post">
                                    <input type="hidden" name="name" value="<?= $this->UserData->getFullName() ?>" />
                                    <input type="hidden" name="email" value="<?= $this->UserData->getUserName() ?>" />
                                    <input type="hidden" name="qid" value="<?= $Qus->getQusId() ?>" />
                                    <input type="hidden" name="prid" value="<?= $this->Prid ?>" />
                                    <input type="hidden" name="reply_product_rvw" />
                                    <input type="hidden" name="rtp" value="qstn" />

                                    <div class="inline-form">
                                        <input type="text" name="message" placeholder="Write a reply..." required="">
                                        <button class=""><i class="fa fa-paper-plane-o"></i> Reply</button>
                                    </div>
                                </form>
                            </div>
                        <?php endif; ?>

                    </div>
                </div>
            </div>
        </div>
        <hr />
    <?php endwhile; ?>

    <div class="ilm-paging">
        <div class="more-pr-by-ajax"></div>
        <a href="javascript:;" data-tcls="alm-qstns" data-noqvar="true" class="_ilmPaging noRoute">Load more questions</a>
    </div>

<?php else : ?>
    <div class="media no-comment">
        <div class="media-body text-center">
            <p><i class="fa fa-meh-o fa-5x"></i></p>
            Sorry ! No Questions Found
        </div>
    </div>
<?php
endif;
$PrQuestions->free();
?>