var app = new Vue({
  	el: '#app',
	data() {
		return {
			new_usr: { f_name: '', l_name: ''},
			reg_usr: 0,
			ndid: '',
			reg_success: 0,
			usrs: [],
			signed_in: false,
			usr: {FIRST_NAME: '', LAST_NAME: '', ID:'', IS_ADMIN: 0,NDID:''},
			assumed_usr: {FIRST_NAME: '', LAST_NAME: '', ID:'', IS_ADMIN:'',NDID:''},
			student_data: copy(studentDataObj), 
			degrees: [],
			ceremonies: [],
			cmny: {CEREMONY_ID:''},
			mail: [{NAME: 'Pickup from the Registrar', VALUE: "pickup"},{NAME:'Mail', VALUE: "mail"}],
			umass: [{NAME: 'Attending', VALUE: "1"},{NAME:'Not Attending', VALUE: "0"}],
			ucmny: [{NAME: 'Attending', VALUE: "1"},{NAME:'Not Attending', VALUE: "0"}],
			appstg_options: [{NAME: 'On', VALUE: "1"},{NAME:'Off', VALUE: "0"}],
			tickets: copy(ticketsObj),
	 		appsettings: [],
			admintexts: [],
			active_tab: 'welcome', // welcome, diploma_info, diploma_ceremony, umass, uceremony 
			tab_order: ['welcome', 'diploma_info', 'diploma_ceremony', 'umass', 'uceremony', 'confirm'],
			baseUrl: 'http://52.86.114.29:8513',
			rpts: [],
			admintext_show: [
				{TYP_TEXT: 'admtxt_welcome_L', SHOW: '0'},
				{TYP_TEXT: 'admtxt_diploma_info_L', SHOW: '0'},
				{TYP_TEXT: 'admtxt_diploma_ceremony_L', SHOW: '0'},
				{TYP_TEXT: 'admtxt_umass_L', SHOW: '0'},
				{TYP_TEXT: 'admtxt_uceremony_L', SHOW: '0'},
				{TYP_TEXT: 'admtxt_confirmation_L', SHOW: '0'},
				{TYP_TEXT: 'admtxt_disabled_tab', SHOW: '0'},
				{TYP_TEXT: 'admtxt_mail_only', SHOW: '0'},	
				{TYP_TEXT: 'admtxt_summer_fall_grad', SHOW: '0'},
				{TYP_TEXT: 'admtxt_welcome_M', SHOW: '0'},
				{TYP_TEXT: 'admtxt_welcome_R', SHOW: '0'},
				{TYP_TEXT: 'admtxt_diploma_info_M', SHOW: '0'},
				{TYP_TEXT: 'admtxt_diploma_info_R', SHOW: '0'},
				{TYP_TEXT: 'admtxt_diploma_ceremony_M', SHOW: '0'},
				{TYP_TEXT: 'admtxt_diploma_ceremony_R', SHOW: '0'},
				{TYP_TEXT: 'admtxt_umass_M', SHOW: '0'},
				{TYP_TEXT: 'admtxt_umass_R', SHOW: '0'},
				{TYP_TEXT: 'admtxt_uceremony_M', SHOW: '0'},
				{TYP_TEXT: 'admtxt_uceremony_R', SHOW: '0'},
				{TYP_TEXT: 'admtxt_confirmation_M', SHOW: '0'},
				{TYP_TEXT: 'admtxt_confirmation_R', SHOW: '0'},
			]
		}	
	},
	methods: {
		appstg: function(typ_text){
			return  this.appsettings.find((ap)=> ap.TYP_TEXT == typ_text);
		},
		admtxt: function(typ_text){
			return this.admintexts.length > 0 ? this.admintexts.find((ap)=> ap.TYP_TEXT == typ_text).ADMINTEXT : '';
		},
		g_admtxt(typ_text){
			return this.admintexts.find((ap)=> ap.TYP_TEXT == typ_text);
		},
		dtpt: function(typ_text){
			return this.student_data.find(el=> el.TYP_TEXT == typ_text);
		},
		tkt: function(typ_text){
			return this.tickets.find(el=> el.TYP_TEXT == typ_text);
		},
		store: function(el, tkt_pol){
			if(tkt_pol){
				var data = tkt_pol;
				el.VALUE = tkt_pol; 
			} else {
				var data =  el.VALUE;
			}		
			var data =  tkt_pol ? tkt_pol : el.VALUE;
	
			var ndid = el.NDID ? el.NDID : app.usr.NDID;
			var typ_t = el.TYP_TEXT;
			var t_code = app.appstg('appstg_termcode').VALUE;
			
			var params = '?data=' + data + '&ndid=' + ndid + '&typ_t=' + typ_t+ '&t_code=' + t_code;
			
			var url = app.baseUrl + '/php/process_student_data.php' + params;
			
			fetch(url).then(_=> console.log("data processed"))
    				.catch(error=> console.log(error));
		},
		store_ticket(el){
			var data = el.AMOUNT ? el.AMOUNT : "0";
                        var ndid = el.NDID ? el.NDID : app.usr.NDID;
                        var typ_t = el.TYP_TEXT;
                        var t_code = app.appstg('appstg_termcode').VALUE;
			var cmny_id = app.cmny.CEREMONY_ID;

                        var params = '?amt=' + data + '&ndid=' + ndid + '&typ_t=' + typ_t+ '&t_code=' + t_code;

			if(cmny_id != null)
				params += '&cmny_id=' + cmny_id;

                        var url = app.baseUrl + '/php/process_tickets.php' + params;

                        fetch(url).then(_=> console.log("data processed"))
                                .catch(error=> console.log(error));
		},
		upd_admintext(el){
			var vl = el.ADMINTEXT;

			var typ_t = el.TYP_TEXT;

			var url = app.baseUrl + '/php/upd_admintext.php';
			
			var formData = new FormData();
			formData.append('vl', vl);
			formData.append('typ_t', typ_t);

			fetch(url, {
   				method: 'POST',
				body: formData
			}).then(_=> console.log("data processed"))
                        .catch(error=> console.log(error));
		},
		upd_appsetting(el){
			var vl = el.VALUE;

                        var typ_t = el.TYP_TEXT;

                        var params = '?vl=' + vl + '&typ_t=' + typ_t;

                        var url = app.baseUrl + '/php/upd_appsetting.php' + params;

                        fetch(url).then(_=> console.log("data processed"))
                                .catch(error=> console.log(error));
		},
		load_usr(selectedCode, usr) { 
			if(!usr){ 
				merge(app.assumed_usr, {FIRST_NAME: '', LAST_NAME: '', ID:'', IS_ADMIN: 0,NDID:''}); 
				usr = app.usr; 
			} 
				 
			var params = '?ndid=' + usr.NDID + '&t_code=' + app.appstg('appstg_termcode').VALUE; 
		 
			var student_data = fetch(app.baseUrl + '/php/student_data.php' + params).then(res=>res.json()); 
			var ceremonies = fetch(app.baseUrl + '/php/ceremonies.php' + params).then(res=>res.json()); 
			var degrees = fetch(app.baseUrl + '/php/degrees.php' + params).then(res=>res.json()); 
			var tickets = fetch(app.baseUrl + '/php/tickets.php' + params).then(res=>res.json()); 
		 
			var promises = [student_data, ceremonies, degrees, tickets]; 
			Promise.all(promises) 
				.then((data) => { 
					// clear out the student data 
					app.student_data = copy(studentDataObj); 
					data[0].map(el=> { 
						//reassign each dtpt in the app data 
						var dtpt = app.student_data.find(sd=> sd.TYP_TEXT == el.TYP_TEXT); 
						merge(dtpt, el); 
					}); 
		 
					app.ceremonies = data[1]; 
					app.degrees = data[2]; 
		 
					// clear out the tickets 
					app.tickets = copy(ticketsObj); 
					data[3].map(el=>{ 
						var tkt = app.tickets.find(t=> t.TYP_TEXT == el.TYP_TEXT); 
						merge(tkt, el); 
		 
						if(el['CEREMONY_ID']) 
							app.cmny.CEREMONY_ID = el['CEREMONY_ID']; 
		 
						if(app.dtpt('dtpt_diploma_cmny_rsvp').VALUE == 0) 
							app.cmny.CEREMONY_ID = 'not-attending'; 
					}); 
				this.signed_in = true;
			}); 
		},
		confirmation() {
			var d = this.dtpt("dtpt_confirm_email");
			d.VALUE = '1';

			this.store(d);
			
			var msg = 'You have saved and confirmed your graduation data. ';
		
			if(this.appstg('appstg_conf_email_off').VALUE == '0')
				msg += 'A summary email is in development. ';

			msg += 'Thank you for using the GradApp.';
		
			alert(msg);
		},
		get_admintext_show(typ_t){
			return this.admintext_show.find(el=> el.TYP_TEXT == typ_t);
		}
	}
})

