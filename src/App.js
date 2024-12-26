import './styles/main.css'
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import List from './pages/List';
import Info from './pages/Info';
import { MoviesListFetch } from './components/Fetch';

const App = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await MoviesListFetch();
      if (fetchedData.status === 'error') {
        setError(fetchedData)
        setData(null);
      } else {
        setError(null)
        setData(fetchedData);
        console.log(fetchedData)
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<List data={data} error={error} />} />
            <Route path=":movie" element={<Info data={data} error={error} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;