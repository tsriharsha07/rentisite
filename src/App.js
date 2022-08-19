import './App.css';
import { useState, useEffect } from 'react';
import Body from './components/Body';
import Navbar from './components/Navbar';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    }, 2000);
  },[]);
  return (
    <div className="App">
      {
        loading?
            <div className='loader'>
              <ClipLoader size={150} color={'rgb(74, 19, 126)'} loading={loading}/>
            </div> 
          :
            <>
              <Navbar/>
              <Body/>
            </>
      }
    </div>
  );
}

export default App;
