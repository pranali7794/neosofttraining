import './App.css';
import Navbar from './Navbar';
import Signup from './Signup'
import Login from './Login'
import {useState} from 'react';
import Home from "./Home";
import CakeDetails from "./CakeDetails";
import Search from "./Search";

function App() {
var [login,setLogin]=useState(false);
var [user, setUser] = useState();

function logindone(data) {
  setUser(data)
  setLogin(true)
}

  return (
    <div>
      <Navbar user={user} islogin={login} setlogin={setLogin}/>
      
      <Login islogin={login} setlogin={setLogin} informlogin={logindone} />
      <Search />
      <Signup />
      <Home />
      
     <CakeDetails />

    </div>
  );
}

export default App;