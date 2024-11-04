import { createApp } from 'vue'

//import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import toolTips from './directives/toolTips.js'
import App from './App.vue'


import router from './routes.js'



createApp(App).use(router).directive('toolTips', toolTips).component("fa", FontAwesomeIcon).mount('#app')
