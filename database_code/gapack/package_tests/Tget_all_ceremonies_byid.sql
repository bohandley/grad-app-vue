set verify off
set feedback off
DECLARE
  l_cursor  SYS_REFCURSOR;
  c_id ceremony.id%type;
  c_college ceremony.college%type;
  c_major ceremony.major%type;
  c_degree ceremony.degree%type;
  c_dept ceremony.department%type;
  c_date ceremony.ceremony_date%type;
  c_loc ceremony.location%type;
BEGIN
  gapack.get_all_ceremonies (&u_id, &t_code, l_cursor);

  LOOP
    FETCH l_cursor
    INTO  c_id, c_college, c_major, c_degree, c_dept, c_date, c_loc;
    EXIT WHEN l_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(c_id || ' | ' || c_college || ' | ' || c_major || ' | ' || c_degree || ' | ' || c_dept || ' | ' || c_date || ' | ' || c_loc);
  END LOOP;
  CLOSE l_cursor;
END;
/
