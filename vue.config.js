const url = 'https://hdpark.dreamdeck.cn';
const webpack = require("webpack");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
        // Popper: ["popper.js", "default"]
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@commons", resolve("src/components/commons"));
  },
  devServer: {
    //open: true,
    disableHostCheck: true,
    // host: "localhost",
    port: 8080,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    //publicPath: '../',  //这里解决静态资源引用路径问题
    proxy: {
      // 160
      "/dd-web1": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/dd-web1": "/dd-web1"
        }
      },
      "/dd-web": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/dd-web": "/dd-web"
        }
      },
      "/dd-iot": {
        target: url,
        ws: true,
        pathRewrite: {
          "^/dd-iot": "/dd-iot"
        }
      }
    }
  }
};
