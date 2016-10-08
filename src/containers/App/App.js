import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Login from './../Login/Login';
import { Link } from 'react-router';
import './App.scss';
import { Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import cookie from 'js-cookie';

const SubMenu = Menu.SubMenu;

import { logoutUser } from './../../actions/auth';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(logoutUser())
  }

  renderAuthenticatedPage() {
    return (
      <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo">DAM 运营管理系统</div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <SubMenu key="sub1" title={<span><Icon type="user" />用户管理</span>}>
              <Menu.Item key="1">
                <Link to={'/user'}>
                  用户列表
                </Link>
              </Menu.Item>

              <Menu.Item key="5">
                <Link to={'/systemUser'}>
                  系统用户列表
                </Link>
              </Menu.Item>

            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="cloud" />产品管理</span>}>
              <Menu.Item key="2">
                <Link to={'/product'}>
                  产品列表
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" title={<span><Icon type="cloud" />资源权限配置</span>}>
              <Menu.Item key="3">
                <Link to={'/treeSysRes'}>
                  系统资源权限
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                  <Link to={'/treeUserRes'}>
                    产品资源管理
                  </Link>
              </Menu.Item>
            </SubMenu>

          </Menu>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
          <Menu mode="horizontal" onClick={this.handleLogout}>
              <SubMenu className="pull-right" title={<span><Icon type="user" /></span>}>
                <Menu.Item key="setting:4">
                      <Link to={'/user/aboutMySelf'}>{cookie.get('damId')}</Link>
                </Menu.Item>
                <Menu.Item key="setting:5">
                  <Link to={'/logout'}>退出</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
              <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="app-container">
        {isAuthenticated? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { routing, auth: { isAuthenticated, user } } = state;
  return {
    isAuthenticated, user,routing
  };
}

export default connect(mapStateToProps)(App);
