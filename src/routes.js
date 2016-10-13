import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';

import Users from './containers/User/List/index';
import CreateUser from './containers/User/Create/index';
import UpdateUser from './containers/User/Update/index';

import Products from './containers/Product/List/index';
import UpdateProduct from './containers/Product/Update/index';
import CreateProduct from './containers/Product/Create/index';

import TreeSysRes from './containers/SysResources/TreeSysRes';
import TreeUserRes from './containers/SysResources/TreeUserRes';

import SysUser from './containers/SystemUser/List/index';
import CreateSysUser from './containers/SystemUser/Create/index';

import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={App} breadcrumbName="首页">
    <IndexRoute component={Home} breadcrumbName="管理首页"/>

    // 用户管理
    <Redirect from="/user" to="user/list" />
    <Route path="user/list" component={Users} breadcrumbName="用户列表"/>
    <Route path="user/create" component={CreateUser} breadcrumbName="添加用户"/>
    <Route path="user/update/:id" component={UpdateUser} breadcrumbName="编辑用户"/>
    <Route path="user/createSysUser" component={CreateSysUser} breadcrumbName="添加系统用户"/>
    <Route path="/systemUser" component={SysUser} breadcrumbName="系统用户列表" />

    // 产品管理
    <Redirect from="/product" to="product/list" />
    <Route path="product/list" component={Products} breadcrumbName="产品列表"/>
    <Route path="product/create" component={CreateProduct} breadcrumbName="添加产品"/>
    <Route path="product/update/:id" component={UpdateProduct} breadcrumbName="产品修改"/>

    // 资源权限配置
    <Route path="/treeSysRes" component={TreeSysRes} />
    <Route path="/treeUserRes" component={TreeUserRes} />
    <Route path="*" component={NotFound} breadcrumbName="404"/>
  </Route>
);
