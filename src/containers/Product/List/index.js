import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import CustomTable from '../../../components/CustomTable';

import {queryProducts} from '../../../actions/products';
import {activeProduct} from '../../../actions/product';
import {Form, Input, Row, Col, Button, InputNumber, Switch} from 'antd';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const CreateForm = Form.create;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state={
      query: {
        pageSize: 10,
        pageNum: 1
      }
    }
  }

  componentDidMount() {
    this.queryList()
  }

  queryList(){
    const {dispatch} = this.props;
    dispatch(queryProducts(this.state.query));
  }

  handleReset(e) {
    e.preventDefault();
    const {form} = this.props;
    form.resetFields();

    const creds = (form.getFieldsValue());

    Object.assign(this.state.query, creds);

    this.queryList()
  }

  handleSubmit(e) {
    e.preventDefault();

    const {form} = this.props;

    form.validateFields((errors) => {
      if (errors) {
        return;
      }
      const creds = (form.getFieldsValue());
      Object.assign(this.state.query, creds);
      this.queryList();
    });
  }

  activeProduct(id, status){
    const {dispatch} = this.props;
    status = status == 1 ? 0: 1;
    dispatch(activeProduct({
      id: id,
      state: status
    }, (msg) => {
      this.queryList()
    }));
  }

  gotoUpdate(id){
    browserHistory.push(`/product/update/${id}`)
  }

  handleTableChange(pagination, filters = {}) {
    const pageParams = {pageNum: pagination.current, pageSize: pagination.pageSize};
    const filtersField = {};

    if (Object.keys(filters).length !== 0) {
      for(name in filters){
        if(name == 'status' && filters[name].length>1){
          filters[name]=[]
        }
        filtersField[name]=filters[name].join(',')
      }
    }

    Object.assign(this.state.query, pageParams, filtersField);
    this.queryList()
  }

  render() {
    const {products: {data, meta, isFetching}} = this.props;
    const {getFieldProps} = this.props.form;

    const columns = [{
      title: "产品名称",
      dataIndex: "productName",
      key: "productName"
    }, {
      title: "产品限定人数(人)",
      dataIndex: "maxUser",
      key: "maxUser",
      sorter: (a, b) => a.maxUser - b.maxUser
    }, {
      title: "产品使用周期(月)",
      dataIndex: "counterWay",
      key: "counterWay",
      sorter: (a, b) => a.counterWay - b.counterWay
    }, {
      title: "产品存储空间(G)",
      dataIndex: "spaceAllowed",
      key: "spaceAllowed",
      sorter: (a, b) => a.spaceAllowed - b.spaceAllowed
    }, {
      title: "产品价格(元)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price
    }, {
      title: "产品介绍",
      dataIndex: "remark",
      key: "remark"
    }, {
      title: '操作',
      key: 'status',
      width: 200,
      filters: [
        { text: '已启用', value: '1' },
        { text: '已禁用', value: '0' },
      ],
      // filterMultiple: false,
      render: (item) => (
        <div>
          {/*<Switch onChange={this.activeProduct.bind(this, item.id, item.status)} checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={item.status}/>*/}
          {item.status == 1 && <Button onClick={this.activeProduct.bind(this, item.id, item.status)} type="primary">已启用</Button>}
          {item.status == 0 && <Button onClick={this.activeProduct.bind(this, item.id, item.status)} >已禁用</Button>}
          <Button className="gap-left" onClick={this.gotoUpdate.bind(this, item.id)}>修改</Button>
        </div>
      )
    }];

    const pagination = {
      showSizeChanger: true,
      total: meta.total,
      pageSize: this.state.query.pageSize,
      page: this.state.query.pageNum,
      pageSizeOptions: ['10', '20', '40', '100'],
      "showTotal": () => {
        return '共 ' + meta.total + ' 条';
      },
    };

    const formItemLayout = {
      labelCol: {span: 10},
      wrapperCol: {span: 14}
    };

    return (
      <div>
        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem label="产品名称" {...formItemLayout}>
                <Input placeholder="请输入产品名称" {...getFieldProps('productName')}/>
              </FormItem>
              <FormItem label="限定人数(人)" {...formItemLayout}>
                <Input placeholder="请输入限定人数" {...getFieldProps('maxUser')}/>
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="使用周期(月)" {...formItemLayout}>
                <Input placeholder="请输入使用周期" {...getFieldProps('counterWay')}/>
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="存储空间(G)" {...formItemLayout}>
                <Input placeholder="请输入存储空间" {...getFieldProps('spaceAllowed')}/>
              </FormItem>
            </Col>
          </Row>
          <div className="text-center">
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button type="ghost" className="gap-left" onClick={this.handleReset}>清除</Button>
          </div>
        </Form>
        <div className="pad-v-s">
          <Button type="primary"><Link to={'/product/create'}>添加产品</Link></Button>
        </div>
        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          bordered
          size="small"
        />
      </div>
    );
  }
}

ProductList.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {products} = state;
  return {
    products
  };
}

export default connect(mapStateToProps)(CreateForm()(ProductList));
