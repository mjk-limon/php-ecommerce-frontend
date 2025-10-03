<?php

namespace _ilmComm;

?>

<div class="row">
    <div class="col-md-12 deal-management">
        <div class="main-interface">
            <h2 class="page-header"><i class="fa fa-cubes"></i> Product Management</h2>
            <div class="row">

                <?php if (!isset($_GET['v'])) { ?>
                    <div class="col-md-12">

                        <?php if ($this->MerchantDeals->num_rows > 0) { ?>
                            <div class="table-responsive">
                                <p class="text-right">
                                    <a href="<?php echo Models::baseUrl('sellercorner/new-deal/') ?>" class="btn btn-success" type="button">
                                        <i class="fa fa-plus"></i> New Product
                                    </a>
                                </p>
                                <table class="table table-hover">
                                    <tr>
                                        <th class="col-md-2">#</th>
                                        <th class="col-md-8">Description</th>
                                        <th class="col-md-2">Action</th>
                                    </tr>

                                    <?php
                                    while ($PrArr = $this->MerchantDeals->fetch_array()) {
                                        $this->Sp->setProductInfo($PrArr);
                                        $this->Sp->buildPriceAndStock();
                                        $prStatus = ($this->Sp->getProductStatus() == '2') ? ' checked' : null;
                                    ?>
                                        <tr class="poot" data-href="<?php echo $this->Sp->getProductId() ?>/">
                                            <td>
                                                <img src="<?php echo $this->Sp->getThumbnail() ?>" class="img-thumbnail osh-order-image" />
                                            </td>
                                            <td>
                                                <a href="<?php echo Models::baseUrl('sellercorner/deals/?v=' . $this->Sp->getProductId()) ?>" class="table-link">
                                                    <h4><?php echo htmlspecialchars($this->Sp->getProductName()) ?></h4>
                                                    <p># <?php echo htmlspecialchars($this->Sp->getProductId()) ?></p>
                                                    <p><i class="fa fa-signal"></i> Item Left: <?php echo $this->Sp->getStock() ?></p>
                                                    <p><i class="fa fa-eye"></i> Views: <?php echo $this->Sp->getTotalViews() ?></p>
                                                </a>
                                            </td>
                                            <td class="td-actions">

                                                <?php if ($this->Sp->getProductStatus() != 1) { ?>
                                                    <div class="checkbox">
                                                        <label><input type="checkbox" data-id="<?php echo $this->Sp->getProductId() ?>" class="pr_status_switch" <?php echo $prStatus ?>></label>
                                                    </div>
                                                <?php } else { ?>
                                                    <p class="text-danger">Requires Admin Approval</p>
                                                <?php } ?>

                                                <p>
                                                    <a data-delete="true" href="<?php echo Models::baseUrl('sellercorner/deals/?delete=' . $this->Sp->getProductId()) ?>" class="text-danger">
                                                        <i class="fa fa-times"></i> Delete
                                                    </a>
                                                </p>
                                                <p>
                                                    <a href="<?php echo Models::baseUrl('sellercorner/edit-deal/?p=' . $this->Sp->getProductId()) ?>" class="text-info">
                                                        <i class="fa fa-pencil"></i> Edit
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                    <?php } ?>

                                </table>
                            </div>

                            <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
                            <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
                            <script defer src="<?php echo Models::asset("assets/merchant/dealPage_scripts.js") ?>"></script>
                        <?php } else { ?>
                            <div class="alert alert-danger">
                                No deal found !<br />
                                <a href="<?php echo Models::baseUrl("sellercorner/new-deal/") ?>">Upload New Product</a>
                            </div>
                        <?php } ?>

                    </div>
                <?php
                } else {
                    $Prid = $_GET['v'];
                    $this->Sp->setPrid($Prid);
                    $this->Sp->buildPriceAndStock();
                ?>
                    <div class="col-md-12">
                        <h4>Product Id #<?php echo sprintf('%06d', $Prid) ?></h4>
                        <div class="row">
                            <div class="col-md-3">
                                <img src="<?php echo $this->Sp->getThumbnail() ?>" class="img-responsive" />
                            </div>
                            <div class="col-md-9 product-info">
                                <p class="bg-danger pull-right navs">
                                    <a data-delete="true" href="<?php echo Models::baseUrl('sellercorner/deals/?delete=' . $Prid) ?>" class="text-danger">
                                        <i class="fa fa-times"></i> Delete
                                    </a>
                                </p>
                                <p class="bg-info pull-right navs">
                                    <a href="<?php echo Models::baseUrl('sellercorner/edit-deal/?p=' . $Prid) ?>" class="text-info">
                                        <i class="fa fa-pencil"></i> Edit
                                    </a>
                                </p>

                                <h4><?php echo $this->Sp->getProductName() ?></h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul class="list-group">
                                            <li class="list-group-item list-group-item-info">Category: <?php echo $this->Sp->getCategory("main") ?></li>
                                            <li class="list-group-item">Uploaded: <?php echo date('F j, Y', strtotime($this->Sp->getProductUploadedDate())) ?></li>
                                            <li class="list-group-item list-group-item-info">Item Price: <?php echo $this->Sp->getPrice() ?></li>
                                            <li class="list-group-item list-group-item-info">Brand: <?php echo $this->Sp->getBrandName() ?></li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <ul class="list-group">
                                            <li class="list-group-item list-group-item-success">Available Sizes: <?php echo implode(" ", $this->Sp->getSizes()) ?></li>
                                            <li class="list-group-item">Available Colors: <?php echo implode(" ", $this->Sp->getColors()) ?></li>
                                            <li class="list-group-item list-group-item-success">Item Left: <?php echo $this->Sp->getStock() ?></li>
                                            <li class="list-group-item">Total Views: <?php echo $this->Sp->getTotalViews() ?></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 description">
                                <?php echo $this->Sp->getDescription() ?>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 product-images">
                                <div class="dailysell">Product Images</div>
                                <div class="row">
                                    <?php foreach ($this->Sp->getAllPrImages() as $ColrName => $ColrImages) : ?>
                                        <?php foreach ($ColrImages as $Images) : ?>
                                            <div class="col-md-3 grids">
                                                <img src="<?php echo Models::asset($Images) ?>" class="img-thumbnail" />
                                            </div>
                                        <?php endforeach; ?>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php } ?>

            </div>
        </div>
    </div>
</div>
