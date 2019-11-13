<template>
  <div id="app">
    
   <VuePopupPlugin :config="popupDefaultConfig"/>
    <router-view />
  </div>

</template>


<script>
//import Home from './components/Home.vue'

export default {
  components:{
    
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
}
body {
  background: black;
}
</style>