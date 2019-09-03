import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const getProjects = options => {
  const params = getQueryParameters(options)
  const pageNo = parseInt(params.pageSize)
  const pageSize = parseInt(params.pageSize || 6)
  const num = Mock.Random.integer(0, pageSize)
  const arr = []
  for (let i = 0; i < num; ++i) {
    arr.push({
      id: i + 1,
      name: Mock.mock('@ctitle(3, 6)'),
      description: Mock.mock('@csentence(5, 20)'),
      createTime: Mock.mock('@datetime'),
      team: {
        id: i + 1,
        name: `${Mock.mock('@ctitle(3, 5)')}组`
      }
    })
  }
  return builder({
    pageNo,
    pageSize,
    totalCount: 100,
    data: arr
  })
}

Mock.mock(/\/projects/, 'get', getProjects)
