import firebase from 'firebase/app'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    async logIn({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.sendEmailVerification()
        firebase.database().ref(`users/${await dispatch('getUid')}/info`).set({
          name,
          bill: 10000,
          locales: "ru-RU"
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async getEmailAccept({ commit }) {
      try {
        const user = await firebase.auth().currentUser
        return user.emailVerified
      } catch (e) {
        commit('setError', e)
        throw e
      }

    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  },
}