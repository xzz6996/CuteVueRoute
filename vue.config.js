const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir);
}
module.exports = {
    publicPath: './',
    outputDir:"dist", //打包输出
    productionSourceMap: false, //不生成source map
    filenameHashing:false, //关闭哈希
    lintOnSave: false, //关闭eslint
    configureWebpack:(config)=>{  //原生对webpack配置config       
        Object.assign(config,{
            resolve : {
                extensions:['.js','.vue','.json','.css'],
                alias:{
                    'vue$':'vue/dist/vue.esm.js',
                    '@':resolve('src')
                }
            },  
            // externals:{    cdn引用
            //     jquery: 'jQuery',
            //      'vue':"Vue",
            //      'vue-router': 'VueRouter',
            //      'axios': 'axios',
            //      'element-ui': 'ELEMENT',
            //      'vuex':'Vuex',
            //      echarts: 'echarts'
            // }   
        })
    },   
    css:{       
        extract:true,// 是否使用css分离插件 ExtractTextPlugin        
        sourceMap:false, // 开启 CSS source maps?       
        loaderOptions:{},// css预设器配置项
        // 启用 CSS modules for all css / pre-processor files.
        modules:false,
        extract: {
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[hash:8].css'
        }
    },
    devServer: {
        // open:process.platform === 'darwin',//返回当前平台类型('darwin','freebsd','linux','sunos'或者 'win32')
        // host:"localhost",
        // port:"8080",
        // https:false, //dev-server 通过 HTTP 提供服务
        // hotOnly:false,
        // proxy: {
        //     '/commonApi':{
        //         target:'',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '^/commonApi':''
        //         }
        //     }
        // }
    }
}