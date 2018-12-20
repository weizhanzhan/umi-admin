
// ref: https://umijs.org/config/

const Routes = require('./src/utils/routes')
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'UMI',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: true,
      
    }],
  ],
  targets:{
    ie:10
  },
  routes:Routes,
  // history:'hash',
  disableCSSModules:true
}
