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
    if (this.column.type==="number" || this.column.type==="moneyGBP") {
      this.style="text-align: right";
    } else {
      this.style="text-align: left";
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
