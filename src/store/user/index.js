import Vuex from 'vuex';
import { SOME_MUTATION } from './mutation-types';

const state = () => ({
    userName: '',
    token: ''
});

const mutations = {
    [SOME_MUTATION](state) {
        // 使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名

    },
    userName (state) {
        state.count++
      }
    },
}
    
const actions = {
    userName (context) {
        context.commit('userName')
    }
}

const getters = {
    otherName(state) {
        return "你好：" + state.userName
    }
}

const setter = {}

export default user = {
    state,
    mutations,
    actions,
    getters,
    setter
}