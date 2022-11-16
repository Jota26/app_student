import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
let app = createApp(App);
app.config.globalProperties.$globalVariable = ["a", "b", "c"];
// global

// use component instance export default

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-icons/font/bootstrap-icons.css";
app.use(store).use(router).mount("#app");
