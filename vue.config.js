const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: '/nhc-common-ui/',
  // src 为 examples
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chainWebpack: (config) => {
        config.resolve.alias
          .set('@', resolve('examples'))
          .set('@assets', resolve('examples/assets'))
      }
    }
  },
  devServer: {
    proxy: {
      '/xxx/': {
        target: 'xxx',
        pathRewrite: { '^/platformweb/admin/': '/admin/' },
        changeOrigin: true
      }
    }
  },
  css: {
    // css预设器配置项，向 CSS 相关的 loader 传递选项
    loaderOptions: {
      // 全局css变量
      sass: {
        prependData: `
          @import "@P/styles/mixin.scss";
        `
      }
    }
    // 启用 CSS modules
    // requireModuleExtension: false
  },
  configureWebpack: config => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './build/md-loader/index.js')
          }
        ]
      }
    )
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 0 }))

    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config.resolve.alias
      .set('@', resolve('examples'))
      .set('@P', resolve('packages'))
      .set('@assets', resolve('examples/assets'))
  }
}
