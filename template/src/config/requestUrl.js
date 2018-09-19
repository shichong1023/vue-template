import config from './index'

let limit = config.urlPrefix
if (limit.length > 0){
  limit += '/'
}
//生产
const production = {
  logout: 'logout', //权限 路径
  login: 'login',
  limit: "permission/queryUserPermission",

  county: '/gis/county.json',//根路径
  downloadFile: limit + "downloadFile", //接口路径
}

//开发
const development = {
  logout: 'logout',
  login: 'login',
  limit: "permission/queryUserPermission",

  county: '/gisDev/json/county.json',
  downloadFile: "yjq/downloadFile",
}

export default {
  production,
  development
}