<?php

// Get User notifications
$UserNotifications = $this->UserData->getUserNotifications();
array_multisort(array_column($UserNotifications, "date"), SORT_DESC, $UserNotifications);
?>

<div class="my-reviews">
    <h3>Notifications</h3>

    <?php
    foreach ($UserNotifications as $Notf) :
        // Get notification icon
        // Notification label, Link and status
        switch ($Notf['type']) {
            case 'mntn':
                // Notification type is mention
                $icon = 'comments';
                $text = $Notf['name'] . " mentioned you in a comment.";
                $link = "/details/cmntchk/" . $Notf['prid'] . "/?cmntid=" . $Notf['id'];
                $status = $Notf['status'] ? '' : 'new';
                break;

            case 'qstn':
                // Notification type is question answer
                $icon = 'question-circle ';
                $text = $Notf['name'] . " replied to your question.";
                $link = "/details/cmntchk/" . $Notf['prid'] . "/?qstnid=" . $Notf['id'];
                $status = $Notf['status'] ? '' : 'new';
                break;

            case 'odr':
                // Notification type is order status update
                $icon = 'handshake-o';
                $text = "Your order #" . $Notf['order_no'] . " is now in processing.";
                $link = base_url("track-order/?track-id=" . $Notf['order_no']);
                $status = '';
                break;
        }
    ?>
        <div class="tlist-single <?php echo $status ?>">
            <p class="tlist-singleinner">
                <a href="<?php echo $link ?>">
                    <i class="fa fa-2x fa-<?php echo $icon ?>"></i> <?php echo $text ?><br />
                    <?php echo date("M j, Y", $Notf['date']) ?>
                </a>
            </p>
        </div>
    <?php endforeach; ?>
    
</div>