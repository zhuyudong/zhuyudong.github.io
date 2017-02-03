const SpritesmithPlugin = require('webpack-spritesmith');
const UglifyJsPlugin = require('webpack-spritesmith');

module.exports = {
  resolve: {
    // tree-shaking 查找某些package存在两个入口(es5和es6写法)的情况
    mainFields: ['jsnext:main', 'browser', 'main'],
    // 指定node_modules路径，加快搜索速度
    modules: [path.resolve(__dirname, 'node_modules')],
    // 让webpack直接使用dist目录的整体文件减少文件递归解析
    alias: {
      'moment': 'moment/min/moment.min.js',
      'react': 'react/dist/react.js',
      'react-dom': 'react-dom/dist/react-dom.js'
    }
  },
  module: {
    // 这些库都是不依赖其它库的库 不需要解析他们可以加快编译速度
    noParse: /node_modules\/(jquey|moment|chart\.js)/,
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory', // 开启缓存编译结果
      include: path.resolve(__dirname, 'src') // 只命中src目录里的js文件，加快webpack搜索速度
    },{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader?minimize', 'sass-loader'], // 压缩css
      include: path.resolve(__dirname, 'src')
    },{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?minimize']
    },{
      test: /\.(gif|png|eot|woff|ttf|pdf)$/,
      loader: 'file-loader'
    }]
  },
  performance: {
    "hints": false
  },
  plugins: [
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
