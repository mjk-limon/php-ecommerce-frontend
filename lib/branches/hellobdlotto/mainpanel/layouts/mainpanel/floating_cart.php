<?php

use _ilmComm\Core\LocalStorage\Session;
?>

<?php $this->extend('mainpanel.floating_cart'); ?>

<?php if (!Session::get('_pop_top_ads_shown') && false) : ?>
    <div class="modal" id="top-ads-pop">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog vertical-align-center" style="background-color:rgba(0, 0, 0, .5)">
                <div class="modal-content">
                    <div class="modal-body" style="padding: 0">
                        <div class="top-ads-pop-close">
                            <span data-dismiss="modal">&times;</span>
                        </div>
                        <div class="top-ads-pop-img">
                            <img src="https://s3.amazonaws.com/cdn.powerball.com/drupal/files/2019-06/NC%20Charles%20W%20Jackson%20Jr%203.jpg" alt=""
                            style="width:100%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style type="text/css">
    .top-ads-pop-close {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .top-ads-pop-close span {
        background: rgba(0, 0, 0, .3);
        width: 30px;
        height: 30px;
        display: block;
        text-align: center;
        font-size: 25px;
        line-height: 28px;
        color: #ccc;
        border: 1px solid #888;
        cursor: pointer;
    }

    </style>

    <script type="text/javascript">
    $(document).ready(function() {
        setTimeout(() => {
            $('#top-ads-pop').modal('show');
        }, 1000);
    });
    </script>
<?php endif; ?>
