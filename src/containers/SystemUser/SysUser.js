/**
 * Created by lirui on 2016/9/25.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button } from 'antd';
import { Link } from 'react-router';
import CustomTable from './../../components/CustomTable';
import { querySystemUsers } from './../../actions/SystemUser';
const CreateForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

class SysUsers extends Component {


  constructor(props) {
    // console.log("-----construtct--------");
    // console.log(props);
    // console.log("-----construtct end--------");
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(querySystemUsers())
  }


  render() {
    console.log("##########################################3")
    console.log(this.props);
    console.log("##########################################4")
    const {systemUsers: {data, meta, isFetching}} = this.props;

    //console.log(this.props.systemUsers);



    const columns = [{
      title: "用户帐号",
      dataIndex: "damId",
      key: "damId",
      sorter: true
    },{
      title: "用户姓名",
      dataIndex: "userName",
      key: "userName",
      sorter: true
    },{
      title: "手机号",
      dataIndex: "mobile",
      key: "mobile",
      sorter: true
    },{
      title: "E-MAIL",
      dataIndex: "mail",
      key: "mail",
      sorter: true
    },{
      title: "注册时间",
      dataIndex: "regTime",
      key: "regTime",
      sorter: true
    },{
      title: "说明",
      dataIndex: "remark",
      key: "remark",
      sorter: true
    },{
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
          <FormItem label="用户帐号" {...formItemLayout} >
      <Input placeholder="请输入产品名称" size="default" />
          </FormItem>
          </Col>
          <Col sm={8}>
          <FormItem label="用户姓名" {...formItemLayout}>
      <Input placeholder="请输入搜索名称" size="default" />
          </FormItem>
          </Col>
          <Col sm={8}>
          <FormItem label="手机号" {...formItemLayout}>
      <Input placeholder="请输入搜索名称" size="default" />
          </FormItem>
          </Col>
          </Row>
          <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
      <Button type="primary" htmlType="submit">搜索</Button>
          <Button>清除条件</Button>
          </Col>
          </Row>
          </Form>
          <Row>
          <Col span={8}>
          <div style={{ marginBottom: 16 }}>
      <Button type="primary"><Link to={'/user/create'}>添加用户</Link></Button>
          </div>
          </Col>
          </Row>
          <CustomTable
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={isFetching}
        bordered
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
  const { systemUsers } = state;
  console.log("mapStateToProps");
  console.log(state);
  console.log("mapStateToProps end");
  return {
    systemUsers
  };
}

export default connect(mapStateToProps)(CreateForm()(SysUsers));
