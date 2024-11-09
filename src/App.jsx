import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './assets/componendes/Login';
import Register from './assets/componendes/Register';
import Notfound from './assets/componendes/Notfound';
import Food from './assets/componendes/Food';
import Blog from './assets/componendes/Blog';
import Home from './assets/componendes/Home';
import Post from './assets/componendes/Post'; // Import Post component
import Allblogs from './assets/componendes/Allblogs'; // Import Allblogs component
import Dash from './assets/componendes/Dashbord'; // Import Dash component
import { useState } from 'react';
import { ContextUser } from './assets/contexts/Contextuser';
import Protect from './assets/componendes/Protectedroute';
import ViewDeatails from './assets/componendes/ViewDeatails';
import Singleblog from './assets/componendes/Singleblog';

function App() {
  const [loginuser, setloginuser] = useState(JSON.parse(localStorage.getItem("swamy-user")));

  return (
    <>
      <ContextUser.Provider value={{ loginuser, setloginuser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Logo />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Logo />} />
            <Route path='*' element={<Notfound />} />
            <Route path='/Home' element={<Protect Component={Home} />} />
            <Route path='/details' element={<Protect Component={ViewDeatails} />} />
            <Route path='/Food' element={<Protect Component={Food} />} />
            <Route path='/Blog' element={<Protect Component={Blog} />} />
            <Route path='/post' element={<Protect Component={Post}/>} />
            <Route path='/allblogs' element={<Protect Component={Allblogs}/>}  />
            <Route path='/dashboard' element={<Protect Component={Dash}/>}  />
            <Route path='/singleblog/:id' element={<Protect Component={Singleblog}/>}/>
          </Routes>
        </BrowserRouter>
      </ContextUser.Provider>
    </>
  );
}

export default App;
