import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import './style.css';
import 'ant-design-vue/dist/antd.css';
import { router } from './router/index';
import { createPinia } from 'pinia';
import { checkUserIsLoggedIn } from './api/auth';

const pinia = createPinia();

const app = createApp(App).use(router).use(pinia).use(Antd);
checkUserIsLoggedIn()
	.catch(err => console.log(err))
	.finally(() => app.mount('#app'));
