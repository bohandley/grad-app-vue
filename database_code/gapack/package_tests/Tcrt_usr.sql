set verify off
set feedback off
declare 
	nd usr.ndid%type;
begin
        nd := gapack.create_usr('&f_name', '&l_name');

	dbms_output.put_line('New usr created with NDID: ' || nd);
        exception
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
end;
/
