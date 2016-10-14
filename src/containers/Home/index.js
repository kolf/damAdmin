import React, { Component } from 'react';

import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>首页</div>;
  }
}

Home.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Home);
