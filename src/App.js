// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Anggota from './anggota';
import Register from './Register';
import Home from './Home';
import anggota from './anggota';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
    <Route path='/' element={<Register/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/anggota' element={<Anggota/>}/>
    <Route path='/home' element={<Home/>}/>

        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
