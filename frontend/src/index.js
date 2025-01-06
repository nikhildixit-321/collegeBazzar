import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productcontext";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById("root"));

const domain= process.env.REACT_APP_AUTH_DOMAIN;
const clientId= process.env.REACT_APP_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
  {/* // our main app is inside reactprovider,therefore all the componenets and pages of our app can access the data of this provider,this app is working as a children for appprovider
  //app provider is bigger thats why outside and filtercontext provider is inside it so that it can use the data of appProvider ,because we get the products data through appprovider and the data which we have to show on products page is the same */}
<AppProvider>
  <FilterContextProvider>
    <CartProvider>
<App />
</CartProvider>
</FilterContextProvider>
</AppProvider>

</Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
