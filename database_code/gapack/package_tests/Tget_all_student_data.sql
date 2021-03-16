set verify off
set feedback off
DECLARE
  l_cursor  SYS_REFCURSOR;
  d_id datapoint.id%type;
  nm varchar2(100);
  typ_t typ.text%type;
  u_d usr.id%type;
  data_t datapoint.text%type;
BEGIN
  gapack.get_all_student_data (&u_id, &tcode, l_cursor);

  LOOP
    FETCH l_cursor
    INTO  d_id, nm, u_d, typ_t, data_t;
    EXIT WHEN l_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(d_id || ' | ' || nm || ' | ' || u_d ||' | ' || typ_t || ' | ' || data_t);
  END LOOP;
  CLOSE l_cursor;
END;
/
