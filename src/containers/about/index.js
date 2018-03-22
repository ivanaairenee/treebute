import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class About extends React.PureComponent {
  render() {

    return (
      <div>
        <h1>About</h1>
        <p>About us</p>
        <button onClick={() => this.props.push('/about-us')}>Go to about page via redux</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(
  null, 
  mapDispatchToProps
)(About)