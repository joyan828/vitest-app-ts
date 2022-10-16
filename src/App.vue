<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {defineComponent, ref, watch, watchEffect} from 'vue'
import Header from './components/Header.vue'
import Asset from './components/Asset.vue'
import Notification from './components/Notification.vue'

const loggedIn = ref<Boolean>(false)
const type = ref<String>('')
const message = ref<String>('')

const reset = () => {
  type.value = ''
  message.value = ''
}

const login = () => {
  loggedIn.value = !loggedIn.value
}

watch(loggedIn, () => {
  if(loggedIn.value) {
    type.value = 'success'
    message.value = 'Logged in!'
  } 
})
</script>

<template>
  <Header :loggedIn="loggedIn" @set-status="login"/>
  <Asset :loggedIn="loggedIn"/>
  <Notification :type="type" :message="message" @clear-notification="reset"/>
</template>

<script lang="ts">
  export default defineComponent({
    name: "App",
    components: {Header, Asset, Notification},
  });
</script>

<style>
  .notification {
    transition: all 500ms ease-out;
    opacity: 0;
    z-index: 300001;
    transform: translateY(-100vh);
    box-sizing: bordr-box;
    padding: 10px 15x;
    width: 100%;
    max-width: 730px;
    /* margin: 0 auto; */
    display: flex;
    position: fixed;
    /* left: 0; */
    top: 20px;
    right: 15px;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    min-height: 48px;
    box-sizing: border-box;
    color: #fff;
  }

  .notification--slide {
    transform: translateY(0px);
    opacity: 1;
  }

  .notification--error {
    background-color: #fdecec;
  }

  .notification__text {
    margin: 0;
    margin-left: 17px;
    margin-right: auto;
  }

  .notification--error .notification__text {
    color: #f03d3e;
  }

  .notification--success {
    background-color: #e1f9f2;
  }

  .notification--success > .notification__text {
    color: #146354;
  }

  .notification--info {
    background-color: #ffb647;
  }

  .notification__button {
    border: 0;
    background-color: transparent;
  }
</style>
