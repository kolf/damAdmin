/**
 * Created by lirui on 2016/9/21.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';
import { querySysRes } from '../../actions/sysRes';
import { treeUserRes } from '../../actions/UserResourceTree';

import { Form, Input, Row, Col, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

function mapDispatchToProps(dispatch) {
  return {
    treeUserRes: (params) => dispatch(treeUserRes(params))
  };
}

class TreeUserRes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.querySysRes();
    const { dispatch } = this.props;
    dispatch(treeUserRes());
  }

  render() {
    // const { products: { data, meta, isFetching } } = this.props;
    return (
      <div>
      ddd
      </div>
  );
  }
}

TreeUserRes.propTypes = {
};

function mapStateToProps() {
  return {
  };
}


export default connect(mapDispatchToProps)(TreeUserRes);


