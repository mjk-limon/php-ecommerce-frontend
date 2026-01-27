<?php

use _ilmComm\Core\LocalStorage\Session;

?>

<script src="<?php echo asset("assets/_ilm_own/js/__ilm_page_func.js") ?>"></script>
<?php $this->additionalScripts() ?>

<script type="text/javascript">
    lazyLoadInstance.update();

    <?php
    if ($notification = Session::get("msg")) :
        // Destroy session notification
        Session::destroy("msg");
    ?>
        showPageAlert("Alert !", "<?php echo htmlspecialchars($notification) ?>");
    <?php endif; ?>
</script>