import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

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
    },
    customProperties: true,
    icons: {
        iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
});
