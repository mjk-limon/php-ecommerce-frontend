<?php

namespace _ilmComm;

use _ilmComm\AdminApp\Basic\Models as AppModel;

$NewDealModel = $this->extModel("Sellercorner\\Newdeal");
$AlCats = $NewDealModel->getAllCategories();
$AddPrOthers = $NewDealModel->getAllPrsOthers();
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-pencil"></i> Edit Product Details</h2>
        <div class="row">
            <form action="" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="edit_product">
                <input type="hidden" name="pid" value="<?php echo $this->Prid ?>">

                <div class="col-md-12">
                    <div class="ptoggletab product-tab-1">
                        <div class="form-group">
                            <label>Product Name</label>
                            <input type="text" name="pr_name" class="form-control" value="<?php echo htmlspecialchars($this->Di->getName()) ?>" required />
                        </div>
                        <div class="form-group">
                            <label>Brand Name</label>
                            <input type="text" name="pr_brname" class="form-control" value="<?php echo htmlspecialchars($this->Di->getBrandName()) ?>" />
                        </div>
                        <div class="form-group">
                            <label>Product Description</label>
                            <textarea name="pr_dis" class="form-control" id="editor"><?php echo $this->Di->getDescription() ?></textarea>
                        </div>
                        <div class="form-group">
                            <label>Product Discount</label>
                            <div class="input-group input-group-sm">
                                <input class="form-control" name="pr_dicount" type="number" value="<?php echo $this->Di->getDiscount() ?>" min="0" max="100" required />
                                <span class="input-group-addon">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Available Sizes: </label>
                            <input type="text" class="form-control" name="pr_sizes" id="pr_sizes" data-role="tagsinput" value="<?php echo implode(',', $this->Di->getSizes()) ?>" />
                            <span class="form-helper">Available products sizes. Use comma (,) or Enter key for insert multiple value.</span>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group bmd-form-group is-filled">
                                    <label class="bmd-label-floating">Available Colors</label>
                                    <input type="text" class="form-control" name="pr_colors" id="pr_colors" value="<?php echo implode(',', $this->Di->getColors()) ?>" />
                                    <span class="bmd-help d-block position-relative">Available products color name. Press comma (,) or Enter key for insert multiple value.</span>
                                </div>
                            </div>
                        </div>

                        <a href="" class="btn btn-info dealdata-toggle-input" data-t="product-tab-2">Next</a>
                    </div>

                    <div class="ptoggletab product-tab-2" style="display: none;">
                        <div class="my-2" id="primg-area" style="margin:2rem 0;">
                            <div class="bg-light" style="background-color:#fcfcfc;">
                                <div class="form-group bmd-form-group">
                                    <div class="file-droper-area">
                                        <div class="colorPrimgDropers">
                                            <?php
                                            $Sp = $this->Di;
                                            $Prid = $this->Prid;
                                            $PrImages = $this->Di->getAllPrImages();
                                            foreach ($PrImages as $ColorName => $ColorImages) {
                                                $resColor = Models::restyleUrl($ColorName, true);
                                                $drpClass = $ColorName ? ' colored ' . $resColor : null;

                                                $background = str_replace(" ", ", ", $ColorName, $count);
                                                if ($count) $background = 'linear-gradient(45deg, ' . $background . ')';
                                                $colrPrev = (file_exists("../../proimg/{$Prid}/{$resColor}-texture.png") ?
                                                    "url('../../proimg/{$Prid}/{$resColor}-texture.png?rand=" . rand() . "') no-repeat center / 100% 100%" :
                                                    $background);
                                            ?>
                                                <div class="file-droper<?= $drpClass ?>" data-dcol="<?= $resColor ?>" data-tp="<?= "proimg/" . $Sp->getProductId() . "/" . $resColor ?>">

                                                    <div class="droper-label">

                                                        <?php if ($ColorName) { ?>
                                                            <div class="dlblg top"><span style="background:<?= $colrPrev ?>"></span> <?= $ColorName ?></div>
                                                            <div class="dlblg"><a href="">Use Texture</a></div>
                                                        <?php } else { ?>
                                                            <span>No Color</span>
                                                        <?php } ?>

                                                    </div>
                                                    <div class="droper-box droper-box-pasted" id="primgSorter">
                                                        <?php
                                                        $def_sort = array();
                                                        foreach ($ColorImages as $Image) {
                                                        ?>
                                                            <div class="dropped-item">
                                                                <span class="close" data-img="<?= "../../" . $Image ?>">
                                                                    <i class="material-icons">delete</i>
                                                                </span>
                                                                <img src="<?= "../../" . $Image . "?dummy=" . rand() ?>" alt="No img" />
                                                            </div>
                                                        <?php
                                                            $def_sort[] = basename($Image);
                                                        }
                                                        ?>
                                                    </div>
                                                    <div class="droper-intro" style="display:none">
                                                        <div class="droper-text">Drag and drop image files or click here<i class="material-icons">backup</i></div>
                                                        <div class="droper-helper">Upload different images for each color product</div>
                                                    </div>
                                                    <div class="droper-retry d-block"><i class="fa fa-plus"></i> Add more</div>

                                                    <input type="file" name="pr_img[]" multiple />
                                                    <input type="hidden" class="fd_ti" name="total_image<?= $ColorName ? '_' . $resColor : null ?>" value="<?= implode("_-_", $def_sort) ?>" data-otd="<?= count($def_sort) ?>" />
                                                </div>
                                            <?php } ?>

                                        </div>
                                    </div>
                                    <span class="bmd-help d-block text-warning">Max File Size: 2MB</span>
                                    <span class="bmd-help d-block">Select files for each colored image and select color of that image.
                                        The checked photo will be considered as thumbnail</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="hidden" name="pr_stock" value="0">

                            <table class="table table-striped table-sm dis-stock-table">
                                <thead>
                                    <tr>
                                        <th width="35%">Variant</th>
                                        <th>Stock</th>
                                        <th>Price(<?php echo CURRENCY ?>)</th>
                                    </tr>
                                </thead>
                                <tbody id="strElem">

                                    <?php
                                    $stkA = $this->Di->getStockChart($this->Di->getProductId()) ?: [["i_s" => null, "i_c" => null, "s_p" => null, "s_a" => null]];
                                    foreach ($stkA as $stk) {
                                        if (!$stk['i_c'] && !$stk['i_s']) $lblsizecolor = 'Default';
                                        else if ($stk['i_c']) $lblsizecolor = $stk['i_s'] ? $stk['i_c'] . ' - ' . $stk['i_s'] : $stk['i_c'];
                                        else $lblsizecolor = $stk['i_s'];
                                    ?>
                                        <tr id="snrElem">
                                            <td>
                                                <input type="hidden" class="stk_size" name="stk_size[]" value="<?= $stk['i_s'] ?>" />
                                                <input type="hidden" class="stk_color" name="stk_color[]" value="<?= $stk['i_c'] ?>" />
                                                <span class="lblsizecolor"><?= $lblsizecolor ?></span>
                                            </td>
                                            <td><input type="text" class="stk_amount" name="stk_amount[]" value="<?= $stk['s_a'] ?>" required /></td>
                                            <td><input type="text" class="stk_price" name="stk_price[]" value="<?= $stk['s_p'] ?>" required /></td>
                                        </tr>
                                    <?php } ?>

                                </tbody>
                            </table>
                        </div>

                        <div class="row form-group">

                            <?php
                            if (isset($AddPrOthers) && $AddPrOthers) {
                                foreach ($AddPrOthers as $othKey => $othFields) {
                                    if ($othFields['name'] == 'prtype') {
                                        echo "<input type='hidden' name='pr_others[{$othFields['name']}]' value='0' />";
                                        continue;
                                    }

                                    $othFieldData = AppModel::addPrsOtherLableFieldGenerator($othKey, $othFields, $this->Di);
                            ?>
                                    <div class="col-md-6">
                                        <div class="form-group bmd-form-group">
                                            <?php echo $othFieldData['lbl'] ?>
                                            <?php echo $othFieldData['fld'] ?>
                                        </div>
                                    </div>
                            <?php
                                }
                            }
                            ?>

                        </div>

                        <div class="form-group">
                            <label>Product Category</label>
                            <select name="pr_subcategory" data-live-search="true" class="form-control categorypicker">
                                <?php
                                foreach ($AlCats as $Mainc => $Mv) :
                                ?>
                                    <optgroup label="<?php echo htmlspecialchars($Mainc) ?>">
                                        <?php
                                        foreach ($Mv as $SubG => $SGv) :
                                            foreach ($SGv as $Sv) :
                                        ?>
                                                <option value="<?php echo $Sv['id'] ?>"
                                                        <?php if ($Sv['id'] == $this->Di->getCategory("id")) echo 'selected="true"'; ?>>
                                                    <?php echo htmlspecialchars($SubG . ' - ' . $Sv['lbl']) ?>
                                                </option>
                                        <?php
                                            endforeach;
                                        endforeach;
                                        ?>
                                    </optgroup>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="form-group">
                            <a href="" class="btn btn-warning dealdata-toggle-input" data-t="product-tab-1">Back</a>
                            <input type="submit" name="submit" value="Update" class="btn btn-success" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
<link href="<?php echo Models::asset('546_admin/assets/js/plugins/trumbowyg/ui/trumbowyg.css') ?>" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/plugins/trumbowyg/trumbowyg.js') ?>"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/plugins/trumbowyg/trumbowyg.table.min.js') ?>"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/plugins/__ds_sizes_colors.js') ?>"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/plugins/sorter/Sortable.min.js') ?>"></script>


<script src="<?php echo Models::asset('546_admin/assets/js/_ilm_File_droper.js') ?>"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/product-page-scripts.js') ?>"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/__ds_admin_plugins.js') ?>"></script>
<script src="<?php echo Models::asset('546_admin/assets/js/_ilm_Material_design_functions.js') ?>"></script>
<script src="<?php echo Models::asset('assets/_ilm_own/js/merchant/dealPage_scripts.js') ?>"></script>

<script type="text/javascript">
$(document).ready(function() {
    md.initHtmlEditor('#editor');
    _ilm_Tags_input.init();
    _ilm_File_droper.init();
    _ilm_Product_page.initAdvStk();
    $('.categorypicker').selectpicker();
});
</script>
