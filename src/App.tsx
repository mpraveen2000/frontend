import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import LayoutDesign from "./app/layout/Tags";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { AppRouting } from "./routing";
import { BrowserRouter } from "react-router-dom";
import { FirebaseLoginService } from "./Login/login-service";
import { firebaseConfig } from "./Login/firebaseConfig";
function App() {
  new FirebaseLoginService().initialize(firebaseConfig);
  return (
    <ApolloProvider client={client}>
      <AppRouting />
    </ApolloProvider>
  );
}

export default App;
