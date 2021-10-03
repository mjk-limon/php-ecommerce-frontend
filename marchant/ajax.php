<?php
	session_start();
	include "../includes/config_site.php";
	include "../includes/config_pr.php";
	require_once "../includes/functions.php";
	
	if(isset($_POST['getSubHeaders'])) {
		$r_head_ers	= get_header_by_menu($_POST['main']);
		while($headers = $r_head_ers->fetch_array()) {
			echo '<option value="'.htmlspecialchars($headers['header']).'">'.htmlspecialchars($headers['header']).'</option>';
		} mysqli_free_result($r_head_ers);
	}
	if(isset($_POST['getSub'])) {
		$r_subs	= get_sub_by_header($_POST['main'], $_POST['header']);
		while($subs = $r_subs->fetch_array()) {
			echo '<option value="'.htmlspecialchars($subs['sub']).'">'.htmlspecialchars($subs['sub']).'</option>';
		} mysqli_free_result($r_subs);
	}
	if(isset($_POST['delImg'])) {
		$prid = $conn->real_escape_string($_POST['prId']);
		$color = !empty($_POST['color']) ? $_POST['color'] : null;
		if(file_exists("../../proimg/".$prid."/".$color.$_POST['key'].".jpg")){
			unlink("../../proimg/".$prid."/".$color.$_POST['key'].".jpg");
			$output = 1;
		} else $output = "Error! No file exists !";
		exit("$output");
	}