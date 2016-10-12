import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Switch } from 'antd';
import { createUser } from './../../actions/users';
import { queryProducts } from './../../actions/products';

import './CreateUser.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(queryProducts());
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    this.props.form.validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(createUser(creds));
    });
  }

  render() {
    const { products: { data} } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const accountProps = getFieldProps('damId', {
      rules: [
        { required: true, min: 4, message: '用户名至少为 4 个字符' },
      ]
    });

    const nameProps = getFieldProps('userName', {
      rules: [
        { required: true, min: 2, message: '姓名至少为 2 个字符' },
      ]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, min: 6, message: '密码至少为 6 个字符' },
      ]
    });

    const companyProps = getFieldProps('orgName', {
      rules: [
        { required: true, min: 4, message: '公司名称至少为 4 个字符' },
      ]
    });

    const phoneProps = getFieldProps('tel', {
      rules: [
        { required: true, message: '手机号不正确' },
      ]
    });

    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true, message: '邮箱为必填项' },
        ]
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ]
      }],
    });

    let productsOpts = [];

    for (let i = 0; i <data.length; i++) {
      productsOpts.push(<Option key={data[i].id}>{data[i].productName}</Option>);
    }

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    };

    return (
        <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="用户名" help={isFieldValidating('damId') ? '校验中...' : (getFieldError('damId') || []).join(', ')}>
            <Input {...accountProps} />
          </FormItem>

          <FormItem {...formItemLayout} label="密码">
            <Input type="password" {...passwordProps} />
          </FormItem>

          <FormItem {...formItemLayout} label="姓名">
            <Input {...nameProps} />
          </FormItem>

          <FormItem {...formItemLayout} label="手机">
            <Input {...phoneProps} type="tel" />
          </FormItem>

          <FormItem {...formItemLayout} label="公司名称">
            <Input {...companyProps} />
          </FormItem>

          <FormItem {...formItemLayout} label="邮箱">
            <Input {...emailProps} type="email" />
          </FormItem>

          <FormItem {...formItemLayout} label="产品选择">
            <Select multiple placeholder="请选择产品" {...getFieldProps('productids')}>
              {productsOpts}
            </Select>
          </FormItem>

          <FormItem wrapperCol={{ span: 8, offset: 4 }}>
            <Button type="primary" htmlType="submit">确定</Button><span className="gap-inline"></span><Button type="ghost" onClick={this.handleReset}>取消</Button>
          </FormItem>
        </Form>
    );
  }
}

CreateUser.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { products } = state;
  return {
    products
  };
}

export default connect(mapStateToProps)(CreateForm()(CreateUser));
