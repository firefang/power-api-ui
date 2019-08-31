import Mock from 'mockjs2'
import { builder } from '../util'

const getTotals = () => {
  return builder({
    projects: Mock.mock('@integer(0, 30)'),
    apis: Mock.mock('@integer(50, 100)'),
    cases: Mock.mock('@integer(500, 1000)'),
    tasks: Mock.mock('@integer(0, 10)')
  })
}

const getTags = () => {
  const num = Mock.Random.integer(0, 30)
  const arr = []
  for (let i = 0; i < num; ++i) {
    arr.push({
      name: Mock.mock('@ctitle(4, 6)'),
      value: Mock.mock('@integer(1, 100)')
    })
  }
  return builder(arr)
}

Mock.mock(/\/statistic\/totals/, 'get', getTotals)
Mock.mock(/\/statistic\/tags/, 'get', getTags)
