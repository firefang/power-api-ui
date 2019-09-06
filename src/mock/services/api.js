import Mock from 'mockjs2'
import { builder } from '../util'

const getApisByProjectId = () => {
  const num = Mock.mock('@integer(0, 20)')
  const arr = []
  for (let i = 0; i < num; ++i) {
    arr.push({
      id: i + 1,
      name: 'a' + Mock.mock('@ctitle(3, 10)')
    })
  }
  return builder(arr)
}

Mock.mock(/\/projects\/\d+\/apis/, 'get', getApisByProjectId)
