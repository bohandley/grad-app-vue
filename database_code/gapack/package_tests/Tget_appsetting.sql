set verify off
set feedback off
declare
        typ_t varchar2(50) := '&typ_t';
	app_stg number;
begin
  app_stg := gapack.get_appsetting(typ_t);
  if app_stg is null then
        dbms_output.put_line('There is no record for ' || typ_t);
  else
        dbms_output.put_line('The appsetting value for ' || typ_t || ' is ' || app_stg);
  end if;
end;
/
