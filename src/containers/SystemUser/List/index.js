/**
 * Created by lirui on 2016/9/25.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {querySystemUsers} from '../../../actions/SystemUser';
import {toggleActive} from '../../../actions/users';
import {Form, Input, Row, Col, Button} from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const CreateForm = Form.create;

class SysUsers extends Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      query: {
        pageSize: 10,
        pageNum: 1
      }
    }
  }

  componentDidMount() {
    this.queryList()
  }

  queryList() {
    const {dispatch} = this.props;
    dispatch(querySystemUsers(this.state.query));
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

  activeUser(id, status) {
    const {dispatch} = this.props;
    status = status == 1 ? 0 : 1;
    dispatch(toggleActive({
      id: id,
      state: status
    }, (msg) => {
      this.queryList()
    }));
  }

  handleTableChange(pagination, filters = {}) {
    const pageParams = {pageNum: pagination.current, pageSize: pagination.pageSize};
    const filtersField = {};

    if (Object.keys(filters).length !== 0) {
      for (name in filters) {
        if (name == 'status' && filters[name].length > 1) {
          filters[name] = []
        }
        filtersField[name] = filters[name].join(',')
      }
    }

    Object.assign(this.state.query, pageParams, filtersField);
    this.queryList()
  }

  render() {
    const {systemUsers: {data, meta, isFetching}} = this.props;

    const {getFieldProps} = this.props.form;


    const columns = [{
      title: "用户名",
      dataIndex: "damId",
      key: "damId",
      sorter: (a, b) => a.damId - b.damId
    }, {
      title: "用户姓名",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName - b.userName
    }, {
      title: "手机号",
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) => a.mobile - b.mobile
    }, {
      title: "E-MAIL",
      dataIndex: "mail",
      key: "mail",
      sorter: true
    }, {
      title: "注册时间",
      dataIndex: "regTime",
      key: "regTime",
      sorter: (a, b) => a.regTime - b.regTime
    }, {
      title: "说明",
      dataIndex: "remark",
      key: "remark",
      sorter: (a, b) => a.remark - b.remark
    }, {
      title: '操作',
      key: 'status',
      width: 200,
      filters: [
        {text: '已启用', value: '1'},
        {text: '已禁用', value: '0'},
      ],
      filterMultiple: true,
      render: (item) => (
        <div>
          {/*<Switch onChange={this.activeProduct.bind(this, item.id, item.status)} checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={item.status}/>*/}
          {item.status == 1 &&
          <Button onClick={this.activeUser.bind(this, item.id, item.status)} type="primary">已启用</Button>}
          {item.status == 0 && <Button onClick={this.activeUser.bind(this, item.id, item.status)}>已禁用</Button>}
          <Button className="gap-left"><Link to={`/user/update/${item.id}`}>修改</Link></Button>
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
              <FormItem label="用户名" {...formItemLayout} >
                <Input placeholder="请输入用户名" {...getFieldProps('damId')} />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="用户姓名" {...formItemLayout}>
                <Input placeholder="请输入用户姓名" {...getFieldProps('userName')} />
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem label="手机号" {...formItemLayout}>
                <Input placeholder="请输入手机号" {...getFieldProps('mobile')} />
              </FormItem>
            </Col>
          </Row>
          <div className="text-center">
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button type="ghost" className="gap-left" onClick={this.handleReset}>清除</Button>
          </div>
        </Form>
        <div className="pad-v-s">
          <Button type="primary"><Link to={'/user/createSysUser'}>添加用户</Link></Button>
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


SysUsers.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {systemUsers} = state;

  return {
    systemUsers
  };
}

export default connect(mapStateToProps)(CreateForm()(SysUsers));
