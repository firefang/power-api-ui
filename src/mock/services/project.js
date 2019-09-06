import Mock from 'mockjs2'
import { pageBuilder } from '../util'

const getProjects = options => {
  return pageBuilder(options, i => {
    return {
      id: i + 1,
      name: Mock.mock('@ctitle(3, 6)'),
      description: Mock.mock('@csentence(5, 20)'),
      createTime: Mock.mock('@datetime'),
      team: {
        id: i + 1,
        name: `${Mock.mock('@ctitle(3, 5)')}组`
      }
    }
  })
}

Mock.mock(/\/projects/, 'get', getProjects)
