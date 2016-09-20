import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';

import { queryProducts } from '../../actions/products';
import { Form, Input, Row, Col, Button, InputNumber } from 'antd';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const CreateForm = Form.create;

import './Products.scss';

class Products extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(queryProducts());
  }

  handleReset(e) {
    e.preventDefault();
    console.log(this.props);
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
      dispatch(queryProducts(creds));
  });
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const { dispatch } = this.props;
    const pageParams = { pageNum: pagination.current, pageSize: pagination.pageSize };
    const filtersField = {};
    if(Object.keys(filters).length !== 0) {
      ['name'].map(item => {
        if(filters[item]){
          filtersField[`q[${item}_cont]`] = filters[item];
        }
      });
    }
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);
    dispatch(queryProducts(params));
  }

  render() {
    const { products: { data, meta, isFetching } } = this.props;
    const columns = [{
        title: "产品名称",
        dataIndex: "productName",
        key: "productName",
        sorter: true
      },
      {
        title: "产品限定人数(人)",
        dataIndex: "maxUser",
        key: "maxUser",
        sorter: true
      },
      {
        title: "产品使用周期(月)",
        dataIndex: "counterWay",
        key: "counterWay",
        sorter: true
      },
      {
        title: "产品存储空间(G)",
        dataIndex: "spaceAllowed",
        key: "spaceAllowed",
        sorter: true
      },
      {
        title: "产品价格(元)",
        dataIndex: "price",
        key: "price",
        sorter: true
      },
      {
        title: "产品介绍",
        dataIndex: "intro",
        key: "intro",
        sorter: true
      },
      {
        title: '操作',
        key: 'operation',
        render: () => (
          <ButtonGroup>
            <Button type="primary">启用</Button>
            <Button type="ghost">停用</Button>
          </ButtonGroup>
        )
      }
    ];

    const pagination = {
      showSizeChanger: true,
      total: meta.total,
      pageSize: meta.pageSize,
      pageSizeOptions: ['5','10','20','40']
    };

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    return (
      <div>
        <Form horizontal className="ant-advanced-search-form">
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem label="产品名称" {...formItemLayout}>
                <Input placeholder="请输入产品名称" size="default" />
              </FormItem>
              <FormItem label="限定人数(人)" {...formItemLayout}>
                <Input placeholder="请输入搜索名称" size="default" />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="使用周期(月)" {...formItemLayout}>
                <Input placeholder="请输入搜索名称" size="default" />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="存储空间(G)" {...formItemLayout}>
                <Input placeholder="请输入搜索名称" size="default" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={12} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button type="ghost" onClick={this.handleReset}>清除</Button>
            </Col>
          </Row>
        </Form>
        <div className="pad-v">
          <Button type="primary"><Link to={'/product/create'}>添加产品</Link></Button>
        </div>
        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={isFetching}
          onChange={this.handleTableChange}
          bordered
        />
      </div>
    );
  }
}

Products.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { products } = state;
  return {
    products
  };
}

export default connect(mapStateToProps)(CreateForm()(Products));
