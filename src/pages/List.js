import '../styles/List.css'
import { Link } from "react-router-dom";
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import AddMovie from '../components/AddMovie';
import AddFilmSeries from '../components/AddFilmSeries';
import AddSeries from '../components/AddSeries';

import testData from '../testData.json'

const List = ({ data, error }) => {
  const [movies, setMovies] = useState(data?.data)
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
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
      console.log(movie.episodes)
    return (
      <ul style={{margin: 0, paddingLeft: '17px'}}>
        {
          movie.episodes[0].map((episode) => <li>{episode}</li>)
        }
      </ul>
    )
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
      </div>
      <div className='movies'>
        {error ? <div className='error'>{error.message}</div> : null}
        {/* <Card id={1} img='https://fwcdn.pl/fpo/37/58/693758/7839647_2.10.webp' title="avengers: wojna bez granic" year='2018' description='Potężny Thanos zbiera Kamienie Nieskończoności w celu narzucenia swojej woli wszystkim istnieniom we wszechświecie. Tylko drużyna superbohaterów znanych jako Avengers może go powstrzymać.' handleContextMenu={handleContextMenu} />
    <Card id={2} img='https://fwcdn.pl/fpo/05/42/790542/7881430_2.10.webp' title="Avengers: koniec gry" year='2019' description='Po wymazaniu połowy życia we Wszechświecie przez Thanosa Avengersi starają się zrobić wszystko, co konieczne, aby pokonać szalonego tytana.' handleContextMenu={handleContextMenu} />
    <Link to='/3'><Card id={3} img='https://fwcdn.pl/fpo/02/61/850261/7985244_2.10.webp' title="spider-man: bez drogi do domu" year='2021' description="Kiedy cały świat dowiaduje się, że pod maską Spider Mana skrywa się Peter Parker, superbohater decyduje się zwrócić o pomoc do Doktora Strange'a." handleContextMenu={handleContextMenu} /></Link>
    <Card id={4} img='https://fwcdn.pl/fpo/09/86/120986/8007829_1.10.webp' title="czarna wdowa" year='2021' description='Natasha Romanoff / Czarna Wdowa, po wydarzeniach z filmu Kapitan Ameryka: Wojna bohaterów zmuszona jest do walki ze złoczyńcą nazywanym Taskmaster.' handleContextMenu={handleContextMenu} />
    <Card id={5} img='https://fwcdn.pl/fpo/85/47/698547/7972234_2.10.webp' title="Shang-Chi i legenda dziesięciu pierścieni" year='2021' description='Simu Liu wciela się w Shang-Chi, który musi zmierzyć się z przeszłością po tym, jak zostaje wciągnięty w sieć tajemniczej organizacji Dziesięciu Pierścieni.' handleContextMenu={handleContextMenu} />
    <Card id={6} img='https://fwcdn.pl/fpo/35/38/843538/8030496_2.10.webp' title="Moon Knight" year='2022' description='Bóg księżyca Khonshu ratuje byłego agenta CIA Marca Spectora, który staje się Księżycowym Rycerzem.' handleContextMenu={handleContextMenu} />
    <Card id={7} img='https://fwcdn.pl/fpo/64/40/836440/8008985_1.10.webp' title="Doctor Strange w multiwersum obłędu" year='2022' description='Po wydarzeniach z "Avengers: Koniec gry" dr Stephen Strange kontynuuje walkę ze złem. Tym razem stawi czoło Scarlet Witch.' handleContextMenu={handleContextMenu} />
    <Card id={8} img='https://fwcdn.pl/fpo/85/13/868513/8133073.10.webp' title="Deadpool & Wolverine" year='2024' description='Dochodzacy do siebie Wolverine spotyka pyskatego Deadpoola, z którym łączy siły, by stawić czoła wspólnemu wrogowi.' handleContextMenu={handleContextMenu} /> */}
        {movies ? movies.map((movie) => (
          <Link className='card-link' to={`/${movie.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '')}`} key={movie.id}>
            <Card key={movie.id} id={movie.id} img={movie.imgs.split('\n')[0]} title={movie.title} year={movie.year} description={movie.type === 'series' ? episodesList(movie) : movie.description} handleContextMenu={handleContextMenu} />
          </Link>
        )) : null}
        {menuVisible ? <div id='menu' className="menu" onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute", top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`, background: "wheat", padding: "10px", border: "1px solid", color: 'black',
          }}>Menu
        </div> : null}
      </div>
    </>
  );
}

export default List;