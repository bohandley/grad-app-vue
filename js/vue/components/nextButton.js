Vue.component('next-button', {
	template: `
		<button 
			type="button"
			class="btn btn-success"
			@click="next"
		>Save and Continue</button>
	`,
	methods: {
		next: function(){
			//['welcome', 'diploma_info', 'diploma_ceremony', 'umass', 'uceremony', 'confirm']
			var tabIdx = app.tab_order.findIndex(function(el){ return el == app.active_tab});
			
			var nxtIdx = tabIdx + 1;

			// check if the next index should be rendered or not, skip to the next one if it's not
			var doRender = this.renderConditions(app.tab_order[nxtIdx]);

			while(!doRender){
				nxtIdx += 1;
				doRender = this.renderConditions(app.tab_order[nxtIdx])
			}

			var thisTab = app.tab_order[tabIdx];

			var nxtTab = app.tab_order[nxtIdx];
			
			// store that they have saved and confirmed this tabs data
			var typ_t = 'dtpt_' + thisTab  + '_conf';

			var dtpt_conf = app.dtpt(typ_t);

			dtpt_conf.VALUE = '1';

			app.store(dtpt_conf);

			app.active_tab = nxtTab;
		},
		appstgMailonly(t){
                        var mail = app.appstg(t).VALUE;

                        if(mail == '1')
                                return true;
                        else if(mail == '0')
                                return false;
                },
                appstgDisabled(t){
			if(app.usr.IS_ADMIN == '1')
				return false;

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
                },
		renderConditions(nxtTab){
			if(nxtTab == 'diploma_info'){
				return !this.appstgDisabled('appstg_dsb_diploma_info');
			} else if (nxtTab == 'diploma_ceremony'){
				return !this.appstgDisabled('appstg_dsb_diploma_ceremony');
			} else if (nxtTab == 'umass'){
				return this.noRender('appstg_mailonly','appstg_dsb_umass', 'appstg_summerfall');
			} else if (nxtTab == 'uceremony'){
				return this.noRender('appstg_mailonly','appstg_dsb_uceremony', 'appstg_summerfall');
			} else 
				return true;
		}
	}
})
