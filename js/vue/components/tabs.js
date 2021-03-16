Vue.component('tabs',{
        props: ['isadmin', 'active_tab','student_data', 'usr','degree','ceremonies','cmny','appsettings','admintexts'],
        template: `
        <ul class="tabs nav nav-items nav-justified">
                <li 
			:class=" isActive('welcome', 'dtpt_welcome_conf')" 
			@click="selectTab('welcome')" 
			class="nav-item nav-rounded"
		>
                        <p class="nav-link a-tab" href="#/">Welcome</p>
                </li>
                <li 
			v-if="!appstgDisabled('appstg_dsb_diploma_info')"
			class="nav-item nav-rounded" 
			:class="isActive('diploma_info', 'dtpt_diploma_info_conf')" 
			@click="selectTab('diploma_info')"
		>
                        <p class="nav-link a-tab" href="#/">Diploma Information</p>
                </li>
                <li 
			v-if="!appstgDisabled('appstg_dsb_diploma_ceremony')"
			class="nav-item nav-rounded" 
			:class="isActive('diploma_ceremony', 'dtpt_diploma_ceremony_conf')" 
			@click="selectTab('diploma_ceremony')"
	
		>
                        <p class="nav-link a-tab" href="#/">Diploma Ceremony</p>
                </li>
                <li 
			v-if="noRender('appstg_mailonly','appstg_dsb_umass', 'appstg_summerfall')"
			class="nav-item nav-rounded" 
			:class="isActive('umass', 'dtpt_umass_conf')" 
			@click="selectTab('umass')"

		>
                        <p class="nav-link a-tab" href="#/">University Mass</p>
                </li>
                <li 
			v-if="noRender('appstg_mailonly','appstg_dsb_uceremony', 'appstg_summerfall')"
			class="nav-item nav-rounded" 
			:class="isActive('uceremony', 'dtpt_uceremony_conf')" 
			@click="selectTab('uceremony')"

		>
                        <p class="nav-link a-tab" href="#/">University Ceremony</p>
                </li>
                <li 
			class="nav-item nav-rounded" 
			:class="isActive('confirm', 'dtpt_confirm_email')" 
			@click="selectTab('confirm')"
		>
                        <p class="nav-link a-tab" href="#/">Confirmation</p>
                </li>
                <li 
			class="nav-item nav-rounded" 
			v-if="isadmin == '1'" 
			:class="isActive('appsettings')" 
			@click="selectTab('appsettings')"
		>
                        <p class="nav-link a-tab" href="#/">Appsettings</p>
                </li>
                <li 
			class="nav-item nav-rounded" 
			v-if="isadmin == '1'" 
			:class="isActive('admintexts')" 
			@click="selectTab('admintexts')"
		>
                        <p class="nav-link a-tab" href="#/">Admintexts</p>
                </li>
		<li
                        class="nav-item nav-rounded"
                        v-if="isadmin == '1'"
                        :class="isActive('reports')"
                        @click="selectTab('reports')"
                >
                        <p class="nav-link a-tab" href="#/">Reports</p>
                </li>
        </ul>`,
        methods: {
                isActive(tab, typ_t=false){
			var clss = '';
                        if( tab == this.$props.active_tab )
                                clss +=  "active ";
			
			// apply the not-saved class
                        if((app && typ_t && app.usr.IS_ADMIN != '1' && app.dtpt(typ_t).VALUE == '') ||!app  || (app && app.usr.NDID == ''))
                                clss += "notsaved";
	
			return clss;	
                },
                selectTab(tab){
			// if the student has saved on the current active  tab or is_admin = 1, 
			// then the usr can navigate to this clicked tab
			var selectedTabIdx = app.tab_order.findIndex(function(el){ return el == tab});

			var selectedTab = app.tab_order[selectedTabIdx];
	
			var typ_t_conf = 'dtpt_' + selectedTab  + '_conf';		
			
			if(tab == 'confirm')
				typ_t_conf = 'dtpt_confirm_email';

			// if they have saved on the selected tab, they may navigate to it
			var dtpt_conf = app.dtpt(typ_t_conf);
			
			if((dtpt_conf != null && dtpt_conf.VALUE == '1' ) || app.usr.IS_ADMIN == '1')
				app.active_tab = tab;

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
