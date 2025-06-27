import Vue from 'vue';
import Vuex from 'vuex';
import { getContacts, getCallLogs, toggleFavorite, createCallLog } from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [],
    callLogs: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_LOADING: (state, isLoading) => state.loading = isLoading,
    SET_ERROR: (state, error) => state.error = error,
    SET_CONTACTS: (state, contacts) => state.contacts = contacts,
    SET_CALL_LOGS: (state, logs) => state.callLogs = logs,
    ADD_CALL_LOG: (state, newLog) => state.callLogs.unshift(newLog),
    UPDATE_CONTACT_FAVORITE: (state, updatedContact) => {
      const index = state.contacts.findIndex(c => c.id === updatedContact.id);
      if (index !== -1) Vue.set(state.contacts, index, updatedContact);
    },
  },
  actions: {
    async fetchContacts({ commit }, params) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        commit('SET_CONTACTS', await getContacts(params));
      } catch (err) { commit('SET_ERROR', err.message); } 
      finally { commit('SET_LOADING', false); }
    },
    async fetchCallLogs({ commit }, params) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        commit('SET_CALL_LOGS', await getCallLogs(params));
      } catch (err) { commit('SET_ERROR', err.message); } 
      finally { commit('SET_LOADING', false); }
    },
    async toggleFavoriteAction({ commit }, { contactId, isFavorite }) {
      try {
        const updatedContact = await toggleFavorite(contactId, isFavorite);
        commit('UPDATE_CONTACT_FAVORITE', updatedContact);
      } catch (err) { commit('SET_ERROR', err.message); }
    },
    async createCallLogAction({ commit }, { contactId, contactName }) {
      try {
        const newLog = await createCallLog(contactId);
        newLog.contact = { name: contactName };
        commit('ADD_CALL_LOG', newLog);
        alert(`Call to ${contactName} simulated. Log created.`);
      } catch (err) { 
        commit('SET_ERROR', err.message); 
      }
    },
  },
  getters: {
    allContacts: state => state.contacts,
    allCallLogs: state => state.callLogs,
    isLoading: state => state.loading,
    getError: state => state.error,
  },
});