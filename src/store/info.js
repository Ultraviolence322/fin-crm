import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  getters: {
    info(s) {
      return s.info
    }
  },
  mutations: {
    setInfo(s, info) {
      s.info = info
    },
    clearInfo(s) {
      s.info = {}
    }
  },
  actions: {
    async fetchInfo({ commit }, uid) {
      try {
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }

    },
    async updateInfo({ dispatch, commit, getters }, info) {
      try {
        const uid = await dispatch('getUid')
        const newInfo = { ...getters.info, ...info }
        await firebase.database().ref(`/users/${uid}/info`).update(newInfo)
        commit('setInfo', newInfo)
      } catch (e) {
        commit('setError', e)
        throw e
      }

    }
  },
}