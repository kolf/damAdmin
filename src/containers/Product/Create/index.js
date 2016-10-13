import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button, Form, Input, Select, InputNumber, TreeSelect, Message } from 'antd';
import {createProduct} from '../../../actions/products';
import {queryRes} from '../../../actions/res';

const CreateForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

function toTreeData(data, resultArr){
  data.forEach((item) => {
    let temp ={};
    temp.label= item.resName;
    temp.value= item.id;
    temp.key= item.id;
    if(item.subRes) {
      temp.children=[];
      toTreeData(item.subRes, temp.children)
    }
    resultArr.push(temp)
  })
}

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state={
      value: []
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(queryRes());
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
      creds.res = this.state.value;
      dispatch(createProduct(creds, (msg) => {
        Message.success('产品创建成功！');
        setTimeout(() => browserHistory.push('/product/list'), 1000)
      }));
    });
  }

  onChange(value){
    this.setState({ value });
  }

  render() {
    const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
    const res = this.props.res.data;
    const resTreeData= [];
    toTreeData(res, resTreeData);

    const nameProps = getFieldProps('productName', {
      rules: [
        {required: true, min: 2, message: '产品名称至少为 2 个字符'},
      ],
    });

    const peopleProps = getFieldProps('maxUser', {
      rules: [
        {required: true, type: 'number', message: '产品人数只能为数字'},
      ],
    });

    const periodProps = getFieldProps('counterWay', {
      rules: [
        {required: true, type: 'number', message: '产品周期只能为数字'},
      ],
    });

    const spaceProps = getFieldProps('spaceAllowed', {
      rules: [
        {required: true, type: 'number', message: '产品空间只能为数字'},
      ],
    });

    const priceProps = getFieldProps('price', {
      rules: [
        {required: true, type: 'number', message: '产品价格只能为数字'},

      ],
    });

    const remarkProps = getFieldProps('remark', {
      rules: [
        {required: true, message: '请填写产品介绍'}
      ]
    });

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 10}
    };

    const tProps = {
      treeData: resTreeData,
      value: this.state.value,
      onChange: this.onChange.bind(this),
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择',
      style: {
        width: 300,
      },
    };

    return (
      <Form horizontal className="ant-col-offset-5" onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="产品名称"
          hasFeedback
          help={isFieldValidating('productName') ? '校验中...' : (getFieldError('productName') || []).join(', ')}
        >
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


        <FormItem
          {...formItemLayout}
          label="产品功能"
          hasFeedback
        >
          <TreeSelect {...tProps} />
        </FormItem>

        <FormItem wrapperCol={{ span:10, offset: 4 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          <Button type="ghost" className="gap-left" onClick={this.handleReset}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

CreateProduct.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {res} = state;
  return {
    res
  };
}

export default connect(mapStateToProps)(CreateForm()(CreateProduct));
