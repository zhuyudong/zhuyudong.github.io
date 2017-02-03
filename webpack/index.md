webpack2有哪些变化：
css-loader在webpack2里默认没有开启压缩，要css-loader?minimize，通过[cssnano](http://cssnano.co/)实现
内置了两个插件，不用管在单独引用：DedupePlugin（消除重复模块）、OccurrenceOrderPlugin（让被依赖次数更高的模块靠前分到更小的id）
[imagemin-webpack-plugin压缩图片](https://github.com/Klathmon/imagemin-webpack-plugin)  
[webpack-spritesmith合并雪碧图](https://github.com/mixtur/webpack-spritesmith)
