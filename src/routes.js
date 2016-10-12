import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';
import CreateUser from './containers/CreateUser/CreateUser';
import Users from './containers/Users/Users';
import UserUpdate from './containers/User/Update/index';
import Products from './containers/Products/Products';
import ViewProduct from './containers/Products/ViewProduct';
import CreateProduct from './containers/CreateProduct/CreateProduct';
import TreeSysRes from './containers/SysResources/TreeSysRes';
import TreeUserRes from './containers/SysResources/TreeUserRes';
import SysUser from './containers/SystemUser/SysUser';
import CreateSysUser from './containers/CreateSysUser/CreateSysUser';

import NotFound from './components/NotFound/NotFound';

export default (
  <Route path="/" component={App} breadcrumbName="首页">
    <IndexRoute component={Home} breadcrumbName="管理首页"/>

    // 用户管理
    <Redirect from="/user" to="user/list" />
    <Route path="user/list" component={Users} breadcrumbName="用户列表"/>
    <Route path="user/create" component={CreateUser} breadcrumbName="添加用户"/>
    <Route path="user/update/:id" component={UserUpdate} breadcrumbName="编辑用户"/>
    <Route path="user/createSysUser" component={CreateSysUser} breadcrumbName="添加系统用户"/>
    <Route path="/systemUser" component={SysUser} breadcrumbName="系统用户列表" />

    // 产品管理
    <Redirect from="/product" to="product/list" />
    <Route path="product/list" component={Products} breadcrumbName="产品列表"/>
    <Route path="product/create" component={CreateProduct} breadcrumbName="添加产品"/>
    <Route path="product/view/:id" component={ViewProduct} breadcrumbName="产品修改"/>

    // 资源权限配置
    <Route path="/treeSysRes" component={TreeSysRes} />
    <Route path="/treeUserRes" component={TreeUserRes} />
    <Route path="*" component={NotFound} breadcrumbName="404"/>
  </Route>
);
