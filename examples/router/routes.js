import ContainerWrapper from '../views/layOut/Index.vue'

import { docMenu } from '../views/layOut/SideMenu/contant.js'

const docRoute = docMenu.map(route => {
  return {
    path: route[1].path,
    name: route[0],
    component: r => require.ensure([], () => r(require(`@/views/doc/${route[0]}.md`)), 'doc')
  }
})

console.log(docMenu, JSON.stringify(docRoute))

export default [
  {
    path: '/',
    component: ContainerWrapper,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: _ => import(/* webpackChunkName: "nhccommon" */ '@/views/home/Index.vue')
      },
      {
        path: '/doc-example',
        name: 'test',
        component: r => require.ensure([], () => r(require('@/views/doc/doc-example.md')), 'doc-example')
      },
      {
        path: '/upload',
        name: 'uploadTest',
        component: _ => import('@/views/upload')
      },
      ...docRoute
      // {
      //   path: '/installation',
      //   name: 'installation',
      //   component: r => require.ensure([], () => r(require('@/views/doc/installation.md')), 'installation')
      // },
      // {
      //   path: '/auto-search-table',
      //   name: 'Auto-search-table',
      //   component: r => require.ensure([], () => r(require('@/views/doc/SearchTable.md')), 'SearchTable')
      // },
      // {
      //   path: '/nhc-pagination',
      //   name: 'nhc-pagination',
      //   component: r => require.ensure([], () => r(require('@/views/doc/NhcPagination.md')), 'nhcPagination')
      // }
      // {
      //   path: '/list',
      //   name: 'tableList',
      //   meta: { title: 'table 查询结果' },
      //   component: _ => import(/* webpackChunkName: "nhccommon" */ '@/views/searchResult/Index.vue')
      // }
    ]
  },

  {
    path: '/table',
    name: 'table',
    component: ContainerWrapper,
    redirect: '/table/list',
    children: [
      {
        path: 'list',
        name: 'tableList',
        meta: { title: 'table 查询结果' },
        component: _ => import(/* webpackChunkName: "nhccommon" */ '@/views/searchResult/Index.vue')
      }
    ]
  },
  // {
  //   path: '/search-table',
  //   name: 'SearchTable',
  //   component: ContainerWrapper,
  //   redirect: '/table/list',
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'tableList',
  //       meta: { title: 'table 查询结果' },
  //       component: _ => import(/* webpackChunkName: "nhccommon" */ '@/views/searchResult/Index.vue')
  //     }
  //   ]
  // },
  {
    path: '/404',
    name: '404',
    component: ContainerWrapper,
    redirect: '/404/pageInfo',
    children: [
      {
        path: 'pageInfo',
        name: 'pageInfo',
        meta: { title: 'table 查询结果' },
        component: _ => import(/* webpackChunkName: "nhccommon" */ '@/views/404/Index.vue')
      }
    ]
  },
  {
    path: '/sysTips',
    name: 'sysTips',
    component: ContainerWrapper,
    redirect: '/sysTips/tipsList',
    children: [
      {
        path: 'tipsList',
        name: 'pageSysTips',
        meta: { title: '系统提示' },
        component: _ => import(/* webpackChunkName: "nhccommon" */ '@/views/sysTips/Index.vue')
      }
    ]
  }
]
