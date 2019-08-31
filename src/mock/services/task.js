import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const getTasks = options => {
  const params = getQueryParameters(options)
  const size = params.size || 6
  const num = Mock.Random.integer(0, size)
  const arr = []
  for (let i = 0; i < num; ++i) {
    const total = Mock.mock('@integer(10, 300)')
    const pass = Mock.mock('@integer(10, 300)')
    const fail = total - pass
    arr.push({
      id: i,
      name: Mock.mock('@ctitle(3, 6)'),
      success: Mock.mock('@boolean'),
      total,
      pass,
      fail,
      createTime: Mock.mock('@datetime')
    })
  }
  return builder(arr)
}

Mock.mock(/\/tasks/, 'get', getTasks)
