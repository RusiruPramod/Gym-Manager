import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/members" element={ <Members/> } /> 
        
        <Route path="/login" element={ <Login/> } />
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
