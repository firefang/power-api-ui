import api from './index'
import axios from '@/utils/request'

/**
 * @param {*} params { page: int, size: int, name: string}
 */
export function getProjects (params) {
  return axios({
    url: api.GetProjects,
    method: 'get',
    params: params
  })
}
