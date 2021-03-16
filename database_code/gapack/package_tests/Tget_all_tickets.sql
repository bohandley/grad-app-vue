set verify off
set feedback off
DECLARE
  l_cursor  SYS_REFCURSOR;
  tk_id ticket.id%type;
  typ_t typ.text%type;
  tk_amt ticket.amount%type;
BEGIN
  gapack.get_all_tickets (&u_id, l_cursor);
            
  LOOP 
    FETCH l_cursor
    INTO  tk_id, typ_t, tk_amt;
    EXIT WHEN l_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(tk_id || ' | ' || typ_t || ' | ' || tk_amt);
  END LOOP;
  CLOSE l_cursor;
END;
/
