<template>
    <th style="text-align: left;" v-show="!column.hide"
      :class="{draggable: column.canMove}" @click="sortMe({column: column, event: true})">
      {{column.name}}
      <!--i v-if="column.sortable && sort.on === column.id" class="fa" :class="{'fa-sort-amount-asc': sort.direction === 'asc',
          'fa-sort-amount-desc': sort.direction === 'desc'}" aria-hidden="true">
      </i-->
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
