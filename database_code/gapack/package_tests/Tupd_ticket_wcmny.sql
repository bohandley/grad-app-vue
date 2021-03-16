set verify off
set feedback off
begin
        gapack.upd_ticket('&u_id', '&ticket_id', '&amt', '&ceremony_id');
        exception
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
end;
/
