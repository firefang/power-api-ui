import api from './index'
import axios from '@/utils/request'

export function getCasesByApiId (projectId, apiId) {
  return axios({
    url: api.GetCasesByApiId(projectId, apiId),
    method: 'get'
  })
}
