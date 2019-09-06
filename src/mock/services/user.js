import Mock from 'mockjs2'
import { builder } from '../util'

const avatarUrl =
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3496143842,2226400923&fm=15&gp=0.jpg'

const info = () => {
  const userInfo = {
    id: 1,
    nickname: '超级管理员',
    username: 'admin',
    password: null,
    avatar: avatarUrl
  }
  const roles = [{ id: 1, name: '超级管理员' }]
  const num1 = Mock.mock('@integer(0,3)')
  for (let i = 0; i < num1; ++i) {
    roles.push({ id: i + 2, name: `${Mock.mock('@ctitle(2, 4)')}工程师` })
  }
  userInfo.roles = roles

  const permissions = []
  userInfo.permissions = permissions

  const num2 = Mock.Random.integer(1, 6)
  const teams = []
  for (let i = 0; i < num2; ++i) {
    teams.push({
      id: i,
      name: `${Mock.mock('@ctitle(3, 5)')}组`
    })
  }
  userInfo.teams = teams

  return builder(userInfo)
}

Mock.mock(/\/users\/self/, 'get', info)
