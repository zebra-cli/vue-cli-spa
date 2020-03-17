const path = require('path')
const resolve = (...args) => path.join(__dirname, ...args)
const { NODE_ENV, OUTPUT_DIR, VIEWS_PATH } = process.env
const isProd = NODE_ENV === 'production'
module.exports = {
  outputDir: isProd && OUTPUT_DIR ? resolve(OUTPUT_DIR) : undefined,
  assetsDir: 'adms',
  pages: {
    index: {
      entry: 'src/main.js',
      filename: isProd && VIEWS_PATH ? resolve(VIEWS_PATH, 'index.blade.php') : 'index.html'
    }
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/mock': {
        target: process.env.VUE_APP_MOCK_URL || `http://127.0.0.1:3000`,
        changeOrigin: true
      },
      '/api': {
        target: process.env.VUE_APP_TEST_URL || 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/styles/variables.scss']
    }
  }
}
