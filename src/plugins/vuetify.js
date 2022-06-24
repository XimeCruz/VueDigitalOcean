import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes:{
            light:{
                primary:"#195582",
                secondary: '#2F88CE',
                accent: '#ffd740',
                error: '#F44038',
            }
        }
    }
});
