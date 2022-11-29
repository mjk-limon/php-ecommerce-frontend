<script src="<?php echo asset("assets/vendors/jssor/jssor.js") ?>"></script>
<script src="<?php echo asset("assets/vendors/jssor/jssor.slider.js") ?>"></script>
<script type="text/javascript">
slideSize = {
    width: <?php echo rec_arr_val($this->slideSize, 0) ?>,
    height: <?php echo rec_arr_val($this->slideSize, 1) ?>,
    space: <?php echo rec_arr_val($this->slideSize, 2, 9) ?>
};
</script>
<script defer src="<?php echo asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>
