<?php

// Get user order history
$OrderHistory = $this->UserData->getOrderHistory();
?>

<?php if ($OrderHistory->num_rows) : ?>
    <div class="order-history">
        <h3>My Order History</h3>

        <?php
        while ($ROH = $OrderHistory->fetch_assoc()) :
            $OdrInfo->setOrderId($ROH['order_no']);
        ?>
            <div class="tlist-single">
                <div class="orderHistory-title">
                    <h5>Order No: #<?php echo $OdrInfo->getOrderId() ?></h5>
                    <p>Ordering Date: <?php echo date("F j, Y", strtotime($OdrInfo->getOrderDate())) ?></p>
                    <p>
                        Status: <span class="label label-info"><?php echo $OdrInfo->writeOrderStatus() ?></span>

                        <?php if ($OdrInfo->getOrderStatus() == '1') : ?>
                            <a href="?update=1&id=<?php echo $OdrInfo->getOrderId() ?>&value=3">Cancel Order</a>
                        <?php elseif ($OdrInfo->getOrderStatus() == '5') : ?>
                            <a href="?update=1&id=<?php echo $OdrInfo->getOrderId() ?>&value=0">Order Again</a>
                        <?php endif; ?>

                    </p>
                </div>

                <table class="table orderHistory-table">
                    <thead>
                        <tr class="info">
                            <th>Product Info</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php
                        $OdrPrs = $OdrInfo->getOrderedProducts();
                        foreach ($OdrPrs as $Prs) :
                            $PrInfo->setPrid($Prs['p']);

                            if (!$PrInfo->checkProduct()) {
                                continue;
                            }

                            $PrInfo->buildProductDiscount($Prs['q']);
                            $PrInfo->processStock($Prs['s'], $Prs['c']);
                        ?>
                            <tr>
                                <td class="tlist-fullinfo">
                                    <div class="tl-img" style="--tlwdth:60px;background-image: url('<?php echo $PrInfo->getThumbnail() ?>')"></div>
                                    <div class="tl-area" style="--tlwdth:60px">
                                        <?php echo $PrInfo->getProductName() ?>
                                        <div class="tl-data">
                                            Size: <?php echo $Prs['s'] ?: 'N/a' ?>,
                                            Color: <?php echo $Prs['c'] ?: 'N/a' ?>
                                        </div>
                                    </div>
                                </td>
                                <td><?php echo $Prs['q'] ?></td>
                                <td><?php echo curr($PrInfo->getPrice($PrInfo->getDiscount())) ?></td>
                                <td><a href="<?php echo $PrInfo->getProductLink() ?>">Details</a></td>
                            </tr>
                        <?php endforeach; ?>

                    </tbody>
                </table>
            </div>
        <?php endwhile; ?>

    </div>
<?php else : ?>
    <div class="no-products">
        <h4> Order History Is Empty ! </h4>
        <ul>
            <li>You have no product in your order history </li>
            <li>Please go back. And order first</li>
            <li>For any help, Please contact our help center</li>
        </ul>
    </div>
<?php
endif;
$OrderHistory->free();
?>