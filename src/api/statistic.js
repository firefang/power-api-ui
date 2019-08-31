import api from './index'
import axios from '@/utils/request'

export function getTotals () {
  return axios({
    url: api.GetTotals,
    method: 'get'
  })
}

export function getTags () {
  return axios({
    url: api.GetTags,
    method: 'get'
  })
}
