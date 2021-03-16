set verify off
set feedback off
declare
  id usr.id%type := '&id';
  tp typ.text%type := '&typ';
  termcode datapoint.termcode%type := '&termcode';
  data datapoint.text%type;
begin
  data := gapack.student_data(id, tp, termcode);
  if data is null then
    dbms_output.put_line('There is no data for that.');
  else
    dbms_output.put_line('The data is "' || data || '".');
  end if;
end;
/
