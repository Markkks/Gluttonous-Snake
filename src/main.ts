import 'normalize.css';
import '@/assets/style/firstScreen.scss';

import { createApp } from 'vue';
import { ElButton, ElContainer, ElHeader, ElMain } from 'element-plus';
import App from './App.vue';

const app = createApp(App);

app.use(ElContainer);
app.use(ElHeader);
app.use(ElMain);
app.use(ElButton);
app.mount('#app');
