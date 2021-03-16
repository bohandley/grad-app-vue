<?php
        require("connect.php");

	$data = (isset($_GET['data'])) ? $_GET['data'] : "";
	$typ_t = (isset($_GET['typ_t'])) ? $_GET['typ_t'] : "";
        $ndid = (isset($_GET['ndid'])) ? intval($_GET['ndid']) : "";
        $t_code = (isset($_GET['t_code'])) ? $_GET['t_code'] : "";

        $sql = "BEGIN gapack.process_student_data (:data, :ndid, :typ_t, :t_code); END;";
        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ":data", $data);
        oci_bind_by_name($stmt, ":typ_t", $typ_t);

	oci_bind_by_name($stmt, ":ndid", $ndid);
        oci_bind_by_name($stmt, ":t_code", $t_code);

        oci_execute($stmt);

	$r = oci_commit($conn);

	if (!$r) {
    		$e = oci_error($conn);
    		trigger_error(htmlentities($e['message']), E_USER_ERROR);
	}
	else {
		print "Student data processed.";
	}

        oci_close($conn);
?>
