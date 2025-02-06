import '../styles/List.css'
import { Link } from "react-router-dom";
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import { DeleteFetch, AddFetch, EditFetch, AddFavoriteFetch } from '../components/Fetch';
import SetTitle from '../components/SetTitle';
import MovieForm from '../components/Forms/MovieForm';
import FilmSeriesForm from '../components/Forms/FilmSeriesForm';
import SeriesForm from '../components/Forms/SeriesFrom';
import delete_icon from '../images/delete.svg';
import edit_icon from '../images/edit.svg';
import favorite_icon from '../images/favorite.svg';

const List = ({ data, error, setFavoriteData }) => {
  const [movies, setMovies] = useState(data?.data)
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [filters, setFilters] = useState({
    categories: [], // ['movies', 'series', 'film-series']
    sort: null, // 'a-z', 'z-a'
  });
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [addMovie, setAddMovie] = useState(null)
  const [editMovie, setEditMovie] = useState(null)
  SetTitle("");
  useEffect(() => {
    const handleClose = () => {
      if (window.document.querySelector("#menu")) {
        setMenuVisible(false)
      }
    }
    const handleGlobalContexMenuClose = (e) => {
      // Ukryj menu, gdy contextmenu otwiera się poza kartami
      if (!e.target.closest('.card')) {
        setMenuVisible(false);
      }
    }
    window.addEventListener("click", handleClose);
    window.addEventListener("visibilitychange", handleClose);
    window.addEventListener("contextmenu", handleGlobalContexMenuClose);
    return () => {
      window.removeEventListener("click", handleClose)
      window.removeEventListener("visibilitychange", handleClose)
      window.removeEventListener("contextmenu", handleGlobalContexMenuClose);
    }
  }, [])
  const handleContextMenu = (e, id) => {
    console.log(id)
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setSelectedCardId(id); // Ustawienie ID klikniętej karty
    setMenuVisible(true);
  };
  // Dodawanie
  var addMovieScreen
  switch (addMovie) {
    case 'movie':
      addMovieScreen = <MovieForm setAddMovie={setAddMovie} />
      break;
    case 'film-series':
      addMovieScreen = <FilmSeriesForm setAddMovie={setAddMovie} />
      break;
    case 'series':
      addMovieScreen = <SeriesForm setAddMovie={setAddMovie} />
      break;
    default:
      addMovieScreen = null;
  }
  useEffect(() => {
    if (addMovie && addMovie.type) {
      // console.log(addMovie)
      AddFetch(addMovie).then((response) => {
        window.alert(response.message);
        if (response.status === 'success') {
          setAddMovie(null);
        }
      });
    }
  }, [addMovie]);
  // Edytowanie
  var editMovieScreen
  switch (editMovie) {
    case 'movie':
      editMovieScreen = <MovieForm setAddMovie={setEditMovie} initialData={movies.filter(movie => movie.id === selectedCardId)[0]} />
      break;
    case 'film-series':
      editMovieScreen = <FilmSeriesForm setAddMovie={setEditMovie} initialData={movies.filter(movie => movie.id === selectedCardId)[0]} />
      break;
    case 'series':
      editMovieScreen = <SeriesForm setAddMovie={setEditMovie} initialData={movies.filter(movie => movie.id === selectedCardId)[0]} />
      break;
    default:
      editMovieScreen = null;
  }
  useEffect(() => {
    if (editMovie && editMovie.type) {
      // console.log(editMovie)
      editMovie.id = selectedCardId;
      EditFetch(editMovie).then((response) => {
        window.alert(response.message);
        if (response.status === 'success') {
          setAddMovie(null);
        }
      });
    }
  }, [editMovie]);
  function searchMovies(e) {
    const search = e.target.value.toLowerCase();
    const searchResult = applyFiltersAndSort().filter(movie => movie.title.toLowerCase().includes(search));
    setMovies(searchResult);
  }
  if (data && !movies) {
    setMovies(data.data)
  }
  function episodesList(movie) {
    if (movie.type === 'series' && typeof movie.episodes === 'string') movie.episodes = JSON.parse(movie.episodes)
    return (
      <ul style={{ margin: 0, paddingLeft: '17px' }}>
        {
          movie.episodes[0].map((episode) => <li>{episode}</li>)
        }
      </ul>
    )
  }
  const applyFiltersAndSort = () => {
    let filteredMovies = [...data.data];
    // Filtruj według kategorii (jeśli jakieś są zaznaczone)
    if (filters.categories.length > 0) {
      filteredMovies = filteredMovies.filter(movie => filters.categories.includes(movie.type));
    }
    // Sortuj
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
        ? prevFilters.categories.filter(cat => cat !== category) // Usuń kategorię, jeśli jest aktywna
        : [...prevFilters.categories, category], // Dodaj kategorię, jeśli jest nieaktywna
    }));
  };
  const toggleSortFilter = (sortOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: prevFilters.sort === sortOption ? null : sortOption, // Usuń sortowanie, jeśli jest aktywne; ustaw nowe, jeśli nieaktywne
    }));
  };
  function deleteMovie(id, password) {
    DeleteFetch(password || window.prompt("Podaj hasło"), id, movies.find((item) => item.id === id).title).then((data) => {
      if (data.status === 'success') {
        alert(data.message)
        setMovies(movies.filter(movie => movie.id !== id))
      }
    }).catch((error) => {
      alert(error.message)
      console.log(error)
    })
  }
  function addFavorite(id) {
    var movie = movies.find((item) => item.id === id)
    if (movie.movies && typeof movie.movies === "object") movie.movies = JSON.stringify(movie.movies)
    if (movie.episodes && typeof movie.episodes === "object") movie.episodes = JSON.stringify(movie.episodes)
    movie.password = window.prompt("Podaj hasło")
    AddFavoriteFetch(movie).then((data) => {
      if (data.status === 'success') {
        setFavoriteData((prevData) => ({
          ...prevData,
          data: [...prevData.data, movie],
        }))
        deleteMovie(selectedCardId, movie.password)
      }
      alert(data.message)
      console.log(data.message)
    }).catch((error) => {
      alert(error.message)
      console.log(error)
    })
  }
  return (
    <>
      {addMovieScreen}
      {editMovieScreen}
      <div className='bar'>
      <div className='bar-box' onClick={() => window.document.querySelector('.search-text').focus()}>
      <div className="add-movie-icon"></div>
          </div>
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
            {filters.sort && (<span className="filter-label" onClick={() => toggleSortFilter(filters.sort)}>{filters.sort.toUpperCase()}{' '}</span>)}
          </div>
          {filterMenuVisible && (
            <div className='filter-menu'>
              <div className='filter-option' onClick={() => toggleSortFilter('a-z')}>Od A-Z</div>
              <div className='filter-option' onClick={() => toggleSortFilter('z-a')}>Od Z-A</div>
              <div className='filter-option' onClick={() => toggleCategoryFilter('movie')}>Filmy</div>
              <div className='filter-option' onClick={() => toggleCategoryFilter('film-series')}>Serie filmów</div>
              <div className='filter-option' onClick={() => toggleCategoryFilter('series')}>Seriale</div>
            </div>
          )}
        </div>
        </div>
        <div className='bar-box' title='Ulubione'>
          <Link to='/favorite' className="favorite-icon"></Link>
        </div>
      </div>
      <div className='movies'>
        {error ? <div className='error'>{error.message}</div> : null}
        {movies ? movies.map((movie) => (
          <Link className='card-link' to={`/${movie.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '')}`} key={movie.id}>
            <Card key={movie.id} id={movie.id} img={movie.imgs.split('\n')[0]} title={movie.title} year={movie.year || `Liczba filmów z serii: ${typeof movie.movies === 'string' ? JSON.parse(movie.movies).length : movie.movies.length}`} description={movie.type === 'series' ? episodesList(movie) : movie.description} handleContextMenu={handleContextMenu} />
          </Link>
        )) : null}
        {menuVisible && <div id='menu' className="menu" onClick={(e) => e.stopPropagation()}
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}>
          <img src={edit_icon} alt='edit_icon' className='menu-img' width={25} height={25}
            onClick={() => { setEditMovie(movies.filter(movie => movie.id === selectedCardId)[0].type); setMenuVisible(false) }} />
          <img src={delete_icon} alt='delete_icon' className='menu-img' width={25} height={25}
            onClick={() => { deleteMovie(selectedCardId); setMenuVisible(false) }} />
          <img src={favorite_icon} alt='favorite_icon' className='menu-img' width={25} height={25}
            onClick={() => { addFavorite(selectedCardId); setMenuVisible(false) }} />
        </div>}
      </div>
    </>
  );
}

export default List;