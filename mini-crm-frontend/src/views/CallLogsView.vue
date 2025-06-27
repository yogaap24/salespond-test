<template>
    <div class="call-logs">
        <h1>Call Logs</h1>
        <div class="filters">
            <label for="start_date">From:</label>
            <input type="date" id="start_date" v-model="filters.start_date" />
            <label for="end_date">To:</label>
            <input type="date" id="end_date" v-model="filters.end_date" :min="filters.start_date" />
        </div>

        <div v-if="isLoading">Loading logs...</div>
        <div v-else-if="getError" class="error">{{ getError }}</div>

        <table v-else>
            <thead>
                <tr>
                    <th>Contact</th>
                    <th>Timestamp</th>
                    <th>Duration</th>
                    <th>Status</th>
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

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CallLogsView',
    data() {
        return {
            filters: {
                start_date: '',
                end_date: '',
            },
        };
    },
    computed: {
        ...mapGetters(['allCallLogs', 'isLoading', 'getError']),
    },
    watch: {
        'filters.start_date'() {
            if (this.filters.start_date > this.filters.end_date) {
                this.filters.end_date = this.filters.start_date;
            }
            this.performFetch();
        },
        'filters.end_date'() {
            if (this.filters.end_date < this.filters.start_date) {
                this.filters.end_date = this.filters.start_date;
            }
            this.performFetch();
        },
    },
    created() {
        this.performFetch();
    },
    methods: {
        ...mapActions(['fetchCallLogs']),
        performFetch() {
            const { start_date, end_date } = this.filters;
            
            if (start_date && end_date) {
                const params = new URLSearchParams();
                params.append('start_date', start_date);
                params.append('end_date', end_date);
                this.fetchCallLogs(params);
            } else if (!start_date && !end_date) {
                this.fetchCallLogs();
            }
        },
        formatTimestamp(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp).toLocaleString('id-ID');
        },
    },
};
</script>

<style scoped>
.call-logs {
    font-family: sans-serif;
}

.filters {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.error {
    color: red;
}
</style>