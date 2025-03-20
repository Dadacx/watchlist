import { useEffect, useState } from 'react';
import SetTitle from './SetTitle';
import Popup from './Popup';
import FilmClapboard from './FilmClapboard';
import delete_icon from '../images/delete.svg';
import edit_icon from '../images/edit.svg';
import favorite_icon from '../images/favorite.svg';
import MovieForm from './Forms/MovieForm';
import FilmSeriesForm from './Forms/FilmSeriesForm';
import SeriesForm from './Forms/SeriesFrom';
import { Link } from "react-router-dom";
import Card from './Card';

const List = ({ 
  data, 
  setData, 
  error, 
  setFavoriteData, 
  title, 
  fetchAdd, 
  fetchEdit, 
  fetchDelete, 
  fetchAddFavorite,
  isFavoriteList = false,
  setRefreshData
}) => {
  const [movies, setMovies] = useState(data?.data);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [filters, setFilters] = useState({
    categories: [], // ['movies', 'series', 'film-series']
    genres: [], // ['akcja', 'komedia', 'fantasy', 'horror', 'sci-fi', 'thriller', itd.]
    sort: null, // 'a-z', 'z-a'
  });
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [addMovie, setAddMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [popup, setPopup] = useState(null);

  console.log(data);
  SetTitle(`${title}${data && data.data ? ` (${data.data.length})` : ""}`, data);

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
    window.addEventListener("click", handleFiltersClose);
    window.addEventListener("visibilitychange", handleClose);
    window.addEventListener("contextmenu", handleGlobalContexMenuClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("click", handleFiltersClose);
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

  const handleFiltersClose = (e) => {
    if (!e.target.closest('.filter-box')) {
      setFilterMenuVisible(false);
    }
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
      setPopup(<Popup key={Date.now()} content={<><FilmClapboard style={{ scale: 0.07, top: '-215px', left: '-220px' }} />
        <p style={{ marginLeft: '45px' }}>Dodawanie...</p></>} />);
      fetchAdd(addMovie).then((response) => {
        if (response.status === 'success') {
          setPopup(<Popup key={Date.now()} content={<p>{response.message}</p>} color='success' />);
          setRefreshData((prev) => !prev);
          setAddMovie(null);
        } else {
          setPopup(<Popup key={Date.now()} content={<p>{response.message}</p>} color='error' />);
        }
      });
    }
  }, [addMovie]);

  const getEditMovieScreen = () => {
    if (!editMovie) return null;
    console.log(selectedCardId);
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
      setPopup(<Popup key={Date.now()} content={<><FilmClapboard style={{ scale: 0.07, top: '-215px', left: '-220px' }} />
        <p style={{ marginLeft: '45px' }}>Zapisywanie zmian...</p></>} />);
      editMovie.id = selectedCardId;
      fetchEdit(editMovie).then((response) => {
        if (response.status === 'success') {
          setPopup(<Popup key={Date.now()} content={<p>{response.message}</p>} color='success' />);
          setRefreshData((prev) => !prev);
          setEditMovie(null);
        } else {
          setPopup(<Popup key={Date.now()} content={<p>{response.message}</p>} color='error' />);
        }
      });
    }
  }, [editMovie]);

  const searchMovies = (e) => {
    const search = e.target.value.toLowerCase();
    const searchResult = applyFiltersAndSort().filter(movie => movie.title.toLowerCase().includes(search));
    setMovies(searchResult);
  };

  const episodesList = (movie) => {
    if (movie.type === 'series' && typeof movie.episodes === 'string') movie.episodes = JSON.parse(movie.episodes);
    return (
      <ul style={{ margin: 0, paddingLeft: '17px' }}>
        {movie.episodes[0].map((episode) => <li key={episode}>{episode}</li>)}
      </ul>
    );
  };

  const applyFiltersAndSort = () => {
    let filteredMovies = [...data.data];
    if (filters.categories.length > 0) {
      filteredMovies = filteredMovies.filter(movie => filters.categories.includes(movie.type));
    }
    if (filters.genres.length > 0) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre && movie.genre.split(', ').some(genre => filters.genres.includes(genre))
      );
    }
    if (filters.sort === 'a-z') {
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === 'z-a') {
      filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
    }
    setMovies(filteredMovies);
    return filteredMovies;
  };

  useEffect(() => {
    if (data) {
      applyFiltersAndSort();
    }
  }, [filters]);

  const toggleCategoryFilter = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: prevFilters.categories.includes(category)
        ? prevFilters.categories.filter(cat => cat !== category)
        : [...prevFilters.categories, category],
    }));
  };

  const toggleGenreFilter = (genre) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genres: prevFilters.genres.includes(genre)
        ? prevFilters.genres.filter(gen => gen !== genre)
        : [...prevFilters.genres, genre],
    }));
  };

  const toggleSortFilter = (sortOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: prevFilters.sort === sortOption ? null : sortOption,
    }));
  };

  const deleteMovie = async (id, password) => {
    await fetchDelete(password || window.prompt("Podaj hasło"), id, movies.find((item) => item.id === id).title).then((fetchData) => {
      setPopup(<Popup key={Date.now()} content={<p>{fetchData.message}</p>} color='error' />);
      if (fetchData.status === 'success') {
        setRefreshData((prev) => !prev);
      }
    }).catch((error) => {
      setPopup(<Popup key={Date.now()} content={<p>{error.message}</p>} color='error' />);
      console.log(error);
    });
  };

  const addFavorite = (id) => {
    var movie = movies.find((item) => item.id === id);
    if (movie.movies && typeof movie.movies === "object") movie.movies = JSON.stringify(movie.movies);
    if (movie.episodes && typeof movie.episodes === "object") movie.episodes = JSON.stringify(movie.episodes);
    movie.password = window.prompt("Podaj hasło");
    fetchAddFavorite(movie).then((data) => {
      if (data.status === 'success') {
        setFavoriteData((prevData) => ({
          ...prevData,
          data: [...prevData.data, movie],
        }));
        deleteMovie(selectedCardId, movie.password).then(() => {
          setPopup(<Popup key={Date.now()} content={<p>{data.message}</p>} color='success' />);
        });
      } else {
        setPopup(<Popup key={Date.now()} content={<p>{data.message}</p>} color='error' />);
      }
      console.log(data.message);
    }).catch((error) => {
      setPopup(<Popup key={Date.now()} content={<p>{error.message}</p>} color='error' />);
      console.log(error);
    });
  };

  return (
    <>
      {getAddMovieScreen()}
      {getEditMovieScreen()}
      {popup}
      <div className='bar'>
        <div className='search-container'>
          <div className='bar-box search-box' onClick={() => window.document.querySelector('.search-text').focus()}>
            <input className="search-text" type="text" onChange={(e) => searchMovies(e)} placeholder="Wyszukaj film" />
            <span className="search-btn"></span>
          </div>
        </div>
        <div className='bar-box' title='Dodaj film' onClick={() => setAddMovie('movie')}>
          <div className="add-movie-icon"></div>
        </div>
        <div className='bar-box' title='Dodaj serie filmów' onClick={() => setAddMovie('film-series')}>
          <div className="add-film-series-icon"></div>
        </div>
        <div className='bar-box' title='Dodaj serial' onClick={() => setAddMovie('series')}>
          <div className="add-series-icon"></div>
        </div>
        <div className='search-container'>
          <div className='bar-box filter-box' title='Filtruj' onClick={() => setFilterMenuVisible(!filterMenuVisible)}>
            <div className="filter-icon"></div>
            <div className="filter-text">
              {filters.categories.map(category => (<span key={category} className="filter-label" onClick={() => toggleCategoryFilter(category)}>
                {category.replace('movie', 'Filmy').replace('film-series', 'Serie filmów').replace('series', 'Seriale')}{' '}
              </span>))}
              {filters.genres.map(genre => (<span key={genre} className="filter-label" onClick={() => toggleGenreFilter(genre)}>
                {genre}{' '}
              </span>))}
              {filters.sort && (<span className="filter-label" onClick={() => toggleSortFilter(filters.sort)}>{filters.sort.toUpperCase()}{' '}</span>)}
            </div>
            {filterMenuVisible && (
              <div className='filter-menu'>
                <div className='filter-option-title'>- Sortowanie -</div>
                <div className='filter-option' onClick={() => toggleSortFilter('a-z')}>Od A-Z</div>
                <div className='filter-option' onClick={() => toggleSortFilter('z-a')}>Od Z-A</div>
                <div className='filter-option-title'>- Kategoria -</div>
                <div className='filter-option' onClick={() => toggleCategoryFilter('movie')}>Filmy</div>
                <div className='filter-option' onClick={() => toggleCategoryFilter('film-series')}>Serie filmów</div>
                <div className='filter-option' onClick={() => toggleCategoryFilter('series')}>Seriale</div>
                <div className='filter-option-title'>- Gatunek -</div>
                {data && Array.from(new Set(data.data.flatMap(item => item.genre ? item.genre.split(', ') : [])))
                  .map((genre, index) => (
                    <div key={index} className='filter-option' onClick={() => toggleGenreFilter(genre)}>
                      {genre}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className='bar-box' title={isFavoriteList ? 'Zamknij ulubione' : 'Ulubione'}>
          <Link to={isFavoriteList ? '/' : '/favorite'} className={isFavoriteList ? "favorite-fill-icon" : "favorite-icon"}></Link>
        </div>
      </div>
      <div className='movies'>
        {error ? <div className='error'>{error.message}</div> : null}
        {movies ? movies.map((movie) => (
          <Link className='card-link' to={`/${isFavoriteList ? 'favorite/' : ''}${movie.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '')}`} key={movie.id}>
            <Card key={movie.id} id={movie.id} img={movie.imgs.split('\n')[0]} title={movie.title} year={movie.year || `Liczba filmów z serii: ${typeof movie.movies === 'string' ? JSON.parse(movie.movies).length : movie.movies.length}`} description={movie.type === 'series' ? episodesList(movie) : movie.description} genre={movie.genre} handleContextMenu={handleContextMenu} />
          </Link>
        )) : null}
        {menuVisible && <div id='menu' className="menu" onClick={(e) => e.stopPropagation()}
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}>
          <img src={edit_icon} alt='edit_icon' className='menu-img' width={25} height={25}
            onClick={() => { setEditMovie(movies.filter(movie => movie.id === selectedCardId)[0].type); setMenuVisible(false) }} />
          <img src={delete_icon} alt='delete_icon' className='menu-img' width={25} height={25}
            onClick={() => { deleteMovie(selectedCardId); setMenuVisible(false) }} />
          {!isFavoriteList && (
            <img src={favorite_icon} alt='favorite_icon' className='menu-img' width={25} height={25}
              onClick={() => { addFavorite(selectedCardId); setMenuVisible(false) }} />
          )}
        </div>}
      </div>
    </>
  );
};

export default List;