import './styles/main.css'
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import List from './pages/List';
import FavoriteList from './pages/FavoriteList';
import Info from './pages/Info';
import { MoviesListFetch, FavoriteMoviesListFetch } from './components/Fetch';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [favoriteData, setFavoriteData] = useState(null);
  const [favoriteError, setFavoriteError] = useState(null);
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

      const fetchedFavoriteData = await FavoriteMoviesListFetch();
      if (fetchedFavoriteData.status === 'error') {
        setFavoriteError(fetchedFavoriteData)
        setFavoriteData(null);
      } else {
        setFavoriteError(null)
        setFavoriteData(fetchedFavoriteData);
        console.log(fetchedFavoriteData)
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <BrowserRouter basename="/watchlist">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<List data={data} setData={setData} error={error} setFavoriteData={setFavoriteData} />} />
            <Route path="/favorite" element={<FavoriteList data={favoriteData} setData={setFavoriteData} error={favoriteError} />} />
            <Route path="/:movie" element={<Info data={data} error={error} />} />
            <Route path="favorite/:movie" element={<Info data={favoriteData} error={favoriteError} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;