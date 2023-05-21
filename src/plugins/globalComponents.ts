import type { App } from "vue"
import BaseIcon from "@/components/base/BaseIcon.vue"
import BaseButton from "@/components/base/BaseButton.vue"

export default {
  install: (app: App<Element>) => {
    app.component("Icon", BaseIcon)
    app.component("BaseButton", BaseButton)
  },
}
