import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button, Form, Input, Select, InputNumber, Tree, Message} from 'antd';
import {queryRes} from '../../../actions/res';
import {getProduct, updateProduct} from '../../../actions/product';

import './index.scss';

const CreateForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const productRes = data => {
  if(data){
    return data.map((item) => {
      return `${item.id}`
    });
  }
};

class ProductUpdate extends Component {
  static propTypes = {
    viewProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    queryRes: PropTypes.func,
    product: PropTypes.object,
    res: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      checkedRes: [],
      defaultCheckedRes: []
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(queryRes()); // 产品功能
    // region
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getProduct({
      id: this.props.routeParams.id
    }, (data)=> {
      this.setState({
        checkedRes: productRes(data.productRes)
      });
    })); // item query
  }

  handleReset(e) {
    // e.preventDefault();
    // this.props.form.resetFields();
    browserHistory.push('/product/list')
  }

  handleSubmit(e) {
    e.preventDefault();

    const {dispatch} = this.props;

    this.props.form.validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = (this.props.form.getFieldsValue());
      Object.assign(creds, {
        res: this.state.checkedRes,
        id: this.props.routeParams.id
      });
      dispatch(updateProduct(creds, (msg) => {
        Message.success('产品修改成功！');
        setTimeout(() => browserHistory.push('/product/list'), 1000)
      }));
    });
  }

  onCheckRes(checkedRes) {
    this.setState({
      checkedRes
    })
  }

  render() {
    console.log(this.state.checkedRes);

    const productData = this.props.product.data;

    const res = this.props.res.data;
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

    const nameProps = getFieldProps('productName', {
      rules: [
        {required: true, min: 2, message: '请填写产品名称'}
      ],
      initialValue: productData.productName
    });

    const peopleProps = getFieldProps('maxUser', {
      rules: [
        {required: true, type: 'number', message: '请填写产品人数'}
      ],
      initialValue: productData.maxUser
    });

    const periodProps = getFieldProps('counterWay', {
      rules: [
        {required: true, type: 'number', message: '请填写产品周期'}
      ],
      initialValue: productData.counterWay
    });

    const spaceProps = getFieldProps('spaceAllowed', {
      rules: [
        {required: true, type: 'number', message: '请填写产品空间'}
      ],
      initialValue: productData.spaceAllowed
    });

    const priceProps = getFieldProps('price', {
      rules: [
        {required: true, type: 'number', message: '请填写产品价格'}
      ],
      initialValue: productData.price
    });

    const remarkProps = getFieldProps('remark', {
      rules: [
        {required: true, message: '请填写产品介绍'}
      ],
      initialValue: productData.remark
    });

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 10}
    };

    const loop = data => data.map((item) => {
      if (item.subRes && item.subRes.length) {
        return (
          <TreeNode key={item.id} title={item.resName}>
            {loop(item.subRes)}
          </TreeNode>
        );
      }else{
        return <TreeNode key={item.id} title={item.resName} />;
      }
    });

    return (
      <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="产品名称" help={isFieldValidating('productName') ? '校验中...' : (getFieldError('productName') || []).join(', ')}>
          <Input {...nameProps} placeholder="实时校验产品名是否重复"/>
        </FormItem>

        <FormItem {...formItemLayout} label="产品介绍">
          <Input placeholder="请填写产品介绍" type="textarea" {...remarkProps} />
        </FormItem>

        <FormItem {...formItemLayout} label="产品人数">
          <InputNumber {...peopleProps} min={1} max={100000}/>
          <span className="ant-form-text">人</span>
        </FormItem>

        <FormItem {...formItemLayout} label="产品周期">
          <InputNumber {...periodProps} min={1} max={100000}/>
          <span className="ant-form-text">月</span>
        </FormItem>

        <FormItem {...formItemLayout} label="产品空间">
          <InputNumber {...spaceProps} min={1} max={100000}/>
          <span className="ant-form-text">G</span>
        </FormItem>

        <FormItem {...formItemLayout} label="产品价格">
          <InputNumber {...priceProps} min={1} max={100000}/>
          <span className="ant-form-text">元</span>
        </FormItem>
        {
          res && <div className="ant-row ant-form-item">
            <div className="ant-col-4 ant-form-item-label">
              <label>产品功能</label>
            </div>
            <div className="ant-col-10 tree-box">
              <Tree checkable multiple checkedKeys={this.state.checkedRes} onCheck={this.onCheckRes.bind(this)}>
                {loop(res)}
              </Tree>
            </div>
          </div>
        }

        <FormItem wrapperCol={{ span:10, offset: 4 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          <Button type="ghost" className="gap-left" onClick={this.handleReset}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

ProductUpdate.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {res, product} = state;
  return {
    res,
    product
  };
}

export default connect(mapStateToProps)(CreateForm()(ProductUpdate));
