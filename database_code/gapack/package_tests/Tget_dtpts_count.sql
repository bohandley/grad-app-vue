set verify off
set feedback off
DECLARE
  l_cursor  SYS_REFCURSOR;
  typ_t typ.text%type;
  c number;
BEGIN
  
  gapack.get_dtpts_count('&dtpts', '&tcode', l_cursor);

  LOOP
    FETCH l_cursor
    INTO  typ_t, c;
    EXIT WHEN l_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(typ_t || ' | ' || c);
  END LOOP;
  CLOSE l_cursor;
END;
/
