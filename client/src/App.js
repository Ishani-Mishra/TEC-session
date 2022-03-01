import React, { useState, Fragment, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "../src/components/header/Header"
import Display from "../src/components/display/Display"
import SignUp from "../src/components/signup/signup"
import SignIn from "../src/components/signin/signin"

function App(props) {

  const [isLogout, setIsLogout] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("token")){
      setIsLogout(false);
    } else {
      setIsLogout(true);
    }
  }, [isLogout]);

  const logOutHandle = () => {
    setIsLogout(true);
    localStorage.removeItem("token");
  }

  return (
    <Router>
        <Fragment>
          <Header logOutHandle={logOutHandle} isLogout={isLogout}/>
          <Routes>
            <Route path="/" element={<Display />} exact/>
            <Route path='/signup' element={<SignUp />} />
            <Route path="/signin" element={<SignIn {...props} isLogout={isLogout} setIsLogout={setIsLogout} />}/>  
          </Routes>
        </Fragment>
      </Router>
  );
}

export default App;
