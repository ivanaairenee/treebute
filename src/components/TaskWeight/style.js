import styled from 'styled-components';

export const TaskWeightElement = styled.div`
  margin: 1rem 0 0;
  display: flex;
  flex-direction: row;

  input {
    width: 4rem;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    border: 1px solid ${props => props.theme.gray};
    text-align: center;
    display:inline;
  }
`;
