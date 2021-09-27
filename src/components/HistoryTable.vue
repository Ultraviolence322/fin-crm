<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount' | locale}}</th>
        <th>{{'Date' | locale}}</th>
        <th>{{'Category' | locale}}</th>
        <th>{{'Type' | locale}}</th>
        <th>{{'Open' | locale}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount | currency }}</td>
        <td>{{ new Date(record.date) | date('datatime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="record.recordClass">{{ record.recordType }}</span>
        </td>
        <td>
          <button class="btn-small btn" @click="$router.push('/detail/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "history-table",
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
 
</style>