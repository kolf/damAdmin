import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Login from '../Login/index';
import {browserHistory, Link} from 'react-router';
import './index.scss';
import { Menu, Breadcrumb, Icon } from 'antd';
import localStorage from '../../utils/localStorage';

const SubMenu = Menu.SubMenu;

import {logoutUser} from './../../actions/auth';

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
    this.state = {
      current: '1',
      openKeys: [],
    }
  }

  componentDidMount() {

  }

  handleLogout() {
    const {dispatch} = this.props;
    browserHistory.push('/');
    dispatch(logoutUser())
  }

  handleClick(e) {
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    });
  }

  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  }

  renderAuthenticatedPage() {
    const {routes} = this.props;

    const defaultKeys = () => {
      return routes.map((item) => {
        return item.path
      })
    };

    return (
      <div className="ant-layout-aside">
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo">DAM 运营管理系统</div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={defaultKeys()} openKeys={this.state.openKeys} onClick={this.handleClick.bind(this)} onOpen={this.onToggle.bind(this)} onClose={this.onToggle.bind(this)}>
            <Menu.Item key="/">
              <Link to={'/'}><Icon type="home"/>首页</Link>
            </Menu.Item>
            <SubMenu key="user" title={<span><Icon type="user" />用户管理</span>}>
              <Menu.Item key="user/list">
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

            <SubMenu key="sub3" title={<span><Icon type="lock" />资源权限配置</span>}>
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
              <SubMenu className="pull-right" title={<span><Icon type="user" />{localStorage.get('user').damId}</span>}>
                <Menu.Item key="logout">
                  <Icon type="question"/>退出
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              {
                routes.map(item => <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>)
              }
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
    const {isAuthenticated} = this.props;
    return (
      <div className="app-container">
        {isAuthenticated ? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {routing, auth: {isAuthenticated, user}} = state;
  return {
    isAuthenticated, user, routing
  };
}

export default connect(mapStateToProps)(App);
