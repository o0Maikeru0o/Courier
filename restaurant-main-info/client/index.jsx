import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { createGlobalStyle } from 'styled-components';

import MainInfoBar from './components/MainInfoBar.jsx';

ReactModal.setAppElement('#mainbar');

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


// entry point for webpack
ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <MainInfoBar />
  </ React.Fragment>
  , document.getElementById('mainbar'));
