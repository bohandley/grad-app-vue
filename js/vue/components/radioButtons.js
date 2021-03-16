Vue.component('two-radio-buttons', {
        props: ['dtpt','objs'],
        template: `
        <div>
                <section v-for="(obj, index) in objs">
                        <input
				v-if="appstgMailonly('appstg_mailonly', obj.VALUE)"
                                type="radio"
                                :name="dtpt.TYP_TEXT"
                                :value="obj.VALUE"
                                v-model="dtpt.VALUE"
                                @change="set"
                        >
                        </input>
                        <label>{{ obj.NAME }}</label>
                </section>
        </div>`,
        methods: {
                set: function(e){
                        var nm = e.target.name
                        var vl = e.target._value;

                        var el = app.dtpt(nm);
                        el.VALUE = vl;

                        app.store(el);
                },
		appstgMailonly(t, opt){
			if(app.usr.IS_ADMIN == '1')
				return true;

                        var mail = app.appstg(t).VALUE;

                        if(mail == '1' && opt == 'pickup')
                                return false;
                        else if(mail == '0')
                                return true;
			else 
				return true;
                }
        }
})

Vue.component('appstg-radio-buttons', {
        props: ['atg','objs'],
        template: `
        <div>
                <section v-for="(obj, index) in objs" style="display:inline-block;margin-right:10px;">
                        <input
                                type="radio"
                                :name="atg.TYP_TEXT"
                                :value="obj.VALUE"
                                v-model="atg.VALUE"
                                @change="set"
                        >
                        </input>
                        <label>{{ obj.NAME }}</label>
                </section>
        </div>
        `,
        methods: {
                set: function(e){
                        var nm = e.target.name
                        var vl = e.target._value;

                        var el = app.appstg(nm);
                        el.VALUE = vl;

                        app.upd_appsetting(el);
                }
        }
})

Vue.component('radio-buttons', {
        props: ['ceremonies', 'cmny'],
        template: `
	<div>
		<section 
			v-if="noRender('appstg_mailonly','appstg_dsb_diploma_ceremony', 'appstg_summerfall')"
			v-for="(cm, index) in ceremonies">

			<input
				type="radio"
				:key="index"
				:name="cm.ID"
				:value="cm.ID"
				v-model="cmny.CEREMONY_ID"
				@change="set"
			>
			<label>{{cm.DEPARTMENT}}</label>
		</section>
		<section>
			<input
				type="radio"
				name="not-attending"
				value="not-attending"
				v-model="cmny.CEREMONY_ID"
				@change="set"
			>
			<label>Not attending</label>
		</section>
	</div>`
        ,
        methods: {
                set: function(e){
                        // get the ceremony
                        // update the dtpt for ceremony rsvp here!
                        var cmny = this.ceremonies.find(cmny=> cmny.ID == e.target.name)
                        if( cmny != null ){
                                app.cmny.CEREMONY_ID = cmny.ID;
                                var el = app.dtpt('dtpt_diploma_cmny_rsvp');
                                el.VALUE = 1;
                                app.store_ticket(app.tkt('tkt_dc'));
                                app.store(app.dtpt('dtpt_diploma_cmny_rsvp'));
                        } else {
                                app.cmny.CEREMONY_ID = "not-attending";
                                var el = app.dtpt('dtpt_diploma_cmny_rsvp');
                                el.VALUE = 0;
                                app.store(app.dtpt('dtpt_diploma_cmny_rsvp'));
                        }
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
        },
        computed:{
                selectedButton(cmny) {
                        if (this.name) {
                                return cmny.CEREMONY_ID === this.name;
                        }
                        return false;
                }
        }
})
