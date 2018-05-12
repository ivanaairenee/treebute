import styled from 'styled-components';

export const CardMemberElement = styled.div`
  background-color: ${props => props.theme.white};
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.gray};
  margin: 1rem 1rem;
  text-align: center;

  img {
    margin: auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .name {
    margin: 10px;
    font-size: 30px;
    font-style: italic;
  }

  .cp {
    font-size: 40px;
    margin: 10px;
    font-style: italic;
    color: ${props => props.theme.green};
  }
`;
