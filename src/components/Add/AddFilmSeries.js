import '../../styles/Add.css'
import { useRef, useState } from 'react';
import AddFilmSeriesSingleMovie from './AddFilmSeriesSingleMovie';
import close from '../../images/close.svg';
import { AddFilmSeriesFetch } from '../Fetch';

const AddFilmSeries = ({ setAddMovie }) => {
  const [errors, setErrors] = useState({});
  const [inputMoviesCount, setInputMoviesCount] = useState(0);
  const title = useRef(null);
  const description = useRef(null);
  const moviesCount = useRef(null);
  const imgs = useRef(null);
  const movieRefs = useRef([]);
  const [movies, setMovies] = useState([]);

  const AddFilmSeries = () => {
    if (validateForm()) {
      const isMoviesValid = movieRefs.current.every((ref) => ref?.validateForm?.());
      if (isMoviesValid) {
        const moviesData = movieRefs.current.map((ref) => ref.getMovieData());
        setMovies(moviesData);
        console.log('Formularz poprawny');
        const movieSeries = {
          type: 'film-series',
          title: title.current.value,
          description: description.current.value,
          moviesCount: moviesCount.current.value,
          imgs: imgs.current.value,
          movies: JSON.stringify(moviesData),
          password: window.prompt("Podaj hasło")
        }
        console.log(movieSeries)
        // AddFilmSeriesFetch(movieSeries).then((response) => {
        //   window.alert(response.message);
        //   if (response.status === 'success') {
        //     setAddMovie(null);
        //   }
        // });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
    description.current.classList.remove('invalid');
    moviesCount.current.classList.remove('invalid');
    imgs.current.classList.remove('invalid');

    if (!title.current.value.trim()) {
      title.current.classList.add('invalid');
      newErrors.title = 'Tytuł jest wymagany';
    }
    if (!description.current.value.trim()) {
      description.current.classList.add('invalid');
      newErrors.description = 'Opis jest wymagany';
    }
    const moviesCountValue = parseInt(moviesCount.current.value, 10);
    if (!moviesCount.current.value.trim() || isNaN(moviesCountValue)) {
      moviesCount.current.classList.add('invalid');
      newErrors.moviesCount = 'Liczba filmów w serii jest wymagana';
    }
    const imgsValue = imgs.current.value.trim().split('\n');
    if (!imgs.current.value.trim()) {
      imgs.current.classList.add('invalid');
      newErrors.imgs = 'Linki do zdjęć są wymagane';
    } else {
      const invalidIndex = imgsValue.findIndex((img) => !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(img));
      if (invalidIndex !== -1) {
        imgs.current.classList.add('invalid');
        newErrors.imgs = `Niepoprawny link w linii ${invalidIndex + 1}: "${imgsValue[invalidIndex]}"
        (Link powinien rozpoczynać się od "http://" lub "https://", a kończyć rozszerzeniem pliku graficznego (.jpg, .jpeg, .png, .gif, .webp, .bmp, .svg))`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const RemoveInvalid = (e) => {
    e.target.classList.remove('invalid'); setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[e.target.id];
      return newErrors;
    })
  }

  return (
    <div className='add-box-container'>
      <div className='add-box'>
        <div className='close' onClick={() => setAddMovie(null)}>
          <img src={close} alt='close_icon' />
        </div>
        <h1>Dodaj serie filmów</h1>
        <div className='add-form'>
          <label>
            <span>Tytuł</span>
            <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='title' ref={title} />
          </label>
          {errors.title && <div className='form-error'>{errors.title}</div>}
          <label>
            <span>Opis</span>
            <textarea onChange={(e) => {RemoveInvalid(e)}} rows='5' id='description' ref={description} />
          </label>
          {errors.description && <div className='form-error'>{errors.description}</div>}
          <label>
            <span>Liczba filmów w serii</span>
            <input
              type='number' ref={moviesCount} id='moviesCount'
              onChange={(e) => {setInputMoviesCount(parseInt(e.target.value, 10) || 0);RemoveInvalid(e)}} />
          </label>
          {errors.moviesCount && <div className='form-error'>{errors.moviesCount}</div>}
          <label>
            <span>Linki do zdjęć<br />(jeden pod drugim)</span>
            <textarea onChange={(e) => {RemoveInvalid(e)}} rows='10' id='imgs' ref={imgs} />
          </label>
          {errors.imgs && <div className='form-error'>{errors.imgs}</div>}
          {Array.from({ length: inputMoviesCount }, (_, i) => (
            <AddFilmSeriesSingleMovie key={i} initialTitle={`Film z serii #${i + 1}`} ref={(el) => (movieRefs.current[i] = el)} />
          ))}
          <button className='add-btn' onClick={AddFilmSeries}>Dodaj</button>
        </div>
      </div>
    </div>
  );
};

export default AddFilmSeries;