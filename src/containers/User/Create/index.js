import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button, Form, Input, Select, Switch, Message} from 'antd';
import {createUser} from '../../../actions/users';
import {queryProducts} from '../../../actions/products';
import re from '../../../config/regexp';

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
    const {dispatch} = this.props;
    dispatch(queryProducts({
      pageNum: 1,
      pageSize: 100,
      state: 1
    }));
  }

  handleReset(e) {
    // e.preventDefault();
    // this.props.form.resetFields();
    browserHistory.push('/user/list')
  }

  handleSubmit(e) {
    e.preventDefault();

    const {dispatch} = this.props;

    this.props.form.validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = (this.props.form.getFieldsValue());
      dispatch(createUser(creds, (msg) => {
        Message.success(msg);
        setTimeout(()=> browserHistory.push('/user/list'), 1000)
      }));
    });
  }

  render() {
    const productList = this.props.products.data;
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    const accountProps = getFieldProps('damId', {
      rules: [
        {required: true, min: 4, message: '用户名至少为 4 个字符'},
      ]
    });

    const nameProps = getFieldProps('userName', {
      rules: [
        {required: true, min: 2, message: '姓名至少为 2 个字符'},
      ]
    });

    const passwordProps = getFieldProps('damPasswd', {
      rules: [
        {required: true, whitespace: true, min: 6, message: '密码至少为 6 个字符'},
      ]
    });

    const companyProps = getFieldProps('orgName', {});

    const remarkProps = getFieldProps('remark', {});

    const productsProps = getFieldProps('productids', {});

    const phoneProps = getFieldProps('mobile', {
      rules: [
        {required: true, max: 11, message: '请填写手机号'},
        {validator: (rule, value, callback) => {
          if (!re.phone.test(value)) {
            callback('手机号格式不正确');
          } else {
            callback();
          }
        }}
      ]
    });

    const emailProps = getFieldProps('mail', {
      validate: [{
        rules: [
          {required: true, message: '邮箱为必填项'},
        ]
      }, {
        rules: [
          {type: 'email', message: '请输入正确的邮箱地址'},
        ]
      }],
    });

    const productsOpts = (data) => data.map((item) => {
      return <Option key={item.id}>{item.productName}</Option>
    });

    // let productsOpts = [];
    //
    // for (let i = 0; i < data.length; i++) {
    //   productsOpts.push(<Option key={data[i].id}>{data[i].productName}</Option>);
    // }

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 10}
    };

    return (
      <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名"
                                      help={isFieldValidating('damId') ? '校验中...' : (getFieldError('damId') || []).join(', ')}>
          <Input {...accountProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="密码">
          <Input type="password" {...passwordProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="姓名">
          <Input {...nameProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="手机">
          <Input {...phoneProps} type="tel"/>
        </FormItem>

        <FormItem {...formItemLayout} label="公司名称">
          <Input {...companyProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="邮箱">
          <Input {...emailProps} type="email"/>
        </FormItem>

        <FormItem {...formItemLayout} label="用户说明">
          <Input placeholder="请填写用户说明" type="textarea" {...remarkProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="产品选择">
          {productList && <Select multiple placeholder="请选择产品" {...productsProps}>
            {productsOpts(productList)}
          </Select>}
        </FormItem>

        <FormItem wrapperCol={{ span: 8, offset: 4 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          <Button className="gap-left" type="ghost" onClick={this.handleReset}>取消</Button>
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
  const {products} = state;
  return {
    products
  };
}

export default connect(mapStateToProps)(CreateForm()(CreateUser));
