<template>
  <tr>
    <template v-for="column in columns">
      <td style="text-align: left;" v-show="!column.hide">{{row[column.id]}}</td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  props: ["row", "columns"]
}
</script>
