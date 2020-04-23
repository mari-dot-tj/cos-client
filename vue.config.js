const path = require('path')
const webpack = require('webpack')

module.exports = {
  "lintOnSave": false,
  "transpileDependencies": [
    "vuetify"
  ],
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/'
  // : 'http://localhost:3000',
  // outputDir: path.resolve(__dirname, '../server/public'),
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        VUE_APP_BASE_URL: JSON.stringify(process.env.VUE_APP_BASE_URL),
      }),
    ],
  },

}
