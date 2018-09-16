<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import tab from './components/tab/tab'
import Player from './components/player/player'
export default {
  name: 'App',
  components: {
    MHeader,
    tab,
    Player
  }
}
</script>

<style>
</style>
