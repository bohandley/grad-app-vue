set verify off
set feedback off
declare
	u_id usr.id%type := '&u_id';
  	typ_t varchar2(50) := '&typ_t';
  	tcode varchar2(50) := '&tcode';
	d_id datapoint.id%type;
begin
  d_id := gapack.get_ticket_id(u_id, typ_t, tcode);
  if d_id is null then
        dbms_output.put_line('Error retrieving next id');
  else
        dbms_output.put_line('The id is '|| d_id || ' for typ ' || typ_t || ' and user id ' || u_id);
  end if;
end;
/
