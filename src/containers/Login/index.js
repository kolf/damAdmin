import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Message } from 'antd';
import { loginUser } from './../../actions/auth';

import './style.scss';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(loginUser(creds, (msg) => Message.error(msg)))
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const nameProps = getFieldProps('damId', {
      rules: [
        { required: true, min: 2, message: '用户名至少为 2 个字符' },
        { validator: this.userExists },
      ],
    });

    const passwordProps = getFieldProps('damPasswd', {
      rules: [
        { required: true, min: 6, message: '密码至少为 6 个字符' }
      ]
    });

    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">DAM数字资产管理系统</div>
          <Form className="login-form" horizontal onSubmit={this.handleSubmit}>
          <FormItem label="用户名" hasFeedback>
            <Input
              {...nameProps}
              placeholder="请输入用户名"
              />
            </FormItem>
            <FormItem label="密码" hasFeedback>
              <Input {...passwordProps} type="password" autoComplete="off" placeholder="请输入密码"
                     onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
            </FormItem>
            <FormItem>
              <Button className="ant-col-24" type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
          <div className="login-footer"><a href="">忘记密码</a> | <a href="">免费注册</a></div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps)(createForm()(Login));
