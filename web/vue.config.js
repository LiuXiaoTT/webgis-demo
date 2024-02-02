const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
let cesiumSource = "./node_modules/cesium/Source";
let cesiumWorkers = "Workers";

function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave:false//关闭语法检查
  lintOnSave: false,
  configureWebpack: {


    externals: {
      'cesium': 'Cesium',
    },
    output: {
      sourcePrefix: " ", 
    },
    // pluginOptions: {
    //   webpackBundleAnalyzer: {
    //     openAnalyzer: false,
    //   },
    //   cesium: {
    //     cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js',
    //     workerPath: 'https://unpkg.com/cesium/Build/Cesium/Workers/',
    //     accessToken: '',
    //   },
    // },
    
    amd: {
      toUrlUndefined: true, 
    },
    resolve: {
      alias: {
        // 'vue$':'vue/dist/vue.cjs.js',
        "@": path.resolve("src"),
        'cesium': path.resolve(__dirname, cesiumSource),
      }
    },
    // fallback:{
    //   "http":require.resolve("stream-http"),
    //   "https":require.resolve("https-browserify"),
    //   "zlib":require.resolve("browserify-zlib"),
    //   "url":require.resolve("url/"),
    //   "assert":require.resolve("assert/"),
    //   "strram":require.resolve("stream-browserify")
    // },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {from: path.join(cesiumSource, cesiumWorkers), to: "Workers"},
          {from: path.join(cesiumSource, "Assets"), to: "Assets"},
          {from: path.join(cesiumSource, "Widgets"), to: "Widgets"},
          {from: path.join(cesiumSource, "ThirdParty/Workers"), to: "ThirdParty/Workers"}
        ]
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
       // 使Cesium对象实例可在每个js中使用而无须import
       new webpack.ProvidePlugin({
        Cesium: ["cesium/Source/Cesium"]
      })
    ],
    module: {
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: '@open-wc/webpack-import-meta-loader',
          },
        },
      ]
    },
  },

})





