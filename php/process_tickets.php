<?php
        require("connect.php");

        $amt = (isset($_GET['amt'])) ? $_GET['amt'] : "";
        $ndid = (isset($_GET['ndid'])) ? intval($_GET['ndid']) : "";
	$typ_t = (isset($_GET['typ_t'])) ? $_GET['typ_t'] : "";
        $t_code = (isset($_GET['t_code'])) ? $_GET['t_code'] : "";
	$cmny_id = (isset($_GET['cmny_id'])) ? $_GET['cmny_id'] : false;

	if (!$cmny_id){
		$sql = "BEGIN gapack.process_ticket (:amt, :ndid, :typ_t, :t_code); END;";
        	$stmt = oci_parse($conn, $sql);
	}
	else {
		$sql = "BEGIN gapack.process_ticket (:amt, :ndid, :typ_t, :t_code, :cmny_id); END;";
                $stmt = oci_parse($conn, $sql);
		oci_bind_by_name($stmt, ":cmny_id", $cmny_id, -1, SQLT_INT);
	}

        oci_bind_by_name($stmt, ":amt", $amt);
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
                print "Ticket processed.";
        }

        oci_close($conn);
?>
