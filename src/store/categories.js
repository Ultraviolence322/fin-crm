import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    async addCategory({ dispatch, commit }, { name, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ name, limit })
        return { name, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || []
        const arr = []
        Object.keys(categories).forEach((cat) => {
          categories[cat].id = cat;
          arr.push(categories[cat]);
        });
        return arr
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val()
        return category
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ dispatch, commit }, { name, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ name, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
}