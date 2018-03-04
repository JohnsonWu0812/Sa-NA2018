<template>
  <div id="app">
    <div class="ui container">
      <host-table2></host-table2>
    </div>
  </div>
</template>

<script>
import HostTable2 from './components/HostTable2/HostTable2'

export default {
  name: 'app',
  components: {
    HostTable2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
