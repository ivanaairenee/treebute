import styled from 'styled-components';

export const TaskWeightElement = styled.div`
  text-align: center;

  input {
    width: 60px;
    padding: 10px;
    text-align: center;
    display:inline;
  }
  button {
    margin: 5px;
    background: ${props => props.theme.green};
    padding:8px;
    text-decoration: none;
    border: none;
    font-size: 20px;
    width: 50px;
  }
`;
