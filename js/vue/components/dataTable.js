Vue.component('data-table', {
        props: ['student_data', 'ceremonies', 'degrees', 'tickets'],
        template: `
                <div>
                        <h3>Student Data</h3>
                        <table 
				v-if="!appstgDisabled('appstg_dsb_diploma_info')"
				class="table table-hover"
			>
				<tbody>
                                <tr>
                                        <th>Diploma Information</th>
                                        <th>
						<a 
							href="#/" 
							@click="edit('diploma_info')"
							style="float:right;""
						>
							Edit
						</a>
					</th>
                                </tr>
                                <tr v-for="stdata in filter_diploma_info(student_data)">
                                        <td>{{ stdata.NAME }}</td>
                                        <td>{{ stdata.VALUE == 1 ? 'Yes' : stdata.VALUE == 0 ? 'No' : stdata.VALUE }}</td>
                                </tr>
				</tbody>
                        </table>
			<table 
				v-if="!appstgDisabled('appstg_dsb_diploma_ceremony')"
				class="table table-hover"
			>
                                <tbody>
                                <tr>
                                        <th>
						{{ appstgMailonly('appstg_mailonly') ? 'Diploma Mailing Address' : appstgSummerFall('appstg_summerfall') ? 'Diploma' : 'Diploma Ceremony' }}
					</th>
                                        <th>
                                                <a 
                                                        href="#/" 
                                                        @click="edit('diploma_ceremony')"
                                                        style="float:right;""
                                                >
                                                        Edit
                                                </a>
                                        </th>
                                </tr>
                                <tr v-for="stdata in filter_diploma_ceremony(student_data)">
                                        <td>{{ stdata.NAME }}</td>
                                        <td>{{ stdata.VALUE == 1 ? 'Yes' : stdata.VALUE == 0 ? 'No' : stdata.VALUE }}</td>
                                </tr>
				<tr>
                                        <td>Diploma Ceremony Tickets</td>
                                        <td>{{tkt('tkt_dc')}}</td>
                                </tr>
                                </tbody>
                        </table>
			<table 
				v-if="noRender('appstg_mailonly','appstg_dsb_umass', 'appstg_summerfall')"
				class="table table-hover"
			>
                                <tbody>
                                <tr>
                                        <th>University Mass</th>
                                        <th>
                                                <a 
                                                        href="#/" 
                                                        @click="edit('umass')"
                                                        style="float:right;""
                                                >
                                                        Edit
                                                </a>
                                        </th>
                                </tr>
                                <tr v-for="stdata in filter_umass(student_data)">
                                        <td>{{ stdata.NAME }}</td>
                                        <td>{{ stdata.VALUE == 1 ? 'Yes' : stdata.VALUE == 0 ? 'No' : stdata.VALUE }}</td>
                                </tr>
				<tr>
                                        <td>University Mass Tickets</td>
                                        <td>{{tkt('tkt_um')}}</td>
                                </tr>
                                </tbody>
                        </table>
			<table 
				v-if="noRender('appstg_mailonly','appstg_dsb_uceremony', 'appstg_summerfall')"
				class="table table-hover"
			>
                                <tbody>
                                <tr>
                                        <th>University Ceremony</th>
                                        <th>
                                                <a 
                                                        href="#/" 
                                                        @click="edit('uceremony')"
                                                        style="float:right;""
                                                >
                                                        Edit
                                                </a>
                                        </th>
                                </tr>
                                <tr v-for="stdata in filter_uceremony(student_data)">
                                        <td>{{ stdata.NAME }}</td>
                                        <td>{{ stdata.VALUE == 1 ? 'Yes' : stdata.VALUE == 0 ? 'No' : stdata.VALUE }}</td>
                                </tr>
				<tr>
                                        <td>University Ceremony Tickets</td>
                                        <td>{{tkt('tkt_uc')}}</td>
                                </tr>
				<tr>
                                        <td>Special Needs Tickets</td>
                                        <td>{{tkt('tkt_uc_spn')}}</td>
                                </tr>
				<tr>
                                        <td>Wheelchair Tickets</td>
                                        <td>{{tkt('tkt_uc_whl')}}</td>
                                </tr>
                                </tbody>
                        </table>
                       <!-- <h3>Diploma Ceremonies</h3>
                        <table class="table table-hover"  >
                                <tr>
                                        <th>Ceremony Department</th>
                                        <th>Ceremony Date</th>
                                </tr>
                                <tr v-for="cer in ceremonies">
                                        <td>{{ cer.DEPARTMENT }}</td>
                                        <td>{{ cer.CEREMONY_DATE }}</td>
                                </tr>
                        </table>
                        <h3>Student Degree(s)</h3>
                         <table class="table table-hover"  >
                                <tr>
                                        <th>Degree Name</th>
                                        <th>Degree College</th>
                                </tr>
                                <tr v-for="deg in degrees">
                                        <td>{{ deg.DEGREE_NAME }}</td>
                                        <td>{{ deg.COLLEGE }}</td>
                                </tr>
                        </table>
                        <h3>Student Tickets</h3>
                         <table class="table table-hover"  >
                                <tr>
                                        <th>Ticket Type</th>
                                        <th>Ticket Amount</th>
                                </tr>
                                <tr v-for="tic in tickets">
                                        <td>{{ tic.TYP_TEXT }}</td>
                                        <td>{{ tic.AMOUNT }}</td>
                                </tr>
                        </table>-->
                </div>
        `,
	methods: {
		filter_diploma_info(st){
			var typs = [
				'dtpt_diploma_name',
				'dtpt_hometown',
				'dtpt_phonetic_nm',
				'dtpt_cell_num',
				'dtpt_postgrad_email'
			];
		
			return st.filter(el => typs.includes(el.TYP_TEXT));
		},
		filter_diploma_ceremony(st){
			var typs = [
				'dtpt_diploma_cmny_rsvp',
				'dtpt_diploma_indct_rcv',
				'dtpt_diploma_country',
				'dtpt_diploma_add1',
				'dtpt_diploma_add2',
				'dtpt_diploma_add3',
				'dtpt_diploma_city',
				'dtpt_diploma_zip',
				'dtpt_diploma_state'
			];

			return st.filter(el => typs.includes(el.TYP_TEXT));
		},
		filter_umass(st){
			var typs = [
				'dtpt_umass_rsvp',
			];
			return st.filter(el => typs.includes(el.TYP_TEXT));
		},
		filter_uceremony(st){
			var typs = [
				'dtpt_uceremony_rsvp',
				'dtpt_uceremony_tkt_policy',
				'dtpt_uceremony_guest_email',
				'dtpt_uceremony_guest_cell',
				'dtpt_ucmny_acc',
			];	
			return st.filter(el => typs.includes(el.TYP_TEXT));
		},
		edit(tab){
			app.active_tab = tab;
		},
		tkt(typ){
			return app.tkt(typ).AMOUNT == '' ? 'None' : app.tkt(typ).AMOUNT;
		},
		appstgMailonly(t){
                        var mail = app.appstg(t).VALUE;

                        if(mail == '1')
                                return true;
                        else if(mail == '0')
                                return false;
                },
                appstgDisabled(t){
                        var disabled = app.appstg(t).VALUE;

                        if(disabled == '1')
                                return true;
                        else if(disabled == '0')
                                return false;
                },
                appstgSummerFall(t){
                        var disabled = app.appstg(t).VALUE;

                        if(disabled == '1')
                                return true;
                        else if(disabled == '0')
                                return false;
                },
                noRender(t, d, s){
                        var md = this.appstgMailonly(t);
                        var dt = this.appstgDisabled(d);
                        var sf = this.appstgSummerFall(s);

                        if(app.usr.IS_ADMIN == '1')
                                return true;
                        else if(md)
                                return false;
                        else if(dt)
                                return false;
                        else if(sf)
                                return false;
                        else
                                return true;
                }
		
	}
})
