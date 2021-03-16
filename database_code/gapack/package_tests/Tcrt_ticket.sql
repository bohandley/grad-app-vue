set verify off
set feedback off
begin
        gapack.crt_ticket('&amt', '&u_id','&typ_t', '&t_code', '&cmny_id');
        exception
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
end;
/
