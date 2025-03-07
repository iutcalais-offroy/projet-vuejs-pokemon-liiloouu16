import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import {router} from './router';
import NaiveUi from 'naive-ui'

const pinia = createPinia();
const app = createApp(App);

app.use(NaiveUi)
app.use(pinia);
app.use(router)
app.mount('#app');
