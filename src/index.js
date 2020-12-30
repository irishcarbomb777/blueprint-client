import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  // Initiates the S3 
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      { // Mockupgenerator DynamoDB api
        name: "blueprint-mockupgen-api",
        endpoint: config.apiGatewayJS.URL,
        region: config.apiGatewayJS.REGION
      },
      {
        name: "blueprint-python-api",
        endpoint: config.apiGatewayPY.URL,
        region: config.apiGatewayPY.REGION
      }
      // NOTE: You'll need to add the python server API below this entry
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
