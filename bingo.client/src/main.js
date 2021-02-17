// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'
import { QuickVue } from '@bcwdev/quickvue'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  .use(QuickVue)
  .mount('#app')
