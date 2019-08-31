import api from './index'
import axios from '@/utils/request'

/**
 * parameter: {
 *   username: string,
 *   password: string
 * }
 */
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter,
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function logout () {
  return axios({
    url: api.Logout,
    method: 'post'
  })
}
