<?php if (get_site_settings('qtpr')) : ?>
    <div class="col-md-8">
        <div class="section-mb details-page-bottom" id="Rating">
            <h4 class="discription-review-title">Product Questions</h4>
            <div class="discription-review-body">
                <div class="question-top _nrp">
                    <div id="rv-qus-area" class="_nrt">
                        <?php $this->layout('product_details.details_middle.questions.all_questions'); ?>
                    </div>
                    <div class="new-qus-reply">
                        <?php $this->layout('product_details.details_middle.questions.write_question'); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>
