set verify off
set feedback off
begin
        gapack.crt_student_data('&data', '&usr_id', '&typ_text', '&termcode');
        exception
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
end;
/
