set verify off
set feedback off
declare
  tbl varchar2(50) := '&table';
  tbl_id datapoint.id%type;
begin
  tbl_id := gapack.incr_tbl_id(tbl);
  if tbl_id is null then
	dbms_output.put_line('Error retrieving next id');  
  else
  	dbms_output.put_line('The next id in '|| tbl || ' is ' || tbl_id);
  end if;
end;
/
