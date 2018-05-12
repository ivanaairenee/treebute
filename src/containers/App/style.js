import styled from 'styled-components';
import { theme } from './theme';

export const AppElement = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: ${theme.ivory};

  .container {
    width: 100%;
    display: flex;

    .navigation {
      flex: 1;
    }

    .content {
      flex: 20;
      border-left: 1px solid ${theme.gray};
    }
  }
`;
