import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import router from "./router/router"
import { createPinia } from "pinia"
import "./firestore"
import MasonryWall from "@yeger/vue-masonry-wall"

createApp(App).use(createPinia()).use(router).use(MasonryWall).mount("#app")
