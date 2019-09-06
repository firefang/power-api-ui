import api from './index'
import axios from '@/utils/request'

export function getApisByProjectId (projectId) {
  return axios({
    url: api.GetApisByProjectId(projectId),
    method: 'get'
  })
}
