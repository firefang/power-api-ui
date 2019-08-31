import Mock from 'mockjs2'
import { builder, getFormParameters } from '../util'

const username = ['admin']
const password = ['21232f297a57a5a743894a0e4a801fc3'] // admin

const login = (options) => {
  const body = getFormParameters(options)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder('4291d7da9005377ec9aec4a71ea837f', '', 200)
}

const logout = () => {
  console.log('mock logout')
  return {}
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
