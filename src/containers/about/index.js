import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const About = props => (
  <div>
    <h1>About</h1>
    <p>About us</p>
    <button onClick={() => props.changePage()}>Go to about page via redux</button>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null, 
  mapDispatchToProps
)(About)