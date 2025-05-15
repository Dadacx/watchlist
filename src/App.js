import './styles/main.css'
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MoviesList from './pages/MoviesList';
import FavoriteList from './pages/FavoriteList';
import Info from './pages/Info';
import { MoviesListFetch, FavoriteMoviesListFetch } from './components/Fetch';
// import DevTools from './components/DevTools';
import { useDevTools } from './components/DevToolsContext';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [favoriteData, setFavoriteData] = useState(null);
  const [favoriteError, setFavoriteError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    console.log('fetching data');
    
    const fetchData = async () => {
      try {
        const fetchedData = await MoviesListFetch();
        if (fetchedData.status === 'error') {
          setError(fetchedData);
          setData(null);
        } else {
          setError(null);
          fetchedData.data.map((item) => {
            item.imgs = item.imgs.startsWith("http") ? item.imgs : JSON.parse(item.imgs);
            return item;
          }
          );
          setData(fetchedData);
          console.log(fetchedData);
        }
  
        const fetchedFavoriteData = await FavoriteMoviesListFetch();
        if (fetchedFavoriteData.status === 'error') {
          setFavoriteError(fetchedFavoriteData);
          setFavoriteData(null);
        } else {
          setFavoriteError(null);
          fetchedFavoriteData.data.map((item) => {
            item.imgs = item.imgs.startsWith("http") ? item.imgs : JSON.parse(item.imgs);
            return item;
          }
          );
          setFavoriteData(fetchedFavoriteData);
          console.log(fetchedFavoriteData);
        }
      } catch (err) {
        console.error("Błąd w fetchData():", err);
        // Globalny fallback — np. jeśli fetch rzucił wyjątek
        setError({ status: 'error', message: `[ERROR: ${err.message}] Błąd podczas pobierania danych.` });
        setData(null);
        setFavoriteError({ status: 'error', message: `[ERROR: ${err.message}] Błąd ulubionych.` });
        setFavoriteData(null);
      }
    };
  
    fetchData();
  }, [refreshData]);

  // DevTools
  const { setDevTools } = useDevTools();
  useEffect(() => {
    // setDevTools({data:data, setData: setData, favoriteData: favoriteData, setFavoriteData: setFavoriteData, error: error, setError: setError, favoriteError: favoriteError, setFavoriteError: setFavoriteError});
    setDevTools((prev) => {
      return {
        ...prev,
        data: data,
        setData: setData,
        favoriteData: favoriteData,
        setFavoriteData: setFavoriteData,
        error: error,
        setError: setError,
        favoriteError: favoriteError,
        setFavoriteError: setFavoriteError,
      };
    })
  }, [data, favoriteData, error]);
  
  return (
    
    <div className="container">
      <BrowserRouter basename="/watchlist">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<MoviesList data={data} setData={setData} error={error} setFavoriteData={setFavoriteData} setRefreshData={setRefreshData} /> } />
            <Route path="/favorite" element={<FavoriteList data={favoriteData} setData={setFavoriteData} error={favoriteError} setRefreshData={setRefreshData} />} />
            <Route path="/:movie" element={<Info data={data} error={error} />} />
            <Route path="favorite/:movie" element={<Info data={favoriteData} error={favoriteError} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <DevTools data={data} setData={setData} favoriteData={favoriteData} setFavoriteData={setFavoriteData} error={error} setError={setError} /> */}
    </div>
  );
}

export default App;