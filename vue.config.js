const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // 配置代理
  devServer: {
    proxy: {
      '/picker': {
        target: 'http://47.94.95.8:8000',  // 后端 API 地址
        changeOrigin: true,  // 是否修改请求头中的源
        secure: false,  // 如果是 https 接口需要设置为 true
        pathRewrite: {
          '^/picker': '',  // 重写路径，去掉 /picker 前缀
        },
      },
    },
  },
})

