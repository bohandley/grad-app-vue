set verify off
set feedback off
DECLARE
  l_cursor  SYS_REFCURSOR;
  u_id datapoint.id%type;
  is_adm number;
  nd usr.ndid%type;
  f_n usr.first_name%type;
  l_n usr.last_name%type;
BEGIN
  gapack.get_all_usrs (l_cursor);

  LOOP
    FETCH l_cursor
    INTO  u_id, is_adm, nd, f_n, l_n;
    EXIT WHEN l_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(u_id || ' | ' || is_adm || ' | ' || nd ||' | ' || f_n || ' | ' || l_n);
  END LOOP;
  CLOSE l_cursor;
END;
/
