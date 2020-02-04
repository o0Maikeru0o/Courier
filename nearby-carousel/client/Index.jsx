import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Nearby from './components/Nearby.jsx';

const GlobalStyle = createGlobalStyle`
  body {
    @font-face {
      font-family: "PostMates";
      src: url(https://restaurantmediafec.s3.us-east-2.amazonaws.com/postmates+fonts/postmates-std-regular.woff) format("woff");
      }

      @font-face {
        font-family: "PostMatesBold";
        src: url(https://restaurantmediafec.s3.us-east-2.amazonaws.com/postmates+fonts/postmates-std-bold.woff) format("woff");
      }

      @font-face {
        font-family: "PostMatesMed";
        src: url(https://restaurantmediafec.s3.us-east-2.amazonaws.com/postmates+fonts/postmates-std-medium.woff) format("woff");
      }
  }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <Nearby />
  </React.Fragment>,
  document.getElementById('nearby'),
);
