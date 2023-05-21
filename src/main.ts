import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import router from "./router/router"
import { createPinia } from "pinia"
import "./firestore"
import MasonryWall from "@yeger/vue-masonry-wall"
import globalComponents from "./plugins/globalComponents"

const app = createApp(App)

app.use(createPinia()).use(router).use(MasonryWall)
app.use(globalComponents)

app.mount("#app")
