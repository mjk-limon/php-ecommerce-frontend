<?php 

namespace _ilmComm;

$OdrModel = $this->extModel("Sellercorner\\Orders");
$So = $OdrModel->singleOrder();
$Sp = $OdrModel->singleProduct();
$MerOdrs = $OdrModel->getOrders();
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-money"></i> Your Payments</h2>
        <div class="row">
            <div class="col-md-12">
                <?php
                if ($MerOdrs->num_rows > 0) {
                ?>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tr>
                                <th class="col-md-2">#</th>
                                <th class="col-md-3">Order No.</th>
                                <th class="col-md-5">Order Status</th>
                                <th class="col-md-2">Payment Status</th>
                            </tr>
                            <?php
                            $sl_i = 1;
                            while ($odrInfo = $MerOdrs->fetch_array()) {
                                $So->setOrderInfo($odrInfo);

                                if (!in_array($So->getMerchantOrderStatus(), [2, 3])) {
                                    continue;
                                }

                                $M_Odr_Sts = $So->writeMerchantOrderStatus();
                                $M_Pmnt_Sts = $So->writeMerchantPaymentStatus();
                            ?>
                                <tr class="poot" data-href="<?php echo $So->getOrderId() ?>/">
                                    <td><?php echo $sl_i ?></td>
                                    <td><?php echo $So->getOrderId() ?></td>
                                    <td>
                                        <p>
                                            You <?php echo $M_Odr_Sts[2] ?> products on <?php echo date("j M, Y (h:iA)", strtotime($M_Odr_Sts[3])) ?>
                                        </p>
                                        <p>
                                            <?php echo COMPANY_NAME ?> status:
                                            <span class="text-info">
                                                <?php echo $So->writeOrderStatus() ?>
                                            </span>
                                        </p>
                                    </td>
                                    <td class="td-actions">
                                        <span class="label label-<?php echo $M_Pmnt_Sts[0] ?>">
                                            <?php echo $M_Pmnt_Sts[1] ?>
                                        </span>
                                    </td>
                                </tr>
                            <?php
                                $sl_i++;
                            }
                            ?>
                        </table>
                    </div>
                <?php } else { ?>
                    <div class="alert alert-danger">
                        You have no payment data yet !<br />
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
