<?php
	session_start();
	include "../includes/config.php";
	require_once "../includes/functions.php";
	
	if(isset($_POST['del_data'])) {
		$delete_id = $conn->real_escape_string($_POST['id']);
		$table_name = $conn->real_escape_string($_POST['table']);
		if($table_name == 'products' && is_dir("../proimg/".$delete_id)) {
			deleteDir("../proimg/".$delete_id);
		} else if($table_name == 'sliders') {
			$old_image = get_single_index_data("sliders", "id = '{$delete_id}'", "image");
			if(file_exists("../{$old_image}") && !is_dir("../{$old_image}")) unlink("../{$old_image}");
		}
		$qs = ($table_name == 'contact') ? 'I' : 'i';
		$sql = DeleteTable($table_name, "{$qs}d='{$delete_id}'");
		if($conn->query($sql)) exit('Successfully deleted data !');
		else exit("{$conn->error}");
	}
	if(isset($_POST['delImg'])) {
		$prid = $conn->real_escape_string($_POST['prId']);
		$color = isset($_POST['imgColor']) ? $_POST['imgColor'] : null;
		if(file_exists("../../proimg/".$prid."/".$color.$_POST['key'].".jpg")){
			unlink("../../proimg/".$prid."/".$color.$_POST['key'].".jpg");
			exit("1");
		} exit("../../proimg/".$prid."/".$color.$_POST['key'].".jpg");
	}
	if(isset($_POST['updatePrStatus'])) {
		$id = $conn->real_escape_string($_POST['prId']);
		$fields['status'] = $conn->real_escape_string($_POST['updatePrStatus']);
		if($conn->query(UpdateTable("products", $fields, "id='{$id}'"))) exit("1");
		else exit("0");
	}
	if(isset($_POST['getSubHeaders'])) {
		$r_head_ers	= get_header_by_menu($_POST['main']);
		$total_head = get_total_rows("procat", "main = '".addslashes($_POST['main'])."'");
		while($headers = $r_head_ers->fetch_array()) {
			if($total_head == 1 && !$headers['header']) continue;
			echo '<option value="'.htmlspecialchars($headers['header']).'">'.htmlspecialchars($headers['header']).'</option>';
		} mysqli_free_result($r_head_ers);
	}
	if(isset($_POST['getSub'])) {
		$r_subs	= get_sub_by_header($_POST['main'], $_POST['header']);
		$total_sub = get_total_rows("procat", "main='".addslashes($_POST['main'])."' AND header='".addslashes($_POST['header'])."'");
		while($subs = $r_subs->fetch_array()) {
			if($total_sub == 1 && !$subs['sub']) continue;
			echo '<option value="'.htmlspecialchars($subs['sub']).'">'.htmlspecialchars($subs['sub']).'</option>';
		} mysqli_free_result($r_subs);
	}