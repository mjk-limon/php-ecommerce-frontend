<?php

namespace _ilmComm;

if (isset($_POST['update_deal_info'])) {
    exit();
    $prid = $conn->real_escape_string($_POST['pid']);
    $uploadOk = 0;
    $cwi_array = array();

    $r_prevImageCount = get_single_data("products", "id='{$prid}'", "images,colors");
    $prevColorArray = explode(',', $r_prevImageCount['colors']);
    $prevCountArray = explode(',', $r_prevImageCount['images']);
    foreach ($prevColorArray as $colorkey => $color) {
        $imageSl = 1;
        for ($i = 1; $i <= $prevCountArray[$colorkey]; $i++) {
            if (file_exists("../../proimg/" . $prid . "/" . $color . $i . ".jpg")) {
                rename("../../proimg/" . $prid . "/" . $color . $i . ".jpg", "../../proimg/" . $prid . "/" . $color . $imageSl . ".jpg");
                $imageSl++;
            }
        }
        $prevCountArray[$colorkey] = $imageSl - 1;
    }
    $uFields['colors'] = implode(",", $prevColorArray);
    $uFields['images'] = implode(",", $prevCountArray);
    $conn->query(UpdateTable("products", $uFields, "id='{$prid}'"));

    $fields['name'] = $conn->real_escape_string($_POST['pr_name']);
    $fields['brand'] = $conn->real_escape_string($_POST['pr_brname']);
    $fields['size'] = $conn->real_escape_string($_POST['pr_sizes']);
    $fields['description'] = $conn->real_escape_string($_POST['pr_dis']);
    $fields['price'] = $conn->real_escape_string($_POST['pr_price']);
    $fields['discount'] = $conn->real_escape_string($_POST['pr_dicount']);
    $fields['item_left'] = $conn->real_escape_string($_POST['pr_stock']);

    if (!empty($_FILES["pr_img"]['name'][0])) {
        if (!empty($_POST['pr_colors'])) {
            foreach ($prevColorArray as $prevKey => $prevColor) {
                for ($pri = 0; $pri < $prevCountArray[$prevKey]; $pri++)
                    $cwi_array[] = $prevColor;
            }

            foreach ($_FILES["pr_img"]['name'] as $img_key => $img) {
                $img_color = $cwi_array[] = $conn->real_escape_string($_POST['imgclr' . $img_key]);
                $img_sa = array_count_values($cwi_array)[$img_color];
                $uploaded_file = upload_image("pr_img", $img_key, "../");
                resize_image(1536, 0, "../../proimg/{$prid}/{$img_color}{$img_sa}", $uploaded_file, true, "jpg");
                //watermark_image("../proimg/{$prid}/{$img_color}{$img_sa}.jpg", "img/wtmrk.png");
            }
            $cwi_acv = array_count_values($cwi_array);
            $fields['colors'] = $conn->real_escape_string(implode(",", array_keys($cwi_acv)));
            $fields['images'] = $conn->real_escape_string(implode(",", $cwi_acv));
        } else {
            $fields['colors'] = "";
            $fields['images']   = count($_FILES["pr_img"]['name']) + $prevCountArray[0];
            for ($j = 0; $j < count($_FILES["pr_img"]['name']); $j++) {
                $imageArray   = $prevCountArray[0] + $j + 1;
                $uploaded_file = upload_image("pr_img", $j, "../");
                resize_image(1536, 0, "../../proimg/{$prid}/{$imageArray}", $uploaded_file, true, "jpg");
                //watermark_image("../../proimg/{$prid}/{$imageArray}.jpg", "img/wtmrk.png");
            }
        }
    }
    if (isset($_POST['dis_qty_from']) && !empty($_POST['dis_qty_from'])) {
        $dFields['prid'] = $prid;
        $dFields['msr_unit'] = $conn->real_escape_string($_POST['msr_unit']);
        $conn->query(DeleteTable("pr_discounts", "prid='{$prid}'"));
        foreach (array_filter($_POST['dis_qty_from']) as $key => $dqtyf) {
            $dFields['item_from'] = $conn->real_escape_string($dqtyf);
            $dFields['item_to'] = ($_POST['dis_qty_to'][$key]) ? $conn->real_escape_string($_POST['dis_qty_to'][$key]) : 0;
            $dFields['discount_amount'] = $conn->real_escape_string($_POST['dis_amount'][$key]);
            $conn->query(InsertInTable('pr_discounts', $dFields));
        }
    }

    $sql = UpdateTable('products', $fields, " id = '{$prid}' ");
    if ($conn->query($sql) == true) header('Location: ' . $base . 'sellercorner/deal-management/?smsg=' . urlencode('Successfully Updated Product'));
    else header('Location: ' . $base . 'sellercorner/deal-management/?emsg=' . urlencode($conn->error));
}

?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-pencil"></i> Edit Product Details</h2>
        <div class="row">
            <form action="" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="update_deal_info">
                <input type="hidden" name="pid" value="<?php echo $this->Prid ?>">

                <div class="col-md-12">
                    <div class="product-tab-1">
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
                                <input class="form-control" name="pr_price" type="number" value="<?php echo $this->Di->getDiscount() ?>" min="0" max="100" required />
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

                        <a href="" class="btn btn-info">Next</a>
                    </div>

                    <div class="product-tab-2">
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
                            <table class="table table-striped table-sm dis-stock-table">
                                <thead>
                                    <tr>
                                        <th width="35%">Variant</th>
                                        <th>Stock</th>
                                        <th>Price(<?php echo CURRENCY ?>)</th>
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
                                        <td><input type="text" class="stk_price" name="stk_price[]" required /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="form-group">
                            <input type="submit" name="submit" value="Update" class="btn btn-success" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<link href="<?php echo Models::asset('546_admin/assets/js/plugins/trumbowyg/ui/trumbowyg.css') ?>" rel="stylesheet" />
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
});
</script>
