Vue.component('admintext-input',{
        props: ['usr', 'el_show'],
        template: `
                <div style="text-align:center;">
                <div v-if="usr.IS_ADMIN == '1'">
                        <textarea
                                rows="4"
                                cols="19"
                                v-if="inputShown()"
                                class="form-control"
                                v-model="getText().ADMINTEXT"
                        ></textarea>
                        <button
                                @click="show"
                                type="button"
                                class="btn btn-secondary"
                                v-if="inputHidden()"
                        >Edit admintext</button>
                        <button
                                @click="updateVal"
                                type="button"
                                class="btn btn-secondary"
                                v-if="inputShown()"
                        >Update and hide input</button>

                </div>
                </div>
        `,
        methods: {
                inputShown(){
                        if(this.el_show.SHOW == '1')
                                return true;
                        else
                                return false;
                },
                inputHidden(){
                        if(this.el_show.SHOW == '0')
                                return true;
                        else
                                return false;
                },
                show() {
                        this.el_show.SHOW = '1';
                },
                updateVal(){
                        app.upd_admintext(app.g_admtxt(this.el_show.TYP_TEXT));
                        this.el_show.SHOW = '0';
                },
                getText(){
                        return app.g_admtxt(this.el_show.TYP_TEXT);
                }

        }
})

