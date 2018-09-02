<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import tab from './components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    tab
  }
}
</script>

<style>
</style>
