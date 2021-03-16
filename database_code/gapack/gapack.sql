create or replace package gapack
is
	-- get the datapoint value for a student
	-- id, typ, termcode
	function student_data (
		u_id usr.id%type, 
		typ typ.text%type, 
		termcode datapoint.termcode%type
	)
                return datapoint.text%type;
	
	procedure get_all_student_data(
                nd IN usr.ndid%type,
                tcode IN datapoint.termcode%type,
                dataset OUT SYS_REFCURSOR
        );
	-- get the next id for creating new records for any table
	function incr_tbl_id (tbl varchar2)
                return datapoint.id%type;	

	-- get the id of a typ by passing in the string
	function get_typ_id (txt varchar2)
                return typ.id%type;

	-- get the datapoint id by passing in a usr_id, typ_text, and termcode
	function get_dtpt_id(
                u_id usr.id%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        )
		return datapoint.id%type;

	-- create a datapoint
	procedure crt_student_data (
                data datapoint.text%type,
                u_id usr.id%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        );	

	-- update a datapoint
	procedure upd_student_data (
                data datapoint.text%type,
                u_id usr.id%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        );
	
	-- pass in the same arguments as create and update, 
	-- but have a logic check to do either
	procedure process_student_data(
                data datapoint.text%type,
                nd usr.ndid%type,
                typ_t typ.text%type,
                tcode datapoint.termcode%type
        );

	-- get value for an appsetting by typ
	function get_appsetting(typ_t varchar2)
		return appsetting.value%type;
	
	-- get value for admintext by typ
	function get_admintext(typ_t varchar2)
		return admintext.text%type;
	
	-- update appsetting with new value
	procedure upd_appsetting(
		vl appsetting.value%type, 
		typ_t typ.text%type
	);

	-- update admintext with new text
	procedure upd_admintext(
		vl admintext.text%type, 
		typ_t typ.text%type
	);

        procedure get_all_tickets(
                nd IN usr.id%type,
                t_code IN ticket.termcode%type,
                ticketset OUT SYS_REFCURSOR
        );

	-- create a ticket
	procedure crt_ticket(
		amt ticket.amount%type,
                u_id usr.id%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type,
		cmny_id ceremony.id%type
	);
	-- create a ticket without a ceremony id
	procedure crt_ticket(
                amt ticket.amount%type,
                u_id usr.id%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type
        );
	-- update a ticket with updated amt and diploma ceremony
	procedure upd_ticket(
		u_id usr.id%type,
		t_id ticket.id%type,
		amt ticket.amount%type,
		cmny_id ceremony.id%type
	);

	-- upd ticket with only amount
	procedure upd_ticket(
		u_id usr.id%type,
		t_id ticket.id%type,
                amt ticket.amount%type
        );
	
	function get_ticket_id(
                u_id usr.id%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type
	)
		return ticket.id%type;

	-- update or create a ticket w/ cmny id	
	procedure process_ticket(
                amt ticket.amount%type,
                nd usr.ndid%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type,
                cmny_id ceremony.id%type
	);

	-- update or create a ticket w/out cmny id
        procedure process_ticket(
                amt ticket.amount%type,
                nd usr.ndid%type,
                typ_t typ.text%type,
                t_code ticket.termcode%type
        );

	-- get all of a student's degrees by ndid
	procedure get_all_degrees(
                nd IN usr.ndid%type,
                t_code IN ticket.termcode%type,
                degreeset OUT SYS_REFCURSOR
        );

	-- get a student's ndid by id
	function get_ndid(u_id usr.id%type)
		return usr.ndid%type;

	-- get a student's ndid by name
	function get_ndid(f_name usr.first_name%type, l_name usr.last_name%type )
	return usr.ndid%type;
	
	procedure get_all_ceremonies(
                nd IN usr.ndid%type,
                t_code IN ticket.termcode%type,
                ceremonyset OUT SYS_REFCURSOR
        );

	procedure get_all_appsettings(
		appsetting_set OUT SYS_REFCURSOR
	);

        procedure get_all_admintexts(
                admintext_set OUT SYS_REFCURSOR
        );
	
	procedure get_all_usrs(
		usrs_set OUT SYS_REFCURSOR
	);
	
	function create_usr(
		f_name usr.first_name%type,
		l_name usr.last_name%type
	)
		return usr.ndid%type;

	procedure get_percentage_conf(
		t_code IN datapoint.termcode%type,
		percent_conf OUT SYS_REFCURSOR
	);

	procedure get_student_total(
                student_set OUT SYS_REFCURSOR
        );

end gapack;
/
