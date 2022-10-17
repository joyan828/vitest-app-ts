import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);

// global error handler
app.config.errorHandler = (err, vm, info) => {
  console.warn(`[Error Handler] ${err}\nInfo: ${info}`);
};

app.mount('#app')
