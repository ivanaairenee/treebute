import styled from 'styled-components';

export const DashboardElement = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.ivory};

  .chart {
  	width: 100%;
  }

  h1 {
  	font-size: 1.5rem;
  	margin: 0.2rem 0;
  	font-weight: 400;
  }

  .planned {
  	color: ${props => props.theme.green};
  }

  .actual {
  	color: ${props => props.theme.blue};
  }

  .commit {
  	font-size: 1rem;
  	margin: 1.5rem 0 0;
  }
`;
