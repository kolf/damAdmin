import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button, Form, Input, Select, Switch, Message} from 'antd';
import {updateUser, getUser} from '../../../actions/users';
import {queryProducts} from '../../../actions/products';
import re from '../../../config/regexp';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

class UpdateUser extends Component {
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
      status: 1
    }));
    dispatch(getUser({
      id: this.props.routeParams.id
    }))
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
      creds.id = this.props.routeParams.id;
      dispatch(updateUser(creds, (msg) => {
        Message.success(msg);
        setTimeout(()=> browserHistory.push('/user/list'), 1000)
      }));
    });
  }

  render() {
    const productList = this.props.products.data;
    const userInfo = this.props.user.data;
    const {getFieldProps} = this.props.form;

    const nameProps = getFieldProps('userName', {
      initialValue: userInfo.userName
    });

    const passwordProps = getFieldProps('damPasswd', {});

    const remarkProps = getFieldProps('remark', {
      initialValue: userInfo.remark
    });

    const companyProps = getFieldProps('orgName', {
      initialValue: userInfo.orgName
    });

    const productsProps = getFieldProps('productids', {
      initialValue: userInfo.productids
    });

    const phoneProps = getFieldProps('mobile', {
      rules: [
        {validator: (rule, value, callback) => {
          if (!re.phone.test(value)) {
            callback('手机号格式不正确');
          } else {
            callback();
          }
        }}
      ],
      initialValue: userInfo.mobile
    });

    const emailProps = getFieldProps('mail', {
      validate: [{
        rules: [
          {type: 'email', message: '请输入正确的邮箱地址'},
        ]
      }],
      initialValue: userInfo.mail
    });

    const productsOpts = (data) => data.map((item) => {
      return <Option key={item.id}>{item.productName}</Option>
    });

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 10}
    };

    return (
      <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名">
          {userInfo.damId}
        </FormItem>

        <FormItem {...formItemLayout} label="密码">
          <Input type="password" {...passwordProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="姓名">
          <Input {...nameProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="手机">
          <Input {...phoneProps} type="text"/>
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
          {
            productList && <Select multiple placeholder="请选择产品" {...productsProps}>
              {productsOpts(productList)}
            </Select>
          }
        </FormItem>

        <FormItem wrapperCol={{ span: 8, offset: 4 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          <Button className="gap-left" type="ghost" onClick={this.handleReset}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

UpdateUser.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {products, user} = state;
  return {
    products,
    user
  };
}

export default connect(mapStateToProps)(CreateForm()(UpdateUser));
