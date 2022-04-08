import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 选择歌曲id
    musicid:0,
    token:'',
    // 判断播放状态
    isplay:false,
    // 菜单栏
      caidan:{
      // 判断菜单栏折叠
        ishouzhedie:false
      }    
  },
  getters: {
  },
  mutations: {
    // 修改播放状态
    changePlayState(state, isPlay) {
      state.isplay = isPlay;
      // console.log('changePlayState');
  },
    shouzhedie(state){
        state.caidan.ishouzhedie = !state.caidan.ishouzhedie
    },
    
  },
  actions: {
  },
  modules: {
  }
})
