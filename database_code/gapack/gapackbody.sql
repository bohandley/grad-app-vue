create or replace package body gapack
is
	function student_data (
                u_id usr.id%type,
                typ typ.text%type,
                termcode datapoint.termcode%type
        )
		return datapoint.text%type
	is
		data datapoint.text%type;
	begin
		select d.text val 
		into data
		from datapoint d, typ t
		where d.usr_id = u_id
		and d.typ_id = t.id
		and d.termcode = termcode
		and t.text = typ;
		return data;
	exception
		when no_data_found then
			dbms_output.put_line('User id: ' || u_id);
			dbms_output.put_line('Type: ' || typ);
			dbms_output.put_line('Termcode: ' || termcode);
			dbms_output.put_line('no data found.');
			return null;
	end;
	
	function incr_tbl_id (tbl varchar2)
		return datapoint.id%type
	is
		tbl_id usr.id%type;
		qry varchar2(1000);
	begin
		qry := 'select max(id) from ' || tbl;
		EXECUTE IMMEDIATE qry INTO tbl_id;
		tbl_id := tbl_id + 1;
		return tbl_id;
	exception
		when no_data_found then
			dbms_output.put_line('No records found.');
			return null;
	end;

	function get_typ_id (txt varchar2)
		return typ.id%type
	is
		t_id typ.id%type;
	begin
		select id
		into t_id
		from typ
		where text = txt;
		return t_id;
        exception
                when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;
	end;
		

	procedure crt_student_data (
              data datapoint.text%type,
              u_id usr.id%type,
              typ_t typ.text%type,
              tcode datapoint.termcode%type
        )
        is
        begin
		INSERT INTO datapoint d (
			d.id, 
			d.usr_id, 
			d.typ_id, 
			d.text, 
			d.created_by, 
			d.created_at, 
			d.updated_by, 
			d.updated_at, 
			d.termcode
		)
                VALUES (
			incr_tbl_id('datapoint'), 
			u_id, 
			get_typ_id(typ_t),
			data, 
			u_id, 
			SYSDATE, 
			u_id, 
			SYSDATE, 
			tcode
		);
		--commit;
                dbms_output.put_line('Datapoint created: ' || data);      
        exception
		when DUP_VAL_ON_INDEX then
                        dbms_output.put_line('Duplicate error.');
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
        end;

        function get_dtpt_id(
                u_id usr.id%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        )
                return datapoint.id%type
	is
		d_id datapoint.id%type;
	begin
		select id
		into d_id
		from datapoint
		where typ_id =  get_typ_id(typ_t)
		and usr_id = u_id
		and termcode = tcode;
		return d_id;
        exception
		 when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;
        end;

	procedure upd_student_data (
                data datapoint.text%type,
		u_id usr.id%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        )
	is
		d_id datapoint.id%type;
		t_id typ.id%type;	
	begin
		d_id := get_dtpt_id(u_id, typ_t, tcode);
		t_id := get_typ_id(typ_t);
	
		update datapoint
		set
			text = data,
			updated_by = u_id,
			updated_at = sysdate
		where usr_id = u_id
		and typ_id = t_id
		and termcode = tcode;
		
		dbms_output.put_line('Datapoint id ' || d_id || ' updated, ' || data);	
	exception
		when others then
			dbms_output.put_line('Error, update incomplete.');
	end;

	procedure process_student_data(
                data datapoint.text%type,
                nd usr.ndid%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        )
	is
		d_id datapoint.id%type;
		u_id usr.id%type;
	begin
		select id
		into u_id
		from usr
		where ndid = nd;

		d_id := get_dtpt_id(u_id, typ_t, tcode);

		if d_id IS NULL then
			crt_student_data(data, u_id, typ_t, tcode);
		else
			upd_student_data(data, u_id, typ_t, tcode);
		end if;
	exception
		when others then
			dbms_output.put_line('Error, processing data incomplete.');
	end;
	
	-- get value for an appsetting by typ
        function get_appsetting(typ_t varchar2)
                return appsetting.value%type
	is
		data appsetting.value%type;
		t_id typ.id%type;
        begin
		t_id := get_typ_id(typ_t);

		select value
		into data
		from appsetting a
		where a.typ_id = t_id;
		return data;
        exception
                when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;
        end;

        -- OR GET ALL APPSETTING AND WORK ON EDITING THESE LATER?

        -- get value for admintext by typ
        function get_admintext(typ_t varchar2)
                return admintext.text%type
        is
                data admintext.text%type;
                t_id typ.id%type;
        begin
                t_id := get_typ_id(typ_t);

                select text
                into data
                from admintext a
                where a.typ_id = t_id;
                return data;
        exception
                when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;
        end;
	
	procedure upd_appsetting(vl appsetting.value%type, typ_t typ.text%type)
	is
		t_id typ.id%type;
	begin
		t_id := get_typ_id(typ_t);
	
		update appsetting
		set value = vl
		where typ_id = t_id;
                dbms_output.put_line('Appsetting ' || typ_t || ' value updated to ' || vl);
        
	exception
                when others then
                        dbms_output.put_line('Error, update incomplete.');
        end;

	procedure upd_admintext(vl admintext.text%type, typ_t typ.text%type)
        is
                t_id typ.id%type;
        begin
                t_id := get_typ_id(typ_t);

                update admintext
                set text = vl
                where typ_id = t_id;
                dbms_output.put_line('Admintext ' || typ_t || ' value updated to ' || vl);
        
        exception
                when others then
                        dbms_output.put_line('Error, update incomplete.');
        end;

        procedure get_all_tickets(
                nd IN usr.id%type,
                t_code IN ticket.termcode%type,
                ticketset OUT SYS_REFCURSOR
        )
        is
        begin
                open ticketset for
                        select tk.id, tk.ceremony_id, tp.text as typ_text, tk.amount, tk.termcode, u.ndid as ndid, u.first_name || ' ' || u.last_name as full_name
                        from ticket tk, typ tp, usr u
                        where tk.usr_id = u.id
			and u.ndid = nd
                        and tk.termcode = t_code
                        and tp.id = tk.typ_id;
        end;

        --procedure get_all_tickets(
        --        u_id IN usr.id%type,
        --        t_code IN ticket.termcode%type,
        --        ticketset OUT SYS_REFCURSOR
       --)
        --is
        --begin
        --        open ticketset for
        --                select tk.id, tp.text, tk.amount
        --                from ticket tk, typ tp
        --                where tk.usr_id = u_id
        --                and tk.termcode = t_code
        --                and tp.id = tk.typ_id;
        --end;
--	procedure get_all_student_data(
--                u_id IN usr.id%type, 
--		tcode IN datapoint.termcode%type,
--                dataset OUT SYS_REFCURSOR
--        )
--        is
--        begin
--                open dataset for
--                        select d.id, u.first_name || ' ' || u.last_name as full_name, u.id, t.text as typ_text, d.text as value
--                        from datapoint d, typ t, usr u
--                        where d.usr_id = u_id
--                        and d.termcode = tcode
--                        and u.id = d.usr_id
--                        and t.id = d.typ_id;
--        end;

        procedure get_all_student_data(
                nd IN usr.ndid%type,
                tcode IN datapoint.termcode%type,
                dataset OUT SYS_REFCURSOR
        )
        is
        begin
                open dataset for
                        select d.id, u.ndid as ndid, u.first_name || ' ' || u.last_name as full_name, u.id, t.text as typ_text, d.text as value
                        from datapoint d, typ t, usr u
                        where d.usr_id = u.id
			and u.ndid = nd
                        and d.termcode = tcode
                        and t.id = d.typ_id;
        end;

	procedure crt_ticket(
		amt ticket.amount%type,
                u_id usr.id%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type,
		cmny_id ceremony.id%type	
	)
	is
        begin
		INSERT into TICKET (
                       	id,
                       	usr_id, 
                       	amount, 
                       	typ_id, 
                       	ceremony_id, 
                       	termcode, 
                       	created_by, 
                       	created_at, 
                       	updated_by, 
                       	updated_at
		) VALUES (
			incr_tbl_id('ticket'),
			u_id,
			amt,
			get_typ_id(typ_t),
			cmny_id,
			t_code,
			u_id,
			SYSDATE,
			u_id,
			SYSDATE
		);
                
                dbms_output.put_line('Ticket created, ' || typ_t || ', amount: ' || amt);
        exception
                when DUP_VAL_ON_INDEX then
                        dbms_output.put_line('Duplicate error.');
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
		when others then
                        dbms_output.put_line('Errors in creating ticket.');
        end;
		
	procedure crt_ticket(
                amt ticket.amount%type,
                u_id usr.id%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type
        )
        is
        begin

                INSERT into TICKET (
                        id,     
                        usr_id, 
                        amount, 
                        typ_id, 
                        termcode, 
                        created_by, 
                        created_at, 
                        updated_by, 
                        updated_at
                ) VALUES (
                        incr_tbl_id('ticket'),
                        u_id,   
                        amt,    
                        get_typ_id(typ_t),
                        t_code, 
                        u_id,   
                        SYSDATE,
                        u_id,
                        SYSDATE 
                );      
                
                dbms_output.put_line('Ticket created, ' || typ_t || ', amount: ' || amt);
        exception
                when DUP_VAL_ON_INDEX then
                        dbms_output.put_line('Duplicate error.');
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
                when others then
                        dbms_output.put_line('Errors in creating ticket.');
        end;

	procedure upd_ticket(
		u_id usr.id%type,
                t_id ticket.id%type,
                amt ticket.amount%type,
                cmny_id ceremony.id%type
        )
	is
	begin
		UPDATE ticket
		set amount = amt, ceremony_id = cmny_id, updated_by = u_id, updated_at = SYSDATE
		where id = t_id;
		dbms_output.put_line('Ticket updated, id ' || t_id || ', amount: ' || amt || ', ceremony id: ' || cmny_id);
	exception
		when others then
                        dbms_output.put_line('Error, update incomplete.');
	end;      

        -- upd ticket with only amount
        procedure upd_ticket(
		u_id usr.id%type,
                t_id ticket.id%type,
                amt ticket.amount%type
        )
        is
        begin
                UPDATE ticket
                set amount = amt, updated_by = u_id, updated_at = SYSDATE
                where id = t_id;
		dbms_output.put_line('Ticket updated, id ' || t_id || ', amount: ' || amt);
        exception
                when others then
                        dbms_output.put_line('Error, update incomplete.');
        end;

	function get_ticket_id(
		u_id usr.id%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type
	)
		return ticket.id%type
	is
		t_id ticket.id%type;
	begin
		select t.id
		into t_id
		from ticket t
		where t.usr_id = u_id
		and t.typ_id = get_typ_id(typ_t)
		and t.termcode = t_code;
		return t_id;
        exception
                when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;	
	end;

	procedure process_ticket(
		amt ticket.amount%type,
                nd usr.ndid%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type,
                cmny_id ceremony.id%type
	)
	is
                t_id ticket.id%type;
                u_id usr.id%type;
        begin
                select id
                into u_id
                from usr
                where ndid = nd;

                t_id := get_ticket_id(u_id, typ_t, t_code);

                if t_id IS NULL then
                        crt_ticket(amt, u_id, typ_t, t_code, cmny_id);
                else
                        upd_ticket(u_id, t_id, amt, cmny_id);
                end if;
        exception
                when others then
                        dbms_output.put_line('Error, processing data incomplete.');
        end;
	
	procedure process_ticket(
                amt ticket.amount%type,
                nd usr.ndid%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type
        )
        is
                t_id ticket.id%type;
                u_id usr.id%type;
        begin
                select id
                into u_id
                from usr
                where ndid = nd;

                t_id := get_ticket_id(u_id, typ_t, t_code);

                if t_id IS NULL then
                        crt_ticket(amt, u_id, typ_t, t_code);
                else
                        upd_ticket(u_id, t_id, amt);
                end if;
        exception
                when others then
                        dbms_output.put_line('Error, processing data incomplete.');
        end;
	procedure get_all_degrees(
                nd IN usr.ndid%type,
                t_code IN ticket.termcode%type,
                degreeset OUT SYS_REFCURSOR
        )
        is
        begin
                open degreeset for
                        select d.id, d.degree_name, d.college, d.major, d.department
                        from degree d
                        where ndid = nd
			and d.term_code_grad = t_code;
        end;

--	procedure get_all_degrees(
--                u_id IN usr.id%type,
--                t_code IN ticket.termcode%type,
--                degreeset OUT SYS_REFCURSOR
--        )
--        is
--        begin
--                open degreeset for
--                        select d.id, d.degree_name, d.college, d.major, d.department
--                        from degree d
 --                       where d.ndid = get_ndid(u_id)
--			and d.term_code_grad = t_code;
--        end;

	 -- get a student's ndid by id
        function get_ndid(u_id usr.id%type)
                return usr.ndid%type
	is
		student_id usr.ndid%type;
	begin
		select ndid
		into student_id
		from usr	
		where id = u_id;
		return student_id;
	exception
		when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;
	end;

        -- get a student's ndid by name
        function get_ndid(f_name usr.first_name%type, l_name usr.last_name%type )
	        return usr.ndid%type
	is
	        student_id usr.ndid%type;
        begin
                select ndid
                into student_id
                from usr
                where first_name = f_name
		and last_name = l_name;
		return student_id;
        exception
                when no_data_found then
                        dbms_output.put_line('No records found.');
                        return null;
        end;
	

	-- get all ceremonies for a student
--	procedure get_all_ceremonies(
--                u_id IN usr.id%type,
--                t_code IN ticket.termcode%type,
--                ceremonyset OUT SYS_REFCURSOR
--        )
--        is
--		c_id_pl ceremony.id%type;
--		c_ids varchar2(100) := '';
--		degreeset SYS_REFCURSOR;
--		d_id degree.id%type;
--		d_name degree.degree_name%type;
--		d_college degree.college%type;
--		d_major degree.major%type;
--		d_dept degree.department%type;
--       begin
--		get_all_degrees(u_id, t_code, degreeset);
--	
--		loop
--			fetch degreeset
--			into d_id, d_name, d_college, d_major, d_dept;
--			
--			select c.id
--			into c_id_pl
--                    from ceremony c
--                        where c.degree LIKE '%' || d_name ||'%'
--                        and c.college = d_college
--                        and c.major = d_major
--                        and c.department = d_dept;
--			
--			c_ids := c_ids || c_id_pl;
--			EXIT WHEN degreeset%NOTFOUND;
--			c_ids := c_ids || ',';
--		end loop;
--		close degreeset;
			
--                open ceremonyset for
--                        'select c.id, c.college, c.major, c.degree, c.department, c.ceremony_date, c.location
--			from ceremony c
--                        where c.id IN (' || c_ids || ')'; 
--        end;
	
	-- get all ceremonies for a student
        procedure get_all_ceremonies(
                nd IN usr.ndid%type,
                t_code IN ticket.termcode%type,
                ceremonyset OUT SYS_REFCURSOR
        )
	is
                c_id_pl ceremony.id%type;
                c_ids varchar2(100) := '';
                degreeset SYS_REFCURSOR;
                d_id degree.id%type;
                d_name degree.degree_name%type;
                d_college degree.college%type;
                d_major degree.major%type;
                d_dept degree.department%type;
        begin
                get_all_degrees(nd, t_code, degreeset);

                loop
                        fetch degreeset
                        into d_id, d_name, d_college, d_major, d_dept;

                        select c.id
                        into c_id_pl
                        from ceremony c
                        where c.degree LIKE '%' || d_name ||'%'
                        and c.college = d_college
                        and c.major = d_major
                        and c.department = d_dept;

                        c_ids := c_ids || c_id_pl;
                        EXIT WHEN degreeset%NOTFOUND;
                        c_ids := c_ids || ',';
                end loop;
                close degreeset;

                open ceremonyset for
                        'select c.id, c.college, c.major, c.degree, c.department, c.ceremony_date, c.location
                        from ceremony c
                        where c.id IN (' || c_ids || ')';
        end;

	procedure get_all_appsettings(
		appsetting_set OUT SYS_REFCURSOR
	)
	is
        begin
                open appsetting_set for
                        select a.id, t.text as typ_text, a.value
                        from appsetting a, typ t
                        where a.typ_id = t.id;
        end;
        
	procedure get_all_admintexts(
                admintext_set OUT SYS_REFCURSOR
        )
        is
        begin
                open admintext_set for
                        select a.id, t.text as typ_text, a.text as admintext
                        from admintext a, typ t
                        where a.typ_id = t.id;
        end;

	procedure get_all_usrs(
		usrs_set OUT SYS_REFCURSOR
	)
	is
	begin
                open usrs_set for
			select id, is_admin, ndid, first_name, last_name from usr;
	end;

	function create_usr(
              f_name usr.first_name%type,
              l_name usr.last_name%type
        )
		return usr.ndid%type
        is
		test_id usr.id%type;
		u_id usr.id%type;
		nd usr.ndid%type;
        begin

		select id
		into test_id
		from usr
		where first_name = f_name
		and last_name = l_name;
		
		if test_id IS NOT NULL then
			dbms_output.put_line('Duplicate id of ' || test_id);
			raise DUP_VAL_ON_INDEX;
		end if;

        exception
		when no_data_found then
			select max(to_number(ndid))
                        into nd
                        from usr;

                        nd := nd + 1;

                        u_id := incr_tbl_id ('usr');

                        dbms_output.put_line('Next usr id is ' || u_id);
                                 
                        INSERT INTO usr u (
                                u.id,
                                u.is_admin,
                                u.ndid,
                                u.first_name,
                                u.last_name,
                                u.created_at,
                                u.created_by,
                                u.updated_by,
                                u.updated_at
                        )
                        VALUES (
                                u_id,
                                0,
                                to_char(nd),
                                f_name,
                                l_name,
                                SYSDATE,
                                u_id,
                                u_id,
                                SYSDATE
                        );
                 
                        dbms_output.put_line('Usr created, NDID: ' || nd);
                        return nd;
                when DUP_VAL_ON_INDEX then
                        dbms_output.put_line('Duplicate error.');
			return null;
                when VALUE_ERROR then
                        dbms_output.put_line('VALUE_ERROR exception raised');
			return null;
        end;		

	procedure get_percentage_conf(
                t_code IN datapoint.termcode%type,
                percent_conf OUT SYS_REFCURSOR
        )
	is
        begin
                open percent_conf for
			select t.text typ_text, count(d.typ_id) typ_count
			from typ t
			left outer join datapoint d
			on d.typ_id = t.id
			and d.termcode = t_code
			where t.id in (41,42,43,44,45,48)
			group by t.text;
        end;

	procedure get_student_total(
                student_set OUT SYS_REFCURSOR
        )
	is
	begin
		open student_set for
			select count(DISTINCT(d.ndid)) total_students from degree d;
	end;

end gapack;
/
