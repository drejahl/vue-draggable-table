<template>
  <div id="app">
    <VueDraggableTable :columns="columns" :records="records"></VueDraggableTable>
  </div>
</template>

<script>
import VueDraggableTable from '../../src/draggable-table.vue'

export default {
  name: 'app',
  components: {
    VueDraggableTable
  },
  data () {
    return {
      'columns': [
        {
          'id': 'c1',
          'name': 'column1',
          'type': 'string'
        },
        {
          'id': 'c2',
          'name': 'column2',
          'type': 'number'
        },
        {
          'id': 'c3',
          'name': 'column3',
          'type': 'chip'
        }
      ],
      records: {
        '_embedded': {
          'item': [
            {
              'c1': 'bill',
              'c2': 123,
              'c3': [ 'yay' ]
            }
          ]
        }
      }
    }
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
