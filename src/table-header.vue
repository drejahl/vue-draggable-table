<template>
    <th style="text-align: left;" v-show="!column.hide"
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
