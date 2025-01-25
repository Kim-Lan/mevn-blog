import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faPlus, faGithub);

const pinia = createPinia();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount('#app');
