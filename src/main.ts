import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import router from "./router/router"
import { createPinia } from "pinia"
import "./firestore"

createApp(App).use(createPinia()).use(router).mount("#app")
