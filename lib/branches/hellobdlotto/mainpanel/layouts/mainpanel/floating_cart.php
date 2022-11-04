<?php

use _ilmComm\Core\LocalStorage\Session;
use _ilmComm\Products\ProductInfo\SingleProduct;

?>

<?php $this->extend('mainpanel.floating_cart'); ?>

<?php
if (!Session::get('_pop_top_ads_shown')) :
    Session::set('_pop_top_ads_shown', microtime(true));

    // Get all lottery data
    $lottery = $this->extModel('Home')->getSliders(6)->toArray();

    // Yesterday draw
    $yesterdayDraw = array_filter($lottery, function ($val) {
        $lastDate = date('Y-m-d', strtotime('-1day'));
        $drawDate = date('Y-m-d', strtotime($val['image_text1']));
        return strtotime($drawDate) == strtotime($lastDate);
    });

    if ($yesterdayDraw) :
        // Yesterday draw data found
        // Get yeaterday draw data
        $yesterdayDrawData = current($yesterdayDraw);

        // Get product id
        $productId = $yesterdayDrawData['image_text2'];

        // Build yesterday draw proudct info
        $sp = new SingleProduct;
        $sp->setProductId($productId);
        $sp->buildInfo();
        $sp->buildPriceAndStock();
?>
        <div class="modal" id="top-ads-pop">
            <div class="vertical-alignment-helper">
                <div class="modal-dialog vertical-align-center" style="background-color:rgba(0, 0, 0, .5)">
                    <div class="modal-content">
                        <div class="modal-body" style="padding: 0">
                            <div class="top-ads-pop-close">
                                <span data-dismiss="modal">X</span>
                            </div>
                            <div class="top-ads-pop-content">
                                <div class="top-ads-pop-img">
                                    <img src="<?php echo asset('images/slider/lottery-slide-2.jpg') ?>" alt="Lottery img"
                                         style="width:100%" />
                                </div>
                                <div class="top-ads-popc-floating-text">
                                    <div class="top-ads-popc-ftext-img">
                                        <img src="<?php echo asset($sp->getThumbnail()) ?>" alt="Product image">
                                    </div>
                                    <div class="top-ads-popc-ftext-text">
                                        <div class="top-ads-popc-ftext-title title1"><?php echo $sp->getProductName() ?></div>
                                        <div class="top-ads-popc-ftext-title">Brand: <?php echo $sp->getBrandName() ?></div>
                                        <div class="top-ads-popc-ftext-title">Price: <?php echo $sp->getPrice() ?></div>
                                    </div>
                                </div>
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
            z-index: 1;
        }

        .top-ads-pop-close span {
            background: rgba(0, 0, 0, .3);
            width: 30px;
            height: 30px;
            display: block;
            text-align: center;
            line-height: 30px;
            color: #ccc;
            border: 1px solid #888;
            cursor: pointer;
        }

        .top-ads-popc-floating-text {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 50%;
            text-align: center;
            color: #fff;
        }

        .top-ads-popc-ftext-img {
            position: relative;
            width: 100%;
            border-radius: 50%;
            padding: 50%;
            margin-bottom: 10px;
            overflow: hidden;
        }

        .top-ads-popc-ftext-img img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
        }

        .top-ads-popc-ftext-title {
            font-size: 18px;
        }

        .top-ads-popc-ftext-title.title1 {
            font-weight: bold;
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
<?php endif; ?>
