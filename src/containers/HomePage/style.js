import styled from 'styled-components';

export const HomePageElement = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: ${props => props.theme.ivory};

  .chart {
  	width: 100%;
  }
`;
