import styled from 'styled-components';

export const ExampleElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  color: ${props => props.theme.white};
  background: ${props => props.theme.green};
`;
