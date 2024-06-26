const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    devServer: {
      port: 8080,
      host: '0.0.0.0',
      https: false,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5001/',
          ws: true,
          changOrigin: true,
          pathReWrite: {
            '^/api': ''
          }
        }
      },
  },
})
