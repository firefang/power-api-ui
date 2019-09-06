const api = {
  // auth
  Login: '/auth/login',
  Logout: '/auth/logout',
  // user
  GetUserInfo: '/users/self',
  // statistic
  GetTotals: '/statistic/totals',
  GetTags: '/statistic/tags',
  // projects
  GetProjects: '/projects',
  // apis
  GetApisByProjectId: projectId => `/projects/${projectId}/apis`,
  // cases
  GetCasesByApiId: (projectId, apiId) => `/projects/${projectId}/apis/${apiId}/cases`,
  // tasks
  GetTasks: '/tasks'
}
export default api
