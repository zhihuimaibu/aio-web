import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './common/router.js'

import element from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(element);
app.use(router);
app.mount('#app');