const docMenu = [
  ['Installation', { title: '安装', icon: '', path: '/installation' }],
  ['NhcSearch', { title: 'NhcSearch搜索菜单', icon: '', path: '/nhc-search' }],
  ['NhcTable', { title: 'NhcTable表格', icon: '', path: '/nhc-Table' }],
  ['NhcPagination', { title: 'NhcPagination分页器', icon: '', path: '/nhc-pagination' }],
  ['AutoTable', { title: 'AutoTable自动分页表格', icon: '', path: '/auto-table' }],
  ['SearchTable', { title: 'SearchTable自动查询表格', icon: '', path: '/auto-search-table' }],
  ['NhcTooltip', { title: 'NhcTooltip文字提示', icon: '', path: '/nhc-tooltip' }]
]

export { docMenu }

export const menuConfig = new Map(
  [
    ...docMenu,
    ['table', { title: 'table 查询结果', icon: '', path: '/table' }],
    ['404', { title: '404', icon: '', path: '/404' }],
    ['sysTips', { title: '系统提示', icon: '', path: '/sysTips' }]
  ])
// 开发环境有暴露文档例子
process.env.NODE_ENV === 'development' && menuConfig.set('文档例子', { title: '文档例子', icon: '', path: '/doc-example' })
