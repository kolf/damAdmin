/**
 * Created by linsheng.yan on 2016/10/8.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import { createProduct } from './../../actions/products';
import { queryRes } from './../../actions/res';
import {viewProduct} from './../../actions/product';
import './CreateProduct.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(viewProduct(this.props.routeParams.id));
    dispatch(queryRes());
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
      dispatch(createProduct(creds, () => browserHistory.push('/product/list')));
    });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  getResArr(data){
    // if(data && data.length){
    //   let result =[];
    //   data.forEach((item) => {
    //     result.push(item.id)
    //   });
    //   return result.join(',')
    // }else{
    //   return ''
    // }
    let result =[];
    data.forEach((item) => {
      result.push(item.id)
    });
    return result.join(',')
  }

  render() {
    const { product: { data} } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

    const resFnProps = getFieldProps('res', {
      initialValue: this.getResArr(data.productRes)
    });
    //alert(data.);
    const resOpts = () => {
      const {res} = this.props;
      const resOptGroup = res.data.map(res => <OptGroup key={res.id} label={res.resName}>
      {res.subRes.map(subRes => <Option key={subRes.id}>{subRes.resName}</Option>)}
      </OptGroup>)
      return (
        <Select multiple {...resFnProps}>
      {resOptGroup}
      </Select>
      )
    };

    const nameProps = getFieldProps('productName', {
      rules: [
        { required: true, min: 2, message: '产品名称至少为 2 个字符' },
        { validator: this.userExists },
      ],
      initialValue: data.productName
    });

    const peopleProps = getFieldProps('maxUser', {
      rules: [
        { required: true, type: 'number', message: '产品人数只能为数字' },
        { validator: this.userExists },
      ],
      initialValue: data.maxUser
    });

    const periodProps = getFieldProps('counterWay', {
      rules: [
        { required: true, type: 'number', message: '产品周期只能为数字' },
        { validator: this.userExists },
      ],
      initialValue: data.counterWay
    });

    const spaceProps = getFieldProps('spaceAllowed', {
      rules: [
        { required: true, type: 'number', message: '产品空间只能为数字' },
        { validator: this.userExists },
      ],
      initialValue: data.spaceAllowed
    });

    const priceProps = getFieldProps('price', {
      rules: [
        { required: true, type: 'number', message: '产品价格只能为数字' },
        { validator: this.userExists },
      ],
      initialValue: data.price
    });

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    };

    return (
      <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
  <FormItem
    {...formItemLayout}
    label="产品名称"
    hasFeedback
    >
    <Input {...nameProps} placeholder="实时校验产品名是否重复" />
      </FormItem>

      <FormItem
    {...formItemLayout}
    label="产品人数"
    hasFeedback
    >
    <InputNumber {...peopleProps} min={1} max={10} defaultValue={3}/>
      <span className="ant-form-text">人</span>
      </FormItem>

      <FormItem
    {...formItemLayout}
    label="产品周期"
    hasFeedback
    >
    <InputNumber {...periodProps} min={1} max={10} defaultValue={12}/>
      <span className="ant-form-text">月</span>
      </FormItem>

      <FormItem
    {...formItemLayout}
    label="产品空间"
    hasFeedback
    >
    <InputNumber {...spaceProps} min={1} max={10} defaultValue={1}/>
      <span className="ant-form-text">G</span>
      </FormItem>

      <FormItem
    {...formItemLayout}
    label="产品价格"
    hasFeedback
    >
    <InputNumber {...priceProps} min={1} max={10} defaultValue={100}/>
      <span className="ant-form-text">元</span>
      </FormItem>

      <FormItem
    {...formItemLayout}
    label="产品功能"
    hasFeedback
    >
    {resOpts()}
    </FormItem>

    <FormItem wrapperCol={{ span:10, offset: 4 }}>
  <Button type="primary" htmlType="submit">修改</Button>
      <span className="gap-inline"></span>
      <Button type="ghost" onClick={this.handleReset}>取消</Button>
    </FormItem>
    </Form>
  );
  }
}

ViewProduct.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { res, product } = state;
  return {
    res, product
  };
}

export default connect(mapStateToProps)(CreateForm()(ViewProduct));
