import styled from 'styled-components';

export const CardTaskElement = styled.div`

  .container {
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
    border-radius: 10px;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.3);
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.3);
    margin: 50px;
    background-color: ${props => props.theme.white};
  }

  .taskName {
    padding: 10px;
    margin: auto;
    color: ${props => props.theme.black};

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
