set verify off
set feedback off
begin
        gapack.upd_appsetting('&newvl', '&typ_t');
        exception
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
end;
/
