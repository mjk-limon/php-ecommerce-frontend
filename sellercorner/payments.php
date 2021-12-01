<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-money"></i> Your Payments</h2>
        <div class="row">
            <div class="col-md-12">
                <?php
                $result_odr = $this->extModel("Sellercorner\\Orders")->getOrders();
                if ($result_odr->num_rows > 0) {
                ?>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tr>
                                <th class="col-md-2">#</th>
                                <th class="col-md-2">Order No.</th>
                                <th class="col-md-4">Order Status</th>
                                <th class="col-md-4">Payment Status</th>
                            </tr>
                            <?php
                            $sl_i = 1;
                            while ($odrInfo = $result_odr->fetch_array()) {
                                //$cOdrInfo = get_single_data("p_order", "order_no = '{$odrInfo['p_odr_no']}'");
                                $ModrStatus = ($odrInfo['status'] == 1) ? "processed" : "delivered";
                                //$ModrStatusDate = ($odrInfo['status'] == 1) ? $odrInfo['processed_on'] : $odrInfo['delivered_on'];
                                //$cOdrStatus = switch_status($cOdrInfo['admin_read'], 'orders', 'text');
                            ?>
                                <tr class="poot" data-href="<?= $odrInfo['id'] ?>/">
                                    <td><?= $sl_i ?></td>
                                    <td><?= $odrInfo['order_no'] ?></td>
                                    <td>
                                        <p>
                                            You <?= $ModrStatus ?> products on <?= date("j M, Y (H:iA)", strtotime("2021-10-12")) ?>
                                        </p>
                                        <p>
                                            <?= COMPANY_NAME ?> status:
                                            <span class="label label-info">
                                                Delivered
                                            </span>
                                        </p>
                                    </td>
                                    <td class="td-actions text-danger">
                                        Delivered
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
