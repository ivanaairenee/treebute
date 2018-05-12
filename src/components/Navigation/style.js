import styled from 'styled-components';

export const NavigationElement = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.white};

  .menuItem {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.gray};
  }

  .active {
    color: ${props => props.theme.green};
  }

  .link {
    text-decoration: none;
    padding: 2rem 1rem;
  }
`;
