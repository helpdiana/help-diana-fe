const { mergeSassVariables } = require('@vuetify/cli-plugin-utils')
const path = require('path');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

module.exports = {
  publicPath : '/',
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  devServer: {
    // 프록시 설정
    //proxy : "https://startroad.me/api"
    /*
    proxy : {
      target : "https://startroad.me"
    },
    */
    disableHostCheck:true,
    proxy: {
        // 프록시 요청을 보낼 api의 시작 부분
        '/api': {
            // 프록시 요청을 보낼 서버의 주소
            //target: 'https://c2e79960-228b-4a11-8a9c-5f9973cd9f68.mock.pstmn.io',
            target: 'https://helpdiana.site',
            changeOrigin : true,

        }
    }
  },
  chainWebpack: config => {
    const modules = ['vue-modules', 'vue', 'normal-modules', 'normal']
    modules.forEach(match => {
      config.module
        .rule('sass')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss'"))
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss';"))
    })
  },
}
