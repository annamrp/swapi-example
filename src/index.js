import React from "react";
import ReactDOM from "react-dom";
import PeopleListContainer from "./People/PeopleListContainer";

import "./styles.css";

function App(props) {
  return <PeopleListContainer />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
