<template>
  <tr>
    <template v-for="column in columns">
      <td style="text-align: left;" v-show="!column.hide && column.type != 'icon' && !column.linkAway">
        {{row[column.id]}}
      </td>
      <td style="text-align: left;" v-show="!column.hide && column.type != 'icon' && column.linkAway">
        <router-link :to="row[column.linkAway]">{{row[column.id]}}</router-link>
      </td>
      <td style="text-align: left;" v-show="!column.hide && column.type === 'icon'  && !column.linkAway">
        <i class="icon material-icons">{{row[column.id]}}</i>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'table-row',
  props: ["row", "columns"]
}
</script>
