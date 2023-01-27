import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';


export function App() {

    const [data, setData] = React.useState(null);

    useEffect(()=>{
      fetch("/api")
      .then((res)=>res.json())
      .then((data)=> setData(data.message));
    }, []);

    return (
      <div>
        
      </div>
    )   

  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>{!data ? "Loading..." : data}</p>
  //     </header>
  //   </div>
  // );

export default App;
