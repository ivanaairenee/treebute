import styled from 'styled-components';

export const MainPageElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.gradientBackground};
  color: ${props => props.theme.white};

  .title {
    margin: 0;
    font-size: 5rem;
    font-style: italic;
    font-weight: 400;

    .bold {
      font-weight: 700;
    }
  }

  .tagline {
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 0.3rem;
  }

  .inputProject {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.3rem;

    input {
      width: 100%;
      margin-top: 1rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: 0;
      border-radius: 0.25rem;
      background: ${props => props.theme.green};
      color: ${props => props.theme.white};
    }
  }
`;
