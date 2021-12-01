<?php 

namespace _ilmComm;

?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header">
            <i class="fa fa-paper-plane"></i>
            Order Management
        </h2>
        <div class="row">
            <div class="col-md-12">

                <?php if ($this->Orders->num_rows > 0) { ?>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tr>
                                <th class="col-md-2">#</th>
                                <th class="col-md-4">Products</th>
                                <th class="col-md-2">Ordered On</th>
                                <th class="col-md-2">Status</th>
                            </tr>

                            <?php
                            while ($odrInfo = $this->Orders->fetch_array()) {
                                $this->So->setOrderInfo($odrInfo);
                            ?>
                                <tr class="poot" data-href="<?php echo $this->So->getOrderId() ?>/">
                                    <td>
                                        <?php echo $this->So->getOrderId() ?>
                                    </td>
                                    <td>

                                        <?php
                                        foreach ($this->So->getOrderedProducts() as $OdrPrArr) {
                                            $this->Sp->setPrid($OdrPrArr['p']);
                                        ?>
                                            <p class="mb-0">
                                                <strong><?php echo $this->Sp->getName() ?></strong> - <?php echo $OdrPrArr['q'] ?> Unit<br />
                                                <span class="text-muted"><?php echo "(Size: " . $OdrPrArr['s'] . ", Color: " . $OdrPrArr['c'] . ")" ?></span>
                                            </p>
                                        <?php } ?>

                                    </td>
                                    <td><?php echo date("j M, Y (H:iA)", strtotime($this->So->getOrderDate())) ?></td>
                                    <td class="td-actions odr">
                                        <span class="label label-default">
                                            <?php echo $this->So->writeOrderStatus() ?>
                                        </span>

                                        <?php if (false) { ?>
                                            <a href="<?php echo $self_url ?>?oisdon&z=<?php echo urlencode(base64_encode($mOdrInfo['id'])) ?>">
                                                Mark as Proccessed !
                                            </a>
                                        <?php } ?>
                                    </td>
                                </tr>
                            <?php } ?>

                        </table>
                    </div>
                <?php } else { ?>
                    <div class="alert alert-danger">
                        You have no product order yet !<br />
                    </div>
                <?php } ?>

            </div>
        </div>
    </div>
</div>
