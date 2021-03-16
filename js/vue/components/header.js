Vue.component('app-header', {
        props: ['usr', 'usrs', 'assumed_usr', 'new_usr'],
        template: `
        <div>
        <div id="jumbo-top">
                <div class="sign-in col-lg-4 col-sm-8">
                <table class="table header table-borderless">
                <tr>
                        <td colspan="2">
                                <input
                                        class="form-control sign-in"
                                        v-model="usr.NDID"
                                        placeholder="NDID"
                                >
                                </input>
                        </td>
                        <td>
                                <button @click="set_usr" type="button" class="btn btn-secondary sign-in">Sign In</button>
                        </td>
			<td>
                                <button @click="register" type="button" class="btn btn-secondary sign-in">Register</button>
                        </td>
                </tr>
                <tr v-if="usr.IS_ADMIN == '1'">
                        <td colspan="2">
                                <usr-select
                                        v-model="assumed_usr"
                                        :usrs="usrs"
                                >
                                </usr-select>
                        </td>
                        <td colspan="2" style="vertical-align:middle;">
                                Assumed user:  {{get_assumed_usr_name()}}
                        </td>
                </tr>
                </table>
                </div>
        </div>
        <div id="jumbo-mid">
        </div>
        <div id="jumbo-bottom" class="jumbotron jumbotron-fluid">
                <div class="container">
                        <div>
                        <img id="jumbo-image" src="assets/images/ndmarkwhite.png" alt="ndmark600">
                        <h1 id="jumbo-header" class="display-4">The GradApp</h1>
                        </div>
                </div>

        </div>
        </div>`,
        methods: {
                set_usr(){
			app.reg_usr = 0;
			app.reg_success = 0;
                        merge(this.assumed_usr, {FIRST_NAME: '', LAST_NAME: '', ID:'', IS_ADMIN:'',NDID:''});
                        const selectedCode = this.usr.NDID;
                        const usr = this.usrs.find((usr) => selectedCode === usr.NDID );

                        app.load_usr(selectedCode, usr);
			
                        merge(this.usr, usr);
			app.active_tab = "welcome";
                },
                assume_usr(){
                        const selectedCode = this.assumed_usr.NDID;
                        const assumed_usr = this.usrs.find((usr) => selectedCode === usr.NDID );

                        app.load_usr(selectedCode, assumed_usr);
                        merge(this.assumed_usr, assumed_usr)
                },
                get_assumed_usr_name(){
                        return this.assumed_usr.FIRST_NAME + ' ' + this.assumed_usr.LAST_NAME;
                },
                get_welcome(){
                        if(this.usr.ID != '')
                                return 'Welcome, ' + this.usr.FIRST_NAME + ' ' + this.usr.LAST_NAME;
                },
		register(){
			app.usr = { IS_ADMIN: '', FIRST_NAME: '', LAST_NAME: '', NDID: ''}
			app.reg_usr = 1;
		}
        }
})
