import api from './index'
import axios from '@/utils/request'

export function GetUserInfo () {
  return axios({
    url: api.GetUserInfo,
    method: 'get'
  })
}
