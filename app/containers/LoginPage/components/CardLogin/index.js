import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CardLogin = styled(Card)`
  && {
    background-color: transparent;
    border: none;
    align-items: center;
    justify-content: center;
  }
`;
const CardLoginContent = styled(CardContent)`
  && {
    width: 80%;
    align-items: center;
  }
`;

export { CardLogin, CardLoginContent };
