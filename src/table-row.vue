<template>
  <tr>
    <template v-for="column in columns">
      <td style="text-align: left;" v-if="!column.hide && column.type === 'chip' && !column.linkAway">
        <v-chip v-for="(c,i) in getColumn(column)" :key="i">{{c}}</v-chip>
      </td>
      <td style="text-align: left;" v-show="!column.hide && column.type === 'string' && !column.linkAway">
        {{getColumn(column)}}
      </td>
      <td style="text-align: right;" v-show="!column.hide && column.type === 'number' && !column.linkAway">
        {{row[column.id]}}
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type != 'icon' && column.linkAway">
        <router-link :to="row[column.linkAway]">{{row[column.id]}}</router-link>
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type === 'icon'  && !column.linkAway">
        <i class="icon material-icons">{{row[column.id]}}</i>
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type === 'date'">
        {{formatedDate(row[column.id], column.dateFormat)}}
      </td>
    </template>
  </tr>
</template>

<script>
import fecha from 'fecha'

export default {
  name: 'table-row',
  props: ["row", "columns"],
  methods: {
    formatedDate: function(d,f){
      console.log("DATE", d)
      return fecha.format( parseInt(d),f);
    },
    getColumn: function(column) {
      return this.row[column.id] ? this.row[column.id] : this.row[column.altId];
    }
  }
}
</script>
