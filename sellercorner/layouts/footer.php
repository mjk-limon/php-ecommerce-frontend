<?php

namespace _ilmComm;
?>

</div>
</div>

<script src="<?php echo Models::asset("assets/merchant/__ds_noti.js") ?>"></script>
<script src="<?php echo Models::asset("assets/merchant/__ilm_merchant_func.js") ?>"></script>

<?php
if (isset($_GET['smsg']) || isset($_GET['emsg'])) {
    $type = (isset($_GET['smsg'])) ? 'smsg' : 'emsg';
    switch ($type) {
        case 'emsg':
            $msg = $_GET['emsg'];
            $label = 'danger';
            break;

        case 'smsg':
            $msg = $_GET['smsg'];
            $label = 'success';
            break;
    }
?>
    <script type="text/javascript">
    $(document).ready(function() {
        _ilm_mer.showNotification('<?php echo $label ?>', 'warning', "<?php echo $msg ?>");
        window.history.pushState({}, document.title, location.href.replace(/&?<?= $type ?>=([^&]$|[^&]*)/i, ""));
    });
    </script>
<?php } ?>

</body>

</html>
