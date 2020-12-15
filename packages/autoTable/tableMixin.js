export default {
  // 1.查询 search给参数 调用外界formatSearchParams转化为真正传参请求接口的数据 初始化page为0，size为10
  // 2.翻页、更改页面 需要更新当前所记录页数和参数
  // 3.更改页数 需要记录当前参数
  // 4.当新增和删除时的操作需要更新当前所记录页数和参数
  // 5.初始化指定传入参数(在formatSearchParams里添加) Done
  // 6.重置全部参数清空，初始化page为0，size为10
  // 7.formatSearchParams可传入page更改从0开始还是从1开始查询
  // 8.初始化默认值时需带search的默认值参数(需兼容autoTable独立运行) 需先触发nhc-search的click方法 doing
  // 需解决 每次formatSearchParams应该是当前的page size 和查询参数 而不是之前formatSearchParams返回的参数
  methods: {
    // 翻页、前往指定页
    currentChange (page) {
      console.log('currentChange', page)
      this.params.page = page - 1
      this.setSearchParams(this.searchParams)
      this.tableList()
    },
    // 页数更改
    sizeChange (size) {
      console.log('sizeChange', size)
      this.currentPage = 1
      this.params.page = 0
      this.params.size = size
      this.setSearchParams(this.searchParams)
      this.tableList()
    },
    /**
     * 设置请求接口参数
     * 需考虑页面更改(完成)
     */
    setSearchParams (params) {
      this.apiParams = this.data.formatSearchParams({ ...params, ...this.params })
    },
    // 列表-直接调用参数不变，size page不变,列表删除新增时可用
    async tableList (params = {}) {
      try {
        this.listLoading = true
        const { page, size } = this.params
        const data = await this.tabfetch({ page, size, ...this.apiParams, ...params })
        this.resListData = this.formatListData(data, this) || {}
        const { list, total } = this.resListData
        this.list = list || []
        this.total = total || 0
      } catch (e) {
        typeof (this.data.error) === 'function' && this.data.error(e)
        console.error(e)
      } finally {
        typeof (this.data.finally) === 'function' && this.data.finally()
        this.listLoading = false
      }
    }
  }
}
