Vue.component('register-usr', {
        props: ['new_usr', 'ndid', 'reg_success'],
        template: `
        <div class="container centered">
                <div class="row tab-view">
                        <div class="col-sm-12 col-lg-5 c-div">
                                <h4>Register New User</h4>
                                <ul>
                                        <li>
                                                Please enter your first and last name as they are in ND's database.
                                        </li>
                                        <li>
                                                We will match your name with the degrees present in our database.
                                        </li>
                                        <li>
                                                Please contact the Office of the Registrar if you have issues.
                                        </li>
                                </ul>
                                <table class="table table-hover">
					<tbody>
                                        <tr>
                                                <td>
                                                        <label>First Name:</label>
                                                </td>
                                                <td>
                                                        <input class="form-control" v-model="new_usr.f_name"></input>
                                                </td>
                                        </tr>
                                        <tr>
                                                <td>
                                                        <label>Last Name:</label>
                                                </td>
                                                <td>
                                                        <input class="form-control" v-model="new_usr.l_name"></input>
                                                </td>
                                        </tr>
                                        <tr>
                                                <td colspan="2">
                                                        <button type="button" v-bind:disabled="reg_success == 1" class="btn btn-success float-right" @click="create_usr">Register</button>
                                                </td>
                                        </tr>
                                        <tr v-if="reg_success">
                                                <td colspan="2">
                                                        <p>
                                                                You have successfully registered for the GradApp and are now signed in.
                                                                Please sign in with the following nin digit number if you leave the app.
								Please click the blue return button to return to the app.
                                                                <b>{{ndid}}</b>
                                                        </p>

                                                </td>
                                        </tr>
                                        <tr>
                                                <td colspan="2">
                                                        <button type="button" class="btn btn-primary float-right" @click="rtn">Return</button>
                                                </td>
                                        </tr>
					</tbody>
                                </table>
                        </div>
                </div>
        </div>`,
        methods: {
                create_usr: function() {
			var f_name = this.new_usr.f_name;

			var l_name = this.new_usr.l_name;

			if(f_name == ''){
				alert('Please enter a valid name');
				return;
			}
			var url = app.baseUrl + '/php/create_usr.php';

			var formData = new FormData();
			formData.append('f_name', f_name);
			formData.append('l_name', l_name);

			fetch(url, {
				method: 'POST',
				body: formData
			}).then(response=> response.text())
			.then(response=>{
				if(response[0] == "9"){
					app.ndid = response;
				
					app.reg_success = 1;
				
					var nu = { IS_ADMIN: '', FIRST_NAME: this.new_usr.f_name, LAST_NAME: this.new_usr.l_name, NDID: response};

					app.usr.IS_ADMIN = '';
					
					// give Ramzi admin access
					//if(nu.FIRST_NAME == "Ramzi")
						//nu.IS_ADMIN = '1';

					merge(app.usr, nu);

					app.load_usr('', app.usr);
				} else
					alert(response);
			}).catch(error=> console.log(error));
                },
                rtn: function() {
			app.active_tab = 'welcome';
                        app.reg_usr = 0;
                        app.reg_success = 0;
                        this.new_usr.f_name = '';
                        this.new_usr.l_name = '';
                }
        }
})
