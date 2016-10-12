import React, { Component } from 'react';

import { connect } from 'react-redux';

class UserUpdate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>用户编辑</div>;
  }
}

UserUpdate.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(UserUpdate);
