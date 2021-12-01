<?php

namespace _ilmComm;

?>

<div class="main">
    <div class="main-interface">
        <h2 class="page-header"><i class="fa fa-plus"></i> New Product</h2>
        <form action="<?php echo PROJECT_FOLDER . 'sellercorner/new-deal/upload-image/'; ?>" method="POST">
            <input type="hidden" name="add_pr_step_1">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Select Catagory</label>
                                <select name="pr_category" class="form-control maincat" required>
                                    <option value="" selected>Select Catagory</option>

                                    <?php 
                                    $Cats = $this->Cats->fetchMain();
                                    while ($CatArr = $Cats->fetch_array()) {
                                        $this->Cats->setMain($CatArr['main']);
                                    ?>
                                        <option value="<?php echo htmlspecialchars($this->Cats->Mainc); ?>">
                                            <?php echo htmlspecialchars($this->Cats->Mainc); ?>
                                        </option>
                                    <?php } ?>

                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Select Sub Catagory Group</label>
                                <select name="pr_subhead" class="form-control subcatgroup" required>
                                    <option value="">Select Group</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Select Sub Catagory</label>
                                <select name="pr_subcategory" class="form-control subcat" required>
                                    <option value="">Select Sub</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Product Title</label>
                        <input type="text" name="pr_name" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label>Brand Name</label>
                        <input type="text" name="pr_brname" class="form-control" datalist="" required />
                    </div>
                    <div class="form-group">
                        <label>Product Description</label>
                        <textarea name="pr_dis" id="editor"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Available Sizes: </label>
                        <input type="text" class="form-control" name="pr_sizes" id="pr_sizes" data-role="tagsinput" />
                        <span class="form-helper">Available products sizes. Use comma (,) or Enter key for insert multiple value.</span>
                    </div>
                    <div class="form-group">
                        <label>Item In Stock</label>
                        <input type="number" name="pr_stock" class="form-control" value="100" required />
                    </div>
                    <div class="form-group">
                        <label>Available Colors: </label>
                        <input type="text" class="form-control" name="pr_colors" id="pr_colors" data-role="tagsinput" />
                        <span class="bmd-help d-block position-relative">Available products color name. Use comma (,) or Enter key for insert multiple value.</span>
                    </div>
                    <input type="submit" value="Next" class="btn btn-success" />
                    <input type="reset" value="Reset" class="btn btn-warning" />
                </div>
            </div>
        </form>
    </div>
</div>

<link href="css/trumbowyg/ui/trumbowyg.css" rel="stylesheet" />
<script src="css/trumbowyg/trumbowyg.js"></script>
<script src="js/__dtag_s_input"></script>

<script type="text/javascript">
$(document).ready(function() {
    $('.maincat').on('change', function() {
        showPageLoading();
        var cat = $(this).val();
        $.ajax({
            type: 'POST',
            url: 'sellercorner/ajax/',
            data: {
                getSubHeaders: 1,
                main: cat
            },
            success: function(data) {
                if (!data) {
                    $('.subcatgroup').prop("required", false).html('<option value="">No Head</option>');
                    $('.subcat').prop("required", false).html('<option value="">No Sub</option>');
                } else {
                    $('.subcatgroup').prop("required", true).html('<option value="">Select Head</option>' + data);
                    $('.subcat').prop("required", true).html('<option value="">Select Sub</option>');
                }
                hidePageAlert();
            }
        });
    });
    $('.subcatgroup').on('change', function() {
        showPageLoading();
        var cat = $('.maincat').val();
        var subHeader = $(this).val();
        $.ajax({
            type: 'POST',
            url: 'sellercorner/ajax',
            data: {
                getSub: 1,
                main: cat,
                header: subHeader
            },
            success: function(data) {
                if (!data) $('.subcat').prop("required", false).html('<option value="">No Sub</option>');
                else $('.subcat').prop("required", true).html('<option value="">Select Sub</option>' + data);
                hidePageAlert();
            }
        });
    });
});
</script>
