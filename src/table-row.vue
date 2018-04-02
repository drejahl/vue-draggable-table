<template>
  <tr>
    <template v-for="column in columns">
      <td v-show="!column.hide">{{row[column.id]}}</td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  props: ["row", "columns"]
}
</script>
