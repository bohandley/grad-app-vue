<?php
        require("connect.php");

        $ndid = (isset($_GET['ndid'])) ? $_GET['ndid'] : '';
	$t_code = (isset($_GET['t_code'])) ? $_GET['t_code'] : '';

        
	$sql = "BEGIN gapack.get_all_student_data (:ndid, :t_code, :d_cursor); END;";
        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ":ndid", $ndid);
        oci_bind_by_name($stmt, ":t_code", $t_code);

	$d_cursor = oci_new_cursor($conn);
	oci_bind_by_name($stmt,":d_cursor", $d_cursor, -1, OCI_B_CURSOR);

        oci_execute($stmt);

	oci_execute($d_cursor);
	
        oci_fetch_all($d_cursor, $arr, null, null, OCI_FETCHSTATEMENT_BY_ROW);

        print json_encode($arr);

        oci_close($conn);
?>
