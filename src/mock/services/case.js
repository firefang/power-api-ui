import Mock from 'mockjs2'
import { builder } from '../util'

const getCaseByApiId = options => {
  const apiId = parseInt(options.url.match(/\/apis\/(\d+)\/cases/)[1])
  const num = Mock.mock('@integer(0, 20)')
  const arr = []
  for (let i = 0; i < num; ++i) {
    arr.push({
      id: i + 1,
      apiId,
      name: 'c' + Mock.mock('@ctitle(3, 10)')
    })
  }
  return builder(arr)
}

Mock.mock(/\/projects\/\d+\/apis\/\d+\/cases/, 'get', getCaseByApiId)
