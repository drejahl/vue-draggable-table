<template>
  <div id="app">
    <bmc :canvas="canvas"/>
  </div>
</template>

<script>
import bmc from '../../src/business-model-canvas'

export default {
  name: 'app',
  components: {
    bmc
  },
  data () {
    return {
      canvas: {
        "name": "Test Canvas",
        "partners": [
          {
            "description": "Partner 1",
            "id": "1",
            "color": "#F44E3B"
          }
        ]
      }
    }
  },
  mounted: function() {
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
