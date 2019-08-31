import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const getProjects = options => {
  const params = getQueryParameters(options)
  const size = params.size || 6
  const num = Mock.Random.integer(0, size)
  const arr = []
  for (let i = 0; i < num; ++i) {
    arr.push({
      id: i,
      name: Mock.mock('@ctitle(3, 6)'),
      description: Mock.mock('@csentence(5, 20)'),
      createTime: Mock.mock('@datetime'),
      group: {
        id: i,
        name: `${Mock.mock('@ctitle(3, 5)')}组`
      }
    })
  }
  return builder(arr)
}

Mock.mock(/\/projects/, 'get', getProjects)
