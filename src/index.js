import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { Provider } from "react-redux";
import App from "./components/App";
import { configureStore } from "./store/index";
let store = configureStore();
// const firebaseConfig = {
//   apiKey: "AIzaSyB-Vum17rDD7VESG0Xg9lu_wHUWK_W-fbM",
//   authDomain: "cart-2f05c.firebaseapp.com",
//   databaseURL: "https://cart-2f05c.firebaseio.com",
//   projectId: "cart-2f05c",
//   storageBucket: "cart-2f05c.appspot.com",
//   messagingSenderId: "784450824539",
//   appId: "1:784450824539:web:ae134b205df817c8f6927e"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
