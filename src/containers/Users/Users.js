import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';
import { queryUsers, toggleActive } from './../../actions/users';
import {Form, Input, Row, Col, Button, InputNumber, Switch} from 'antd';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const CreateForm = Form.create;

import './Users.scss';

class Users extends Component {
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
    dispatch(queryUsers(this.state.query));
  }

  handleReset(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    this.props.form.resetFields();

    dispatch(queryUsers({
      pageSize: this.state.pageSize,
      pageNum: 1
    }));
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
    dispatch(toggleActive({
      id: id,
      state: status
    }, (msg) => {
      this.queryList()
    }));
  }

  handleTableChange(pagination, filters = {}) {
    const pageParams = {pageNum: pagination.page, pageSize: pagination.pageSize};
    const filtersField = {};

    if (Object.keys(filters).length !== 0) {
      for(name in filters){
        filtersField[name]=filters[name].join(',')
      }
    }

    Object.assign(this.state.query, pageParams, filtersField);
    this.queryList()
  }

  render() {
    const { users: { data, meta, isFetching } } = this.props;
    const {getFieldProps} = this.props.form;

    const columns = [{
        title: "用户帐号",
        dataIndex: "damId",
        key: "damId",
        sorter: (a, b) => a.damId - b.damId
      },{
        title: "用户姓名",
        dataIndex: "userName",
        key: "userName",
        sorter: (a, b) => a.userName - b.userName
      },{
        title: "手机号",
        dataIndex: "mobile",
        key: "mobile",
        sorter: (a, b) => a.mobile - b.mobile
      },{
        title: "公司名称",
        dataIndex: "company",
        key: "company",
        sorter: (a, b) => a.company - b.company
      },{
        title: "申请时间",
        dataIndex: "regTime",
        key: "regTime",
        sorter: (a, b) => a.regTime - b.regTime
      },{
        title: "定制产品",
        dataIndex: "products",
        key: "products"
      },{
        title: '操作',
      key: 'status',
      width: 200,
      filters: [
        { text: '开', value: '1' },
        { text: '关', value: '0' },
      ],
      filterMultiple: false,
      render: (item) => (
        <div>
          <Switch onChange={this.activeProduct.bind(this, item.id, item.status)} checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={item.status}/>
          {/*item.status == 1 && <Button onClick={this.activeProduct.bind(this, item.id, item.status)} type="primary">已打开</Button>*/}
          {/*item.status == 0 && <Button>已关闭</Button>*/}
          <Button className="gap-left"><Link to={`/user/update/${item.id}`}>修改</Link></Button>
        </div>
      )
    }];

    const pagination = {
      showSizeChanger: true,
      total: meta.total,
      pageSize: this.state.query.pageSize,
      page: meta.pageNum,
      pageSizeOptions: ['10', '20', '40', '100']
    };

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    return (
      <div>
        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem label="用户帐号" {...formItemLayout} >
                <Input placeholder="请输入用户帐号" {...getFieldProps('damId')} />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="用户姓名" {...formItemLayout}>
                <Input placeholder="请输入用户姓名" {...getFieldProps('userName')} />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="手机号" {...formItemLayout}>
                <Input placeholder="请输入手机号" {...getFieldProps('phone')} />
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
        <div className="pad-v-s">
          <Button type="primary"><Link to={'/user/create'}>添加用户</Link></Button>
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

Users.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

export default connect(mapStateToProps)(CreateForm()(Users));
