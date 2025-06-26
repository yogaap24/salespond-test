<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'CallLogsView',
    data: () => ({
      filters: { start_date: '', end_date: '' },
    }),
    computed: { ...mapGetters(['allCallLogs', 'isLoading', 'getError']) },
    watch: {
      filters: {
        handler: 'performFetch',
        deep: true,
      },
    },
    created() { this.fetchCallLogs(); },
    methods: {
      ...mapActions(['fetchCallLogs']),
      performFetch() {
        if (this.filters.start_date && this.filters.end_date) {
          const params = new URLSearchParams(this.filters);
          this.fetchCallLogs(params);
        } else if (!this.filters.start_date && !this.filters.end_date) {
          this.fetchCallLogs();
        }
      },
      formatTimestamp: (ts) => ts ? new Date(ts).toLocaleString('id-ID') : '',
    },
  };
</script>
<template>
  <div>
    <h1>Call Logs</h1>
    <div class="filters">
      <label for="start_date">From:</label>
      <input type="date" id="start_date" v-model="filters.start_date" />
      <label for="end_date">To:</label>
      <input type="date" id="end_date" v-model="filters.end_date" />
    </div>
    <div v-if="isLoading">Loading logs...</div>
    <div v-else-if="getError" class="error">{{ getError }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>Contact</th><th>Timestamp</th><th>Duration</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in allCallLogs" :key="log.id">
          <td>{{ log.contact ? log.contact.name : 'N/A' }}</td>
          <td>{{ formatTimestamp(log.timestamp) }}</td>
          <td>{{ log.duration }} seconds</td>
          <td>{{ log.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .filters { margin-bottom: 20px; display: flex; gap: 10px; align-items: center; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; }
  .error { color: red; }
</style>