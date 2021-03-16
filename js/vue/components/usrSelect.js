Vue.component('usr-select', { 
        props: ['usrs', 'value'], 
        template: ` 
        <span> 
                <select class="form-control" @change="change"> 
                        <option value="">Assume User</option> 
                        <option  
                                v-for="(usr, index) in usrs" 
                                :key="index"  
                                :value="usr.NDID" 
                                :selected="selectedOption(usr)"> 
                                {{ usr.FIRST_NAME + ' ' + usr.LAST_NAME }} 
                        </option> 
                </select> 
        </span>`, 
        data() { 
                return { 
                        selected: "Pugs" 
                } 
        }, 
        methods: { 
                selectedOption(usr) { 
                        if (this.value) { 
                                return usr.NDID === this.value.NDID; 
                        } 
                        return false; 
                }, 
                change(e) { 
                        const selectedCode = e.target.value; 
                        const usr = this.usrs.find((usr) => selectedCode === usr.NDID ); 
                 
                        app.load_usr(selectedCode, usr); 
                        merge(app.assumed_usr, usr); 
                } 
        } 
}) 

