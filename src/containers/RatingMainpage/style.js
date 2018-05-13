import styled from 'styled-components';

export const RatingMainPageElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5rem;
  min-height: 100vh;
  display: flex;
  background: ${props => props.theme.ivory};

  .cardContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  h1 {
    font-weight: 400;
  }

  .card {
    background-color: ${props => props.theme.white};
    width: 300px;
    height: 20rem;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    border: 1px solid ${props => props.theme.gray};
    margin: 1rem 1rem;
    align-items: center;
    justify-content: center;

    img {
      width: 170px;
      height: 170px;
      object-fit: cover;
      border-radius: 50%;
    }

    .name {
      margin: 10px;
      font-size: 30px;
      font-style: italic;
      font-weight: 400;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 2rem;
      font-size: 1rem;
      border: 0;
      border-radius: 1rem;
      font-weight: 700;
      background: ${props => props.theme.green};
      color: ${props => props.theme.white};
    }
  }
`;
