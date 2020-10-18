const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', 'ts'],
      modules: ['node_modules', path.resolve('src')],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@comp': path.resolve(__dirname, 'src/component'),
        '@views': path.resolve(__dirname, 'src/views'),
      },
    },
  },
  devServer: {
    port: 8800,
  },
};
