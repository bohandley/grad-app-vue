set verify off
set feedback off
begin
        gapack.process_ticket('&amount', '&ndid', '&typ_text', '&termcode');
        exception
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
end;
/
