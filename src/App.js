import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';

const App = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/item/get');
      const result = await response.json();
      console.log("my data is rendering", result);
      setData(result.data); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);
  useEffect(()=>{
    console.log("data",data);
  },[data]) ;

  return (
    <div className="App">
      <Dashboard data={data} setData={setData} /> 
    </div>
  );
}

export default App;
