import { createApp } from 'vue'
import router from './router'
import landingPage from "@/views/landing-page.vue";

createApp(landingPage).use(router).mount('#app')
