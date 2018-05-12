import styled from 'styled-components';

export const TopBarElement = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.white}
  border-bottom: 1px solid ${props => props.theme.gray};

  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
