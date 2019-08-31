import api from './index'
import axios from '@/utils/request'

/**
 * @param {*} params { page: int, size: int, name: string}
 */
export function getTasks (params) {
  return axios({
    url: api.GetTasks,
    method: 'get',
    params: params
  })
}
