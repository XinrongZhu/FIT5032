// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlpjUX1JL0yxzdyVoMGB3zjy2petGHiHI",
  authDomain: "week7-xinrong.firebaseapp.com",
  projectId: "week7-xinrong",
  storageBucket: "week7-xinrong.appspot.com",
  messagingSenderId: "257955301281",
  appId: "1:257955301281:web:6ff56c2d98b123b0feade0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')


