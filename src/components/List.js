import { useEffect, useRef, useState } from 'react';
import SetTitle from './SetTitle';
// import Popup from './Popup';
import Bar from './Bar';
import FilmClapboard from './FilmClapboard';
import MovieForm from './Forms/MovieForm';
import FilmSeriesForm from './Forms/FilmSeriesForm';
import SeriesForm from './Forms/SeriesFrom';
import ContextMenu from './ContextMenu';
import ScrollToTopButton from './ScrollToTopButton';
import { Link } from "react-router-dom";
import Card from './Card';
import { PopupManager, showPopup } from './Popup/Popup';
import { showPasswordPrompt } from './PasswordPrompt/PasswordPrompt';
import { useDevTools } from './DevToolsContext';

const List = ({ data, setData, error, setFavoriteData, title, fetchAdd, fetchEdit, fetchDelete, fetchMultipleDelete, fetchAddFavorite,
  isFavoriteList = false, setRefreshData
}) => {
  const [movies, setMovies] = useState(data?.data);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [addMovie, setAddMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [ids, setIds] = useState([]);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);

  // DevTools
  const { setDevTools } = useDevTools();
  useEffect(() => {
    setDevTools((prev) => {
      return {
        ...prev,
        movies: movies,
        setMovies: setMovies,
      };
    })
  }, [movies]);

  console.log(data);
  SetTitle(`${title}${movies ? ` (${movies.length})` : ""}`, movies);

  useEffect(() => {
    if (data) {
      setMovies(data.data);
    }
  }, [data]);
  useEffect(() => {
    const handleClose = () => {
      if (window.document.querySelector("#menu")) {
        setMenuVisible(false);
      }
    };
    const handleGlobalContexMenuClose = (e) => {
      if (!e.target.closest('.card')) {
        setMenuVisible(false);
      }
    };
    window.addEventListener("click", handleClose);
    window.addEventListener("visibilitychange", handleClose);
    window.addEventListener("contextmenu", handleGlobalContexMenuClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("visibilitychange", handleClose);
      window.removeEventListener("contextmenu", handleGlobalContexMenuClose);
    };
  }, []);

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setSelectedCardId(id);
    setMenuVisible(true);
  };

  const getAddMovieScreen = () => {
    if (!addMovie) return null;

    var tempAddMovie = addMovie;
    if (!tempAddMovie.type) tempAddMovie = { type: addMovie };

    switch (tempAddMovie.type) {
      case 'movie':
        return <MovieForm setAddMovie={setAddMovie} initialData={addMovie.type ? addMovie : null} />;
      case 'film-series':
        return <FilmSeriesForm setAddMovie={setAddMovie} initialData={addMovie.type ? addMovie : null} />;
      case 'series':
        return <SeriesForm setAddMovie={setAddMovie} initialData={addMovie.type ? addMovie : null} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (addMovie && addMovie.type) {
      showPopup({
        message: <div className='addPopupContainer'><FilmClapboard style={{ scale: 0.07, left: '-220px' }} />
          <span style={{ marginLeft: '45px' }}>Dodawanie...</span></div>, 
          duration: 800000, border: true, replace: true
      });
      fetchAdd(addMovie).then((response) => {
        if (response.status === 'success') {
          showPopup({ message: response.message, type: 'success', duration: 8000, border: true, icon: true, replace: true });
          setRefreshData((prev) => !prev);
          setAddMovie(null);
        } else {
          showPopup({ message: response.message, type: 'error', duration: 8000, border: true, icon: true, replace: true });
        }
      });
    }
  }, [addMovie]);

  const getEditMovieScreen = () => {
    if (!editMovie) return null;
    console.log('ID: ' + selectedCardId);
    var tempAddMovie = editMovie;
    if (!tempAddMovie.type) tempAddMovie = { type: editMovie };

    switch (tempAddMovie.type) {
      case 'movie':
        return <MovieForm setAddMovie={setEditMovie} isEdit={true} initialData={movies.filter(movie => movie.id === selectedCardId)[0]} />;
      case 'film-series':
        return <FilmSeriesForm setAddMovie={setEditMovie} isEdit={true} initialData={movies.filter(movie => movie.id === selectedCardId)[0]} />;
      case 'series':
        return <SeriesForm setAddMovie={setEditMovie} isEdit={true} initialData={movies.filter(movie => movie.id === selectedCardId)[0]} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (editMovie && editMovie.type) {
      showPopup({
        message: <div className='addPopupContainer'><FilmClapboard style={{ scale: 0.07, left: '-220px' }} />
          <span style={{ marginLeft: '45px' }}>Zapisywanie zmian...</span></div>, duration: 8000, border: true
      });
      editMovie.id = selectedCardId;
      fetchEdit(editMovie).then((response) => {
        if (response.status === 'success') {
          showPopup({ message: response.message, type: 'success', duration: 8000, border: true, icon: true, replace: true });
          setRefreshData((prev) => !prev);
          setEditMovie(null);
        } else {
          showPopup({ message: response.message, type: 'error', duration: 8000, border: true, icon: true, replace: true });
        }
      });
    }
  }, [editMovie]);

  const episodesList = (movie) => {
    if (movie.type === 'series' && typeof movie.episodes === 'string') movie.episodes = JSON.parse(movie.episodes);
    return (
      <ul style={{ margin: 0, paddingLeft: '17px' }}>
        {movie.episodes[0].map((episode) => <li key={episode}>{episode}</li>)}
      </ul>
    );
  };

  const deleteMovie = async (id, password) => {
    await fetchDelete(password || await showPasswordPrompt("Podaj hasło"), id, movies.find((item) => item.id === id).title).then((fetchData) => {
      showPopup({ message: fetchData.message, type: 'error', duration: 8000, border: true, icon: true });
      if (fetchData.status === 'success') {
        setRefreshData((prev) => !prev);
      }
    }).catch((error) => {
      showPopup({ message: error.message, type: 'error', duration: 8000, border: true, icon: true });
      console.log(error);
    });
  };
  const deleteMultipleMovies = async () => {
    if (ids.length === 0) return;
    await fetchMultipleDelete(await showPasswordPrompt("Podaj hasło"), ids).then((fetchData) => {
      showPopup({ message: fetchData.message, type: 'error', duration: 8000, border: true, icon: true });
      if (fetchData.status === 'success') {
        setIsMultipleDelete(false);
        setIds([]);
        setRefreshData((prev) => !prev);
      }
    }).catch((error) => {
      showPopup({ message: error.message, type: 'error', duration: 8000, border: true, icon: true });
      console.log(error);
    });
  };
  const handleMultipleDelete = (id) => {
    console.log(id, ids)
    setIsMultipleDelete(true);

    setIds((prevIds) => {
      if (prevIds.includes(id)) {
        document.querySelector(`[data-id="${id}"]`).style.border = "none";
        const newIds = prevIds.filter((prevId) => prevId !== id);
        if (newIds.length === 0) {
          setIsMultipleDelete(false);
        }
        return newIds;
      } else {
        document.querySelector(`[data-id="${id}"]`).style.border = "2px solid red";
        return [...prevIds, id];
      }
    });
  };

  const addFavorite = async (id) => {
    var originalMovie  = movies.find((item) => item.id === id);
    if (!originalMovie) {
      showPopup({ message: "Nie znaleziono filmu", type: 'error', duration: 8000, border: true, icon: true });
      return;
    }
    const movie = structuredClone(originalMovie)
    if (movie.movies && typeof movie.movies === "object") movie.movies = JSON.stringify(movie.movies);
    if (movie.episodes && typeof movie.episodes === "object") movie.episodes = JSON.stringify(movie.episodes);
    if (movie.imgs && typeof movie.imgs === "object") movie.imgs = JSON.stringify(movie.imgs);
    movie.password = await showPasswordPrompt("Podaj hasło");
    fetchAddFavorite(movie).then((data) => {
      if (data.status === 'success') {
        setFavoriteData((prevData) => ({
          ...prevData,
          data: [...prevData.data, movie],
        }));
        deleteMovie(selectedCardId, movie.password).then(() => {
          showPopup({ message: data.message, type: 'success', duration: 8000, border: true, icon: true, replace: true });
        });
      } else {
        showPopup({ message: data.message, type: 'error', duration: 8000, border: true, icon: true, replace: true });
      }
      console.log(data.message);
    }).catch((error) => {
      showPopup({ message: error.message, type: 'error', duration: 8000, border: true, icon: true, replace: true });
      console.log(error);
    });
  };

  return (
    <>
      {getAddMovieScreen()}
      {getEditMovieScreen()}
      {<PopupManager />}
      <ScrollToTopButton />
      {isMultipleDelete && <div className='multiple-delete-icon' title='Usuń zaznaczone' onClick={deleteMultipleMovies}></div>}
      <Bar setMovies={setMovies} data={data} setAddMovie={setAddMovie} isFavoriteList={isFavoriteList} />
      <div className='movies'>
        {error ? <div className='error'>{error.message}</div> : null}
        {movies ? movies.map((movie) => (
          <Link className='card-link' to={`/${isFavoriteList ? 'favorite/' : ''}${movie.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '')}-${movie.id}`} key={movie.id}>
            <Card key={movie.id} id={movie.id} img={movie.imgs[0].img} title={movie.title} year={movie.year || `Liczba filmów z serii: ${typeof movie.movies === 'string' ? JSON.parse(movie.movies).length : movie.movies.length}`} description={movie.type === 'series' ? episodesList(movie) : movie.description} genre={movie.genre} handleContextMenu={handleContextMenu} glowingColor={movie.glowing_color} />
          </Link>
        )) : null}
        {menuVisible && <ContextMenu menuPosition={menuPosition} setEditMovie={setEditMovie} movies={movies}
          selectedCardId={selectedCardId} setMenuVisible={setMenuVisible} deleteMovie={deleteMovie}
          deleteMultipleMovies={deleteMultipleMovies} isFavoriteList={isFavoriteList} addFavorite={addFavorite}
          handleMultipleDelete={handleMultipleDelete} />}
      </div>
    </>
  );
};

export default List;