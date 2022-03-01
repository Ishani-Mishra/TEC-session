import React, { useState, Fragment, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/header/Header"
import Display from "./components/display/Display"
import Signup from "./components/signup/Signup"
import SignIn from "./components/signin/SignIn"
import Compose from "./components/compose/Compose"
import Delete from "./components/delete/Delete"

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
            <Route path="/compose" element={<Compose />} />
            <Route path="/delete" element={<Delete />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/signin" element={<SignIn {...props} isLogout={isLogout} setIsLogout={setIsLogout} />}/>  
          </Routes>
        </Fragment>
      </Router>
  );
}

export default App;
