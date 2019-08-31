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
  userInfo.roles = roles

  const permissions = []
  userInfo.permissions = permissions

  const num = Mock.Random.integer(1, 6)
  const teams = []
  for (let i = 0; i < num; ++i) {
    teams.push({
      id: i,
      name: `${Mock.mock('@ctitle(3, 5)')}组`
    })
  }
  userInfo.teams = teams

  return builder(userInfo)
}

Mock.mock(/\/users\/self/, 'get', info)
