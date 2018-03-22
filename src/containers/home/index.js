import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Title = styled.h1`
  color: red;
`;

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Title>Home</Title>
        <p>This is your home!</p>
        <button onClick={() => this.props.changePage()}>Go to about page via redux</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)