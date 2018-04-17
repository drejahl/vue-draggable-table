<template>
  <div class="draggable-table">
    <table class="table">
      <thead v-draggable="myColumns">
        <th style="text-align: left;" v-if="selectablerows">
        </th>
        <template v-for="column in myColumns">
          <th is="tableHeader" :column="column" :sort="sort" v-on:sortcolumn="sortCol" ></th>
        </template>
      </thead>
      <tbody>
        <tr is="tableRow" v-for="(row,index) in filteredData" :selectablerows="selectablerows"
          :key="index" :index="index" @rowToggle="rowToggle" :row="row" :columns="myColumns">
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'

import tableHeader from './table-header.vue';
import tableRow from './table-row.vue';
import Sortable from 'sortablejs';

export default {
  name: 'draggable-table',
  components: {
    tableHeader,
    tableRow
  },
  directives: {
    draggable: {
      inserted: function(el, binding, a) {
        const self = this;
        Sortable.create(el, {
          draggable: ".draggable",
          onEnd: function(e) {
            var clonedItems = a.context[binding.expression].filter(function(item) {
              return item;
            });
            clonedItems.splice(e.newIndex, 0, clonedItems.splice(e.oldIndex, 1)[0]);
            a.context[binding.expression] = [];
            //Vue.nextTick(function() {
            //  a.context[binding.expression] = clonedItems;
            //});
          }
        });
      }
    }
  },
  props: {
    records: Object,
    columns: Array,
    sort: Object,
    selectablerows: Boolean,
    selected: Array
  },
  data () {
    return {
      searchQuery: "",
      myColumns: []
    }
  },
  mounted: function() {
    this.myColumns = this.columns;
  },
  methods: {
    rowToggle: function(cb) {
      if (this.records._embedded.numSelected === undefined) {
        this.records._embedded.numSelected = 0;
      }
      this.selected[cb.index] = cb.newValue;
      if (cb.newValue === true) {
        this.records._embedded.numSelected++;
      } else {
        this.records._embedded.numSelected--;
      }
    },
    sortCol: function(data) {
      var column = data.column;
      if (!column.sortable) return;

      //respond to click vs set from settings
      if (data.event) {
        //change sort order
        if (this.sort.on === column.id) {
          //change sort order
          if (this.sort.direction === "desc" || !this.sort.direction) {
            this.sort.direction = "asc";
          } else {
            this.sort.direction = "desc";
          }
        } else {
          //change sort column, default to asc
          this.sort.on = column.id;
          this.sort.direction = "asc";
          this.sort.type = column.type;
        }
      }

      var direction = this.sort.direction;
      var on = this.sort.on;
      var type = this.sort.type;

      if (this.records && this.records._embedded) {
        this.records._embedded.item.sort(function(a, b) {
          if (type === "string") {
            var propA = getProp(a, on);
            var propB = getProp(b, on);
            if (direction === "asc") {
              return propA.localeCompare(propB);
            } else if (direction === "desc") {
              return propB.localeCompare(propA);
            }
          } else {
            if (direction === "asc") {
              return a<b;
            } else if (direction === "desc") {
              return b<=a;
            }
          }
        });
      }
    }
  },
  computed: {
    filteredData: function() {
      if (this.records && this.records._embedded) {
        var filterKey = this.searchQuery && this.searchQuery.toLowerCase();
        var data = this.records._embedded.item;
        var cols = this.myColumns;
        if (filterKey) {
          data = data.filter(function(row) {
            return cols.reduce(function(accumulator, col) {
              if (accumulator || !col.id) {
                return accumulator;
              }
              var colVal = col.id;

              return (
                String(getProp(row, colVal)).toLowerCase().indexOf(filterKey) > -1
              );
            }, false);
          });
        }
        return data;
      } else {
        return [];
      }
    }
  }
}

function getProp(obj, path) {
  var parts = path.split(".");
  while (parts.length) {
    obj = obj[parts.shift()];
  }
  return obj;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draggable {
  cursor: move;
}
</style>
