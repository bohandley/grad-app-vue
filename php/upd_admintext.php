<?php
        require("connect.php");

        $vl = (isset($_POST["vl"])) ? $_POST["vl"] : "";
        $typ_t = (isset($_POST["typ_t"])) ? $_POST["typ_t"] : "";

        $sql = "BEGIN gapack.upd_admintext (:vl, :typ_t); END;";
        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ":vl", $vl);
        oci_bind_by_name($stmt, ":typ_t", $typ_t);

        oci_execute($stmt);

        $r = oci_commit($conn);

        if (!$r) {
                $e = oci_error($conn);
                trigger_error(htmlentities($e['message']), E_USER_ERROR);
        }
        else {
                print "Admintext updated.";
        }

        oci_close($conn);
?>
