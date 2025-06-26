<template>
  <div>
    <h1>Contacts</h1>
    <div class="filters">
      <input v-model="filters.company" type="text" placeholder="Filter by Company..."/>
      <select v-model="filters.role">
        <option value="">All Roles</option>
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="QA Engineer">QA Engineer</option>
      </select>
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="getError" class="error">{{ getError }}</div>

    <table v-else class="contact-table">
      <thead>
        <tr>
          <th class="col-fav">Fav</th>
          <th class="col-name">Name</th>
          <th class="col-company">Company</th>
          <th class="col-role">Role</th>
          <th class="col-action">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in allContacts" :key="contact.id">
          <td>
            <span class="action-icon" @click="toggleFav(contact)">
              {{ contact.is_favorite ? '❤️' : '♡' }}
            </span>
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.company }}</td>
          <td>{{ contact.role }}</td>
          <td>
            <span class="action-icon" @click="callContact(contact.id)">
              📞
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  // BAGIAN SCRIPT TIDAK PERLU DIUBAH SAMA SEKALI
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'ContactsView',
    data: () => ({
      filters: { company: '', role: '' },
      debounceTimer: null,
    }),
    computed: { ...mapGetters(['allContacts', 'isLoading', 'getError']) },
    watch: {
      filters: {
        handler() {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = setTimeout(() => this.performFetch(), 500);
        },
        deep: true,
      },
    },
    created() {
      this.filters.company = this.$route.query.company || '';
      this.filters.role = this.$route.query.role || '';
      this.performFetch();
    },
    methods: {
      ...mapActions(['fetchContacts', 'toggleFavoriteAction', 'createCallLogAction']),
      performFetch() {
        const params = new URLSearchParams();
        if (this.filters.company) params.append('company', this.filters.company);
        if (this.filters.role) params.append('role', this.filters.role);
        this.$router.push({ query: this.filters }).catch(() => {});
        this.fetchContacts(params);
      },
      toggleFav(contact) {
        this.toggleFavoriteAction({ contactId: contact.id, isFavorite: !contact.is_favorite });
      },
      callContact(contactId) {
        this.createCallLogAction(contactId);
      },
    },
  };
</script>

<style scoped>
  /* MENYESUAIKAN STYLE UNTUK TAMPILAN TABEL */
  .filters { margin-bottom: 20px; }
  .filters input, .filters select { margin-right: 10px; padding: 8px; }

  .contact-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  .contact-table th, .contact-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }
  .contact-table th {
    background-color: #f4f4f4;
  }
  .contact-table tbody tr:hover {
    background-color: #f9f9f9;
  }

  .action-icon {
    cursor: pointer;
    font-size: 1.5em;
  }
  .col-fav { width: 5%; text-align: center; }
  .col-action { width: 5%; text-align: center; }
  .col-name { width: 30%; }
  .col-company { width: 30%; }
  .col-role { width: 25%; }

  .error { color: red; }
</style>