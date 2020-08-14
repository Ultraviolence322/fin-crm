import firebase from 'firebase/app'

export default {
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    async addRecord({ dispatch, commit }, { categoryId, des, amount, type, date }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records`).push({ categoryId, des, amount, type, date })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val()
        return record
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || []
        return Object.keys(records).map((cat) => ({ ...records[cat], id: cat }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}