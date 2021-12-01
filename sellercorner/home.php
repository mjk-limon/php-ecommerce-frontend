<?php

namespace _ilmComm;

$OverallScore = round(($this->DeliverySpeed + $this->TotalRatings + $this->ResponseRate) / 3, 2);
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-home"></i> Dashboard</h2>
        <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well in-c">
                        <span class="widget-number"><?php echo $this->TotalUnseen ?></span>
                        <span class="widget-footer">NEW ORDER</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well">
                        <span class="widget-number"><?php echo $this->TotalProcessed ?></span>
                        <span class="widget-footer">PROCESSING</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well in-c">
                        <span class="widget-number"><?php echo $OverallScore ?></span>
                        <span class="widget-footer">SCORE</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 dashboard-widget">
                    <div class="well">
                        <span class="widget-number"><?php echo 0 ?></span>
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
                        <div style="height:370px;max-width:100%;margin:0px auto" id="sfd"></div>
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
                                                <td><?php echo $this->TotalProducts ?></td>
                                            </tr>
                                            <tr>
                                                <td>Your Total Order</td>
                                                <td><?php echo $this->TotalOrder ?></td>
                                            </tr>
                                            <tr>
                                                <td>Total Delivered Order</td>
                                                <td><?php echo $this->TotalDelivered ?></td>
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
                                         role="progressbar" style="width:<?php echo $this->DeliverySpeed ?>%">
                                        <?php echo $this->DeliverySpeed ?>%
                                    </div>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <p>Product Quality Rating</p>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped active"
                                         role="progressbar" style="width:<?php echo $this->TotalRatings ?>%">
                                        <?php echo $this->TotalRatings ?>%
                                    </div>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <p>Response Rate</p>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped active"
                                         role="progressbar" style="width:<?php echo $this->ResponseRate ?>%">
                                        <?php echo $this->ResponseRate ?>%
                                    </div>
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
                <?php foreach ($this->OrderByDate as $OdrDate => $OdrQty) { ?> {
                        x: new Date("<?php echo $OdrDate ?>"),
                        y: <?php echo $OdrQty ?>
                    },
                <?php } ?>
            ]
        }]
    };
    $("#sfd").CanvasJSChart(options);
}
</script>
