import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import NavBar from "./NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={   <Home/>     } />
        <Route path="/create" element={ <Create/>   } />
        <Route path="/update" element={ <Update/>   } />
        <Route path="*" element={   <Home/>     } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
