import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import categories from './categories'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(s, error) {
      s.error = error
    },
    clearError(s) {
      s.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch('https://www.cbr-xml-daily.ru/latest.js')
      return res.json();
    }
  },
  getters: {
    error(s) {
      return s.error
    }
  },
  modules: {
    auth,
    info,
    categories,
    record
  }
})
