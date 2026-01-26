<?php

namespace _ilmComm;

require doc_root("546_admin/includes/functions.php");
?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-plus"></i> New Product</h2>
        <div class="row">
            <form action="" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="new_product">
                <input type="hidden" name="pr_m_id" value="<?php echo $this->MId ?>">

                <div class="col-md-12">
                    <div class="ptoggletab product-tab-1">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Select Catagory</label>
                                    <select class="form-control maincat" autocomplete="off">
                                        <option value="" selected>Select Catagory</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Select Sub Catagory Group</label>
                                    <select class="form-control subcatgroup" autocomplete="off">
                                        <option value="">Select Group</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Select Sub Catagory</label>
                                    <select name="pr_subcategory" class="form-control subcat"
                                            title="Please select category"
                                            autocomplete="off"
                                            required>
                                        <option value="">Select Sub</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Product Name</label>
                            <input type="text" name="pr_name" class="form-control" title="Please enter product name." value="" required />
                        </div>
                        <div class="form-group">
                            <label>Brand Name</label>
                            <input type="text" name="pr_brname" class="form-control" value="" />
                        </div>
                        <div class="form-group">
                            <label>Product Description</label>
                            <textarea name="pr_dis" class="form-control" id="editor"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Product Discount</label>
                            <div class="input-group input-group-sm">
                                <input class="form-control" name="pr_dicount" type="number" value="0"
                                       min="0"
                                       max="100"
                                       title="Please input product discount correctly (Expected type integer, Range 0 - 100)"
                                       required />
                                <span class="input-group-addon">%</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Available Sizes: </label>
                            <input type="text" class="form-control" name="pr_sizes" id="pr_sizes" data-role="tagsinput" value="" autocomplete="off" />
                            <span class="form-helper">Available products sizes. Use comma (,) or Enter key for insert multiple value.</span>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group bmd-form-group is-filled">
                                    <label class="bmd-label-floating">Available Colors</label>
                                    <input type="text" class="form-control" name="pr_colors" id="pr_colors" value="" autocomplete="off" />
                                    <span class="bmd-help d-block position-relative">Available products color name. Press comma (,) or Enter key for insert multiple value.</span>
                                </div>
                            </div>
                        </div>

                        <a href="" class="btn btn-info dealdata-toggle-input" data-t="product-tab-2">Next</a>
                    </div>

                    <div class="ptoggletab product-tab-2" style="display: none;">
                        <div class="row" style="margin:1rem -15px;" id="primg-area">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="file-droper-area">
                                        <div class="file-droper" data-tp="proimg/_tmp_upload/">
                                            <div class="droper-box"></div>
                                            <div class="droper-intro">
                                                <div class="droper-text">Drag and drop image files or click here<i class="material-icons">backup</i></div>
                                                <div class="droper-helper">Upload different images for each color product</div>
                                            </div>
                                            <div class="droper-retry"><i class="fa fa-plus"></i> Add More</div>
                                            <input type="file" name="pr_img[]" data-file-type="jpg,png,gif" accept="image/jpeg,image/png,image/gif" required multiple />
                                            <input type="hidden" class="fd_ti" name="total_image" autocomplete="off" data-otd="0" value="0" />
                                        </div>
                                        <div class="colorPrimgDropers"></div>
                                    </div>

                                    <span class="bmd-help d-block text-warning">
                                        Max File Size: 2MB
                                    </span>
                                    <span class="bmd-help d-block">
                                        Select files for each colored image and select color of that image.
                                        The first photo will be considered as thumbnail
                                    </span>
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
                                        <th>Price(<?php echo config('currency') ?>)</th>
                                        <th>Selling Price</th>
                                    </tr>
                                </thead>
                                <tbody id="strElem">
                                    <tr id="snrElem">
                                        <td>
                                            <input type="hidden" class="stk_size" name="stk_size[]" value="" />
                                            <input type="hidden" class="stk_color" name="stk_color[]" value="" />
                                            <span class="lblsizecolor">Default</span>
                                        </td>
                                        <td><input type="text" class="stk_amount" name="stk_amount[]" required /></td>
                                        <td><input type="text" class="stk_original_price" required /></td>
                                        <td><input type="text" class="stk_price" name="stk_price[]" required readonly style="background-color:#eee;" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row form-group">

                            <?php
                            if (isset($this->AddPrsOthers) && $this->AddPrsOthers) {
                                foreach ($this->AddPrsOthers as $othKey => $othFields) {
                                    if ($othFields['name'] == 'prtype') {
                                        echo "<input type='hidden' name='pr_others[{$othFields['name']}]' value='0' />";
                                        continue;
                                    }

                                    $othFieldData = add_prs_other_lbl_fld_generator($othKey, $othFields);
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
                            <a href="" class="btn btn-warning dealdata-toggle-input" data-t="product-tab-1">Back</a>
                            <input type="submit" value="Submit" class="btn btn-success" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<link href="<?php echo Models::asset("assets/merchant/trumbowyg/ui/trumbowyg.css") ?>" rel="stylesheet" />
<script src="<?php echo Models::asset("assets/merchant/trumbowyg/trumbowyg.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/trumbowyg/trumbowyg.table.min.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/__ds_sizes_colors.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/sorter/Sortable.min.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/_ilm_File_droper.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/product-page-scripts.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/__ds_admin_plugins.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/_ilm_Material_design_functions.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/dealPage_scripts.js") ?>"></script>

<script type="text/javascript">
$(document).ready(function() {
    md.initHtmlEditor('#editor');
    _ilm_Tags_input.init();
    _ilm_File_droper.init();
    _ilm_Product_page.initAdvStk();
    _ilm_Mer_deals.categorySelectInit(<?php echo json_encode($this->AllCats) ?>);
});
</script>
