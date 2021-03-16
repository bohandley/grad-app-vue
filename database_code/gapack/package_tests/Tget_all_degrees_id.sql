set verify off
set feedback off
DECLARE
  l_cursor  SYS_REFCURSOR;
  d_id degree.id%type;
  d_name degree.degree_name%type;
  d_college degree.college%type;
  d_major degree.major%type;
  d_dept degree.department%type;
BEGIN
  gapack.get_all_degrees (&u_id, &t_code, l_cursor);

  LOOP
    FETCH l_cursor
    INTO  d_id, d_name, d_college, d_major, d_dept; 
    EXIT WHEN l_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(d_id || ' | ' || d_name || ' | ' || d_college || ' | ' || d_major || ' | ' ||d_dept);
  END LOOP;
  CLOSE l_cursor;
END;
/
