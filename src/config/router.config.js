import { UserLayout, BasicLayout, RouteView, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/dashboard',
    meta: { title: '首页' },
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '工作台'
            }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/settings/base',
        name: 'account',
        meta: {
          title: '个人页',
          icon: 'user'
        },
        hidden: true,
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: '安全设置',
                  hidden: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/project',
        name: 'project',
        component: PageView,
        meta: { title: '项目管理', icon: 'profile' },
        redirect: '/project/list',
        children: [
          {
            path: '/project/list',
            name: 'ProjectList',
            component: () => import('@/views/project/index'),
            meta: { title: '项目列表' }
          },
          {
            path: '/project/:projectId',
            name: 'ProjectDetail',
            component: () => import('@/views/project/ProjectDetail'),
            hidden: true,
            meta: { title: '项目详情' },
            redirect: to => {
              return `/project/${to.params.projectId}/info`
            },
            children: [
              {
                path: '/project/:projectId/info',
                name: 'ProjectInfo',
                component: () => import('@/views/project/ProjectInfo'),
                meta: { title: '项目信息' }
              },
              {
                path: '/project/:projectId/api/info/:apiId',
                name: 'ApiInfo',
                component: () => import('@/views/project/ApiInfo'),
                meta: { title: '接口信息' }
              },
              {
                path: '/project/:projectId/api/:apiId/case/info/:caseId',
                name: 'CaseInfo',
                component: () => import('@/views/project/CaseInfo'),
                meta: { title: '案例信息' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
