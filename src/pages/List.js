import '../styles/List.css'
import { Link } from "react-router-dom";
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import AddMovie from '../components/Add/AddMovie';
import AddFilmSeries from '../components/Add/AddFilmSeries';
import AddSeries from '../components/Add/AddSeries';

const List = ({ data, error }) => {
  const [movies, setMovies] = useState(data?.data)
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filterMenuVisible, setFilterMenuVisible] = useState(false)
  const [filters, setFilters] = useState([null, null])
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [addMovie, setAddMovie] = useState(null)
  useEffect(() => {
    const handleClose = () => {
      if (window.document.querySelector("#menu")) {
        console.log("close")
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
    // console.log(id)
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setSelectedCardId(id); // Ustawienie ID klikniętej karty
    setMenuVisible(true);
  };
  var addMovieScreen
  switch (addMovie) {
    case 'movie':
      addMovieScreen = <AddMovie setAddMovie={setAddMovie} />
      break;
    case 'film-series':
      addMovieScreen = <AddFilmSeries setAddMovie={setAddMovie} />
      break;
    case 'series':
      addMovieScreen = <AddSeries setAddMovie={setAddMovie} />
      break;
    default:
      addMovieScreen = null;
  }
  function searchMovies(e) {
    const search = e.target.value.toLowerCase();
    const searchResult = data.data.filter(movie => movie.title.toLowerCase().includes(search));
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
  function filterMovies(filter) {
    console.log(filter)
    console.log(data.data)
    console.log(movies)
    var filterResult
    if (filter === 'clear-sort') {
      filterResult = movies.sort((a, b) => a.id.localeCompare(b.id))
    } else if (filter === 'all') {
      filterResult = data.data
    } else if (filter === 'movies') {
      filterResult = data.data.filter(movie => movie.type === 'movie')
    } else if (filter === 'film-series') {
      filterResult = data.data.filter(movie => movie.type === 'film-series')
    } else if (filter === 'series') {
      filterResult = data.data.filter(movie => movie.type === 'series')
    } else if (filter === 'a-z') {
      data.data.sort((a, b) => a.title.localeCompare(b.title))
      filterResult = movies.sort((a, b) => a.title.localeCompare(b.title))
    } else if (filter === 'z-a') {
      data.data.sort((a, b) => b.title.localeCompare(a.title))
      filterResult = movies.sort((a, b) => b.title.localeCompare(a.title))
    }
    console.log(filterResult)
    setMovies(filterResult);
  }
  function changeFilters(index, value, filter) {
    setFilters(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = <span title='Usuń ten filtr' onClick={() => {
        filterMovies(filter); setFilters(prevArray => {
          const newArray = [...prevArray];
          newArray[index] = null
          return newArray
        })}}>{value}</span>
      return newArray
    })
  }
  return (
    <>
      {addMovieScreen}
      <div className='bar'>
        <div className='bar-box search-box' onClick={() => window.document.querySelector('.search-text').focus()}>
          <input className="search-text" type="text" onChange={(e) => searchMovies(e)} placeholder="Wyszukaj film" />
          <span className="search-btn"></span>
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
        <div className='bar-box filter-box' title='Filtruj' onClick={() => setFilterMenuVisible(!filterMenuVisible)}>
          <div className="filter-icon"></div>
          <div className="filter-text">{filters.map(filter => filter)}</div>
          {filterMenuVisible ? <div className='filter-menu'>
            <div className='filter-option' onClick={() => { filterMovies('a-z'); changeFilters(1, 'Od A-Z', 'clear-sort') }}>Od A-Z</div>
            <div className='filter-option' onClick={() => { filterMovies('z-a'); changeFilters(1, 'Od Z-A', 'clear-sort') }}>Od Z-A</div>
            <div className='filter-option' onClick={() => { filterMovies('movies'); changeFilters(0, 'Tylko filmy', 'all') }}>Filmy</div>
            <div className='filter-option' onClick={() => { filterMovies('film-series'); changeFilters(0, 'Tylko serie filmów', 'all') }}>Serie filmów</div>
            <div className='filter-option' onClick={() => { filterMovies('series'); changeFilters(0, 'Tylko seriale', 'all') }}>Seriale</div>
          </div> : null}
        </div>
      </div>
      <div className='movies'>
        {error ? <div className='error'>{error.message}</div> : null}
        {movies ? movies.map((movie) => (
          <Link className='card-link' to={`/${movie.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '')}`} key={movie.id}>
            <Card key={movie.id} id={movie.id} img={movie.imgs.split('\n')[0]} title={movie.title} year={movie.year} description={movie.type === 'series' ? episodesList(movie) : movie.description} handleContextMenu={handleContextMenu} />
          </Link>
        )) : null}
        {menuVisible ? <div id='menu' className="menu" onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute", top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`, background: "wheat", padding: "10px", border: "1px solid", color: 'black',
          }}>Menu</div> : null}
      </div>
    </>
  );
}

export default List;