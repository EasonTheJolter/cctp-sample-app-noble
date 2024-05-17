const webpack = require('webpack')
const { ProvidePlugin } = webpack;

module.exports = {
  webpack: {
    plugins: [
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      }),
    ],
    configure: {
      resolve: {
        fallback: { 
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
          vm: require.resolve("vm-browserify"),
          "buffer": require.resolve("buffer/"),
          process: require.resolve("process/browser"),
        }
      }
    }
  },
  devtool: 'source-map',
  reactRefresh: false,
}