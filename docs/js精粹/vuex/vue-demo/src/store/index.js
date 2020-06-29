import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './createStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state, payload){
      console.log(payload, 'commit')
      if(payload){
        state.counter += payload
      }else{
        state.counter ++
      }
    }
  },
  actions: {
    add({commit}, payload){
      console.log(payload)
      setTimeout(()=> commit('add', payload), 500)
    }
  },
  modules: {
  },
  getters: {
    doubleCounter(state){
      return state.counter * 2
    }
  }
})
