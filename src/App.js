import './App.css';
import Register from "./Components/register"
import Login from "./Components/login"
import Welcome from "./Components/Welcome"
import { connect } from "react-redux"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


function App({ user }) {
  let token = localStorage.getItem("token")
  const navigate = useNavigate()
  const { login, reg } = user
  const handleLogout = () => {

    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="App">
      <nav className='header'>
        {!token ? <> <div className='tab' onClick={() => navigate("login")}>Login</div>
          <div className='tab' onClick={() => navigate('/registration')}>Register</div></> :
          <div className='tab' onClick={() => handleLogout()}>Logout</div>}
      </nav>

      <div className='main-wrapper'>
        <div className='main'>
          <Routes>
            <Route path={"/"} element={<>
              {token ? <Navigate to={"/welcome"} /> :
                <div>
                  {!reg && <div className='reg'>
                    <Register />
                  </div>}
                  {reg && <div className='log'>
                    <Login />
                  </div>}
                </div>}
            </>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </div>
      </div>
      <div className='footer'>
        This is Footer
      </div>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(App);
