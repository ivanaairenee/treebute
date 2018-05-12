import styled from 'styled-components';

export const DashboardElement = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  background: ${props => props.theme.ivory};

  .chart {
  	width: 100%;
  }
`;
