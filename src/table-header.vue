<template>
    <th :style="style" v-show="!column.hide"
      :class="{draggable: column.canMove}" @click="sortMe({column: column, event: true})">
      {{column.name}}
      <ion-icon v-if="column.sortable && sort.on === column.id && sort.direction === 'asc'" name="arrow-dropdown"></ion-icon>
      <ion-icon v-if="column.sortable && sort.on === column.id && sort.direction === 'desc'" name="arrow-dropup"></ion-icon>
      </i>
    </th>
</template>

<script>
export default {
  name: 'table-header',
  props: ["column", "sort"],
  data() {
    return{
      style: ""
    }
  },
  mounted: function() {
    if ((this.column.type==="number" && !this.column.linkAway) || this.column.type==="moneyGBP") {
      this.style="text-align: right; padding-right: 5px;";
    } else {
      this.style="text-align: left; padding-right: 5px; ";
    }
    if (this.column.style) {
      this.style = this.style.concat(this.column.style);
    }
  },
  methods: {
    sortMe: function(data) {
      this.$emit("sortcolumn", data);
    }
  }
}
</script>

<style scoped>
.draggable {
  cursor: move;
}
</style>
