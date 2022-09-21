import {FC} from 'react';
import { Routes, Route} from "react-router-dom"
// import {BrowserRouter as Route} from "react-router-dom"
import './App.css';
import {Create} from "./Components/Create"
import {Edit} from "./Components/Edit"
 
const App:FC=()=> {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Create/>}></Route>
      <Route path='/edit/:id' element={<Edit/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
