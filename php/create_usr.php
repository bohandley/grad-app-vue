<?php
        require("connect.php");

        $f_name = (isset($_POST["f_name"])) ? $_POST["f_name"] : "";
        $l_name = (isset($_POST["l_name"])) ? $_POST["l_name"] : "";
	
        $sql = "BEGIN :b := gapack.create_usr(:f_name, :l_name); END;";

        $stmt = oci_parse($conn, $sql);

        oci_bind_by_name($stmt, ":f_name", $f_name);
	oci_bind_by_name($stmt, ":l_name", $l_name);
        oci_bind_by_name($stmt, ":b", $msg_out, 80, SQLT_CHR);

        oci_execute($stmt);
	if(isset($msg_out))
        	print $msg_out;
	else
		print 'Duplicate error, please contact the Office of the Registrar.';

        oci_close($conn);
?>
