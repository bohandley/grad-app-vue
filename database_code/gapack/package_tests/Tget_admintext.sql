set verify off
set feedback off
declare
        typ_t varchar2(50) := '&typ_t';
	admtxt admintext.text%type;
begin
  admtxt := gapack.get_admintext(typ_t);
  if admtxt is null then
        dbms_output.put_line('There is no record for ' || typ_t);
  else
        dbms_output.put_line('The admintext for ' || typ_t || ' is ' || admtxt);
  end if;
end;
/
