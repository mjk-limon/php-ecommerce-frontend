<?php

namespace _ilmComm;

$UserNotifications = $UserInfo->getUserNotifications();
array_multisort(array_column($UserNotifications, "date"), SORT_DESC, $UserNotifications);
?>

<div class="my-reviews">
	<h3>Notifications</h3>

<?php
foreach ($UserNotifications as $Notf) :
	switch ($Notf['type']) {
		case 'mntn':
			$icon = 'comments';
			$text = $Notf['name'] . " mentioned you in a comment.";
			$link = "/details/cmntchk/" . $Notf['prid'] . "/?cmntid=" . $Notf['id'];
			$status = $Notf['status'] ? '' : ' new';
			break;
		case 'qstn':
			$icon = 'question-circle ';
			$text = $Notf['name'] . " replied to your question.";
			$link = "/details/cmntchk/" . $Notf['prid'] . "/?qstnid=" . $Notf['id'];
			$status = $Notf['status'] ? '' : ' new';
			break;
		case 'odr':
			$icon = 'handshake-o';
			$text = "Your order #" . $Notf['order_no'] . " is now in processing.";
			$link = Models::baseUrl("track-order/?track-id=" . $Notf['order_no']);
			$status = '';
			break;
	}

?>
	<div class="tlist-single<?= $status ?>">
		<p><a href="<?= $link ?>">
				<i class="fa fa-2x fa-<?= $icon ?>"></i> <?= $text ?><br />
				<?= date("M j, Y", $Notf['date']) ?>
			</a></p>
	</div>
<?php endforeach; ?>
</div>