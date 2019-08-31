import Vue from 'vue'
import { login, logout } from '@/api/auth'
import { GetUserInfo } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    nickname: '',
    welcome: '',
    avatar: '',
    info: undefined
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { nickname, welcome }) => {
      state.nickname = nickname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const token = response.data
            Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        GetUserInfo()
          .then(response => {
            const result = response.data
            commit('SET_INFO', result)
            commit('SET_NAME', {
              nickname: result.nickname,
              welcome: welcome()
            })
            commit('SET_AVATAR', result.avatar)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Vue.ls.remove(ACCESS_TOKEN)

        logout()
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    }
  }
}

export default user
