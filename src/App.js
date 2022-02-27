import React, { Fragment} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "../src/components/header/Header"
import Display from "../src/components/display/Display"

function App() {
  return (
    <Router>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<Display />} />
          </Routes>
        </Fragment>
      </Router>
  );
}

export default App;
