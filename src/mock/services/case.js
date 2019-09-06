import Mock from 'mockjs2'
import { builder } from '../util'

const getCaseByApiId = () => {
  const num = Mock.mock('@integer(0, 20)')
  const arr = []
  for (let i = 0; i < num; ++i) {
    arr.push({
      id: i + 1,
      name: 'c' + Mock.mock('@ctitle(3, 10)')
    })
  }
  return builder(arr)
}

Mock.mock(/\/projects\/\d+\/apis\/\d+\/cases/, 'get', getCaseByApiId)
