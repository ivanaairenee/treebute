import styled from 'styled-components';

export const ProfileElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 8rem;

  img {
    border-radius: 50%;
  }

  h2 {
    margin: 0;
    font-weight: 400;
    font-size: 1.2rem;
    margin: 1rem 0;
  }

  h1 {
    color: ${props => props.theme.green};
    margin: 0;
    font-style: italic;
    font-size: 2rem;
  }

  h3 {
    font-size: 30px;
    font-style: italic;
    font-weight: 400;
    margin: 1rem 0 0;
  }
`;