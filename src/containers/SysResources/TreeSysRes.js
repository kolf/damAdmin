/**
 * Created by lirui on 2016/9/21.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CustomTable from './../../components/CustomTable';
import { querySysRes } from '../../actions/sysRes';
import { treeSysRes } from '../../actions/SysResourceTree';



import { Form, Input, Row, Col, Button, InputNumber } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

function mapDispatchToProps(dispatch) {
  return {
    treeSysRes: (params) => dispatch(treeSysRes(params))
  };
}

class TreeSysRes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.querySysRes();
    const { dispatch } = this.props;
    dispatch(treeSysRes());
  }

  render() {
    // const { products: { data, meta, isFetching } } = this.props;
    const { sysResTree } = this.props;
    console.log(sysResTree);
    return (
      <div>
        ddd
      </div>
    );
  }
}

TreeSysRes.propTypes = {
};

function mapStateToProps() {
  const { sysResTree } = state;
  return {
    sysResTree
  };
}


export default connect(mapDispatchToProps)(TreeSysRes);


