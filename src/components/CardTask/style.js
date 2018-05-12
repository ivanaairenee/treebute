import styled from 'styled-components';

export const CardTaskElement = styled.div`
  margin: 0;
  background-color: ${props => props.theme.white};
  .container {
    background-color: ${props => props.theme.white};
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
    border-radius: 3px;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.3);
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.3);
    margin: 0px 0px 50px 50px;
  }

  .taskName {
    padding: 10px;
    margin: auto;
    color: ${props => props.theme.black};
  }

  .taskDetail {
  }

  .label {
    color: ${props => props.theme.black};
    font-weight: bold;
    margin: 10px;
  }

  .complete {
    color: ${props => props.theme.green};
  }

  .incomplete {
    color: ${props => props.theme.red};

  }

  .content {
    margin-left: 7px;
    font-weight: lighter;
  }

`;
