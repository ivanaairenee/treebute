import styled from 'styled-components';

export const CardTaskElement = styled.div`
  background-color: ${props => props.theme.white};
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.gray};
  margin: 1rem 1rem;

  .taskName {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.black};
    font-size: 1.8rem;

    .status {
      display: flex;
      height: 1.2rem;
      padding: 0 0.5rem;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      border: 1px solid ${props => props.theme.gray};
      font-size: 0.7rem;
      line-spacing: 0;
    }

    .complete {
      color: ${props => props.theme.green}
    }

    .incomplete {
      color: ${props => props.theme.red }
    }
  }

  .assignee {
    font-size: 1rem;
    color: ${props => props.theme.green};
    font-weight: 600;
  }

  .weight {
    margin-top: 1rem;
    font-weight: 0.8rem;
    color: ${props => props.theme.black};    
  }

`;
