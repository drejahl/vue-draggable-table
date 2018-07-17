<template>
  <tr>
    <td style="text-align: left;" width="10px" v-if="selectablerows">
      <v-checkbox light ripple v-model="cb" @change="changed"></v-checkbox>
    </td>
    <template v-for="column in columns">
      <td style="text-align: left;" v-if="!column.hide && column.type === 'chip' && !column.linkAway">
        <v-chip v-for="(c,i) in getColumn(column)" :key="i">{{c}}</v-chip>
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type === 'linkList'">
        <div v-for="(link,i) in getColumnJSON(column)" :key="link.link">
          <router-link :to="link.link">{{link.label}}</router-link>
        </div>
      </td>
      <td style="text-align: left;" v-show="!column.hide && column.type === 'string' && !column.linkAway">
        {{getColumn(column)}}
      </td>
      <td style="text-align: right;" v-show="!column.hide && column.type === 'moneyGBP' && !column.linkAway">
        £{{Number(getColumn(column)).formatMoney(2)}}
      </td>
      <td style="text-align: right;" v-show="!column.hide && column.type === 'number' && !column.linkAway">
        {{row[column.id]}}
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type != 'icon' && column.linkAway">
        <router-link v-if="row[column.linkAway]" :to="row[column.linkAway]">{{row[column.id]}}</router-link>
        <span v-else>{{row[column.id]}}</span>
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type === 'icon'  && !column.linkAway">
        <i class="icon material-icons">{{row[column.id]}}</i>
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type === 'date'">
        {{formatedDate(row[column.id], column.dateFormat)}}
      </td>
      <td style="text-align: left;" v-if="!column.hide && column.type === 'avatar'">
        <img style="height: 30px; width: 30px; border-radius: 15px;" :src="row[column.id]"/>
      </td>
    </template>
  </tr>
</template>

<script>
Number.prototype.formatMoney = function(c, d, t){
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

import fecha from 'fecha'

export default {
  name: 'table-row',
  props: ["row", "columns", "selectablerows", "index"],
  data() {
    return {
      cb: false
    }
  },
  methods: {
    formatedDate: function(d,f){
      return fecha.format( parseInt(d),f);
    },
    getColumnJSON: function(column) {
      let c = this.row[column.id];

      console.log("C", c)
      return c;
    },
    changed: function () {
       this.$emit('rowToggle', { index: this.index, newValue: this.cb });
    },
    getColumn: function(column) {
      let c = this.row[column.id] ? this.row[column.id] : this.row[column.altId];
      if (column.truncate && c.length > column.truncate) {
        c = c.substring(0, column.truncate-1) + '...';
      }
      return c;
    },
    changed: function () {
       this.$emit('rowToggle', { index: this.index, newValue: this.cb });
    }
  }
}
</script>
