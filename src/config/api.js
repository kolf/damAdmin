import cookie from 'js-cookie';
// let host = "http://dev.dam-server.vcg.com";
const host = "http://192.168.3.109:8080";
// const host = "http://192.168.3.120:8080";

const baseUri = host + "/";

const token = cookie.get('token');

export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'damSys/syslogin',
  queryUser: 'damUser/pageList?token=' + token,          //查询用户
  querySystemUser: 'damUser/listSysUser?token=' + token,  //列表系统用户
  createUser: 'damUser/create?token=' + token,           //创建用户
  createSysUser: 'damUser/createSysUser?token=' + token, //创建系统用户
  createSystemUser:'damUser/createSysUser?token=' + token, //创建系统用户
  listUser: 'damUser/list?token=' + token,           //创建用户
  productsOpts: 'damProduct/list?token=' + token,        //查询用户产品
  products: 'damProduct/pageList?token=' + token,        //查询产品
  activeProduct: 'damProduct/active?token=' + token,        //查询产品
  createProduct: 'damProduct/create?token=' + token,     //创建产品
  viewProduct:'damProduct/view?token=' + token,            //查看产品
  updateProduct:'damProduct/update?token='+token,        //修改产品
  querySysRes: 'damRes/listSysRes?token=' + token,     //查询系统功能
  treeSysRes: 'damRes/listSysRes?token=' + token,     //查询系统功能
  treeUserRes:'damRes/listNoneSysRes?token=' + token,     //查询非系统功能
  queryRes: 'damRes/listNoneSysRes?token=' + token,           //查询普通功能
};
