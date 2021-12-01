<?php
$mcInfo = get_single_data("marchants", "id='{$mcntInfo['id']}'");
/*== Merchant Essentials ==*/
$total_order = get_total_rows("m_order", "marchant_id = '{$mcntInfo['id']}'");
$total_new_od = get_total_rows("m_order", "marchant_id = '{$mcntInfo['id']}' AND status = '0'");
$total_prc_od = get_total_rows("m_order", "marchant_id = '{$mcntInfo['id']}' AND status = '1'");
$total_dlv_od = get_total_rows("m_order", "marchant_id = '{$mcntInfo['id']}' AND status = '2'");
$total_products = get_total_rows("products", "marchant_id='{$mcntInfo['id']}'");
/*== Merchant ratings ==*/
$prRatingSql = "SELECT SUM(SUBSTRING_INDEX(rating, '-', 1)) AS tRat FROM products ";
$prRatingSql .= "WHERE marchant_id='{$mcntInfo['id']}' ";
$rprRatingSql = $conn->query($prRatingSql)->fetch_array();
$total_ratProducts = get_total_rows("products", "marchant_id='{$mcntInfo['id']}' AND SUBSTRING_INDEX(rating, '-', 1) != '0'");
$total_prRating = ($total_ratProducts) ? round(($rprRatingSql['tRat'] / $total_ratProducts), 2) : 0;
//Delivery Speed
$mcnt_orders = get_some_data("m_order", "marchant_id = '{$mcntInfo['id']}'");
$tdelivery_rating = 0;
$total_delivery = 0;
$odr_date_array = array();
while ($mcnt_odrinfo = $mcnt_orders->fetch_array()) {
    $ordering_date = get_single_index_data("p_order", "order_no = '{$mcnt_odrinfo['p_odr_no']}'", "date");
    $processing_date = $mcnt_odrinfo['processed_on'];
    $hourdiff = round((strtotime($processing_date) - strtotime($ordering_date)) / 3600, 1);
    if ($hourdiff < 48 && $hourdiff > 0) {
        $tdelivery_rating += 5;
        $total_delivery++;
    } else {
        $delivery_over_hr = $hourdiff - 48;
        $tdelivery_rating += ($delivery_over_hr < 100) ? 5 - ($delivery_over_hr * .01) : 0;
        $total_delivery++;
    }
    $ordering_date = date("Y-m-d", strtotime($ordering_date));
    if (array_key_exists($ordering_date, $odr_date_array)) {
        $odr_date_array[$ordering_date]++;
    } else $odr_date_array[$ordering_date] = 1;
}
$total_delivery = $total_delivery ? $total_delivery : 1;
$delivery_rating = $tdelivery_rating / $total_delivery;
$mc_score = round((($delivery_rating * 20) + ($total_prRating * 20)) / 2, 1);
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-home"></i> Dashboard</h2>
        <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well in-c">
                        <span class="widget-number"><?= $total_new_od ?></span>
                        <span class="widget-footer">NEW ORDER</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well">
                        <span class="widget-number"><?= $total_prc_od ?></span>
                        <span class="widget-footer">PROCESSING</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well in-c">
                        <span class="widget-number"><?= $mc_score ?></span>
                        <span class="widget-footer">SCORE</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well in-c">
                        <span class="widget-number"><?= $total_dlv_od ?></span>
                        <span class="widget-footer">PAYMENT DUE</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-handshake-o fa-fw"></i>
                        Sales Feed
                    </div>
                    <div class="panel-body">
                        <div style="height:370px;max-width:100% margin:0px auto" id="sfd"></div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-eye fa-fw"></i>
                        At A Glance
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Unit</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Your Total Product</td>
                                                <td><?= $total_products ?></td>
                                            </tr>
                                            <tr>
                                                <td>Your Total Order</td>
                                                <td><?= $total_order ?></td>
                                            </tr>
                                            <tr>
                                                <td>Total Delivered Order</td>
                                                <td><?= $total_dlv_od ?></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-bar-chart-o fa-fw"></i>
                        Merchant Statistics
                    </div>
                    <div class="panel-body">
                        <div class="list-group">
                            <div class="list-group-item">
                                <p>Delivery Speed</p>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-info progress-bar-striped active"
                                         role="progressbar" style="width:<?= round($delivery_rating * 20) ?>%"><?= round($delivery_rating * 20) ?>%</div>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <p>Product Quality Rating</p>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped active"
                                         role="progressbar" style="width:<?= round($total_prRating * 20) ?>%"><?= round($total_prRating * 20) ?>%</div>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <p>Response Rate</p>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped active"
                                         role="progressbar" style="width:<?= round($total_prRating * 20) ?>%"><?= round($total_prRating * 20) ?>%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
<script type="text/javascript">
window.onload = function() {
    var options = {
        animationEnabled: true,
        title: {
            text: "Order by date"
        },
        axisX: {
            valueFormatString: "DD-MM"
        },
        axisY: {
            title: "Total",
            valueFormatString: "#0."
        },
        data: [{
            type: "area",
            markerSize: 5,
            dataPoints: [
                <?php foreach ($odr_date_array as $date => $todr) { ?> {
                        x: new Date("<?= $date ?>"),
                        y: <?= $todr ?>
                    },
                <?php } ?>
            ]
        }]
    };
    $("#sfd").CanvasJSChart(options);
}
</script>