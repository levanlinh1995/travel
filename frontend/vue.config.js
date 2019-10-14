const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin(),
      new CleanWebpackPlugin()
    ]
  },
  chainWebpack (config) {
    config.plugins.delete('prefetch')
  }
}
