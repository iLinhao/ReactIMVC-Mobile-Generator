const path = require('path');
const mode = process.env.REACT_APP_MODE

module.exports = {
  port: 3005,
  layout: 'Layout',
  SSR: false,
  favicon: path.join(__dirname, 'favicon.ico'),
  staticEntry: 'index.html',
  hot: true,
  alias: {
    '@': path.resolve(__dirname, "./src")
  },
  webpack: (webpackConfig) => {
    if (mode === 'development') {
      const vConsolePlugin = require('vconsole-webpack-plugin');
      webpackConfig.plugins.push(new vConsolePlugin({
        filter: [],
        enable: true
      }));
    }
    return webpackConfig;
  }
};
