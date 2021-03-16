<?php
	require("connect.php");

	$msg_in = (isset($_GET['msg'])) ? $_GET['msg'] : 'appstg_dsb_umass';
	echo $msg_in;
	$sql = "BEGIN :b := gapack.get_appsetting(:a); END;";

	$stmt = oci_parse($conn, $sql);
	
	oci_bind_by_name($stmt, ":a", $msg_in);
	oci_bind_by_name($stmt, ":b", $msg_out, 80, SQLT_CHR);  
	
	oci_execute($stmt);
  
	print $msg_out;

	oci_close($conn);
?>
