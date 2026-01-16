import '../../styles/Forms.css'
import { useRef, useState, useEffect } from 'react';
import FilmSeriesSingleMovie from './FilmSeriesSingleMovie';
import { useDevTools } from '../DevToolsContext';
import { showPasswordPrompt } from '../PasswordPrompt/PasswordPrompt';
import getAverageColor from '../AverageColor'
import ImagesPreview from './ImagesPreview';
import AddFromJson from './AddFromJson';
import close from '../../images/close.svg';
import json_icon from '../../images/json.svg'

const isObject = (object) => {
  if (typeof object === 'string' && object.startsWith("http")) return object.split("\n").map((item) => { return { title: '', img: item } })
  if (typeof object === 'string') return JSON.parse(object)
  return object
}
const FilmSeriesForm = ({ setAddMovie, initialData: startData, isEdit }) => {
  const [errors, setErrors] = useState({});
  const [inputMoviesCount, setInputMoviesCount] = useState(0);
  const [showImagesPreview, setShowImagesPreview] = useState(false)
  const [showAddFromJson, setShowAddFromJson] = useState(false)
  const [initialData, setInitialData] = useState(startData)
  const title = useRef(null);
  const description = useRef(null);
  const moviesCount = useRef(null);
  const imgs = useRef(null);
  const imgsTitle = useRef(isObject(initialData?.imgs)?.map((item) => item.title) || []);
  const movieRefs = useRef([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setInitialData(startData)
  }, [startData])
  useEffect(() => {
    imgsTitle.current = isObject(initialData?.imgs)?.map((item) => item.title)
    if (initialData) setInputMoviesCount(ifMoviesString(initialData?.movies).length)
  }, [initialData]);
    // DevTools
    const { setDevTools, filmSeriesFormTestData } = useDevTools();
    useEffect(() => {
      imgsTitle.current = isObject(initialData?.imgs)?.map((item) => item.title)
      setDevTools((prev) => {
        return {
          ...prev,
          fillFilmSeriesForm: () => setInitialData(filmSeriesFormTestData)
        };
      })
    }, [initialData]);

  const FilmSeries = async () => {
    if (validateForm()) {

      let glowing_color
      try {
        glowing_color = await getAverageColor(imgs.current.value.trim().split('\n')[0])
      } catch (error) {
        console.error("Błąd podczas pobierania koloru:", error);
        if (window.confirm(`Błąd podczas pobierania koloru. Naciśnij OK, aby ${isEdit ? "zachować aktualny" : "ustawić domyślny"} kolor i kontynuować ${isEdit ? "edytowanie" : "dodawanie"} filmu lub Anuluj, aby przerwać.`)) {
          glowing_color = initialData.glowing_color || "#6c6c6c" // Domyślny kolor w przypadku błędu
        } else {
          return;
        }
      }

      const isMoviesValid = movieRefs.current.every((ref) => ref?.validateForm?.());
      if (isMoviesValid) {
        const moviesData = movieRefs.current.map((ref) => ref.getMovieData());
        setMovies(moviesData);
        console.log('Formularz poprawny');
        const movieSeries = {
          type: 'film-series',
          title: title.current.value.trim(),
          description: description.current.value.trim(),
          moviesCount: moviesCount.current.value.trim(),
          imgs: JSON.stringify(imgs.current.value.trim().split('\n').map((img, i) => { return { title: imgsTitle.current[i] || '', img: img } })),
          movies: JSON.stringify(moviesData),
          glowing_color: glowing_color,
          password: await showPasswordPrompt("Podaj hasło")
        }
        if(!movieSeries.password) return;
        console.log(movieSeries)
        setAddMovie(movieSeries);
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
  const ifMoviesString = (movies) => {
    if (typeof movies === 'string') return JSON.parse(movies)
    return movies
  }
  const RemoveInvalid = (e) => {
    e.target.classList.remove('invalid'); setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[e.target.id];
      return newErrors;
    })
  }
  const updateImages = (newImgs) => {
    imgs.current.value = newImgs
  }
  const updateImgsTitle = (newTitle) => {
    imgsTitle.current = newTitle
    setInitialData((prev) => {
      return {
        ...prev,
        imgs: JSON.stringify(imgs.current.value.trim().split('\n').map((img, i) => { return { title: newTitle[i] || '', img: img } }))
      }
    })
  }
  return (
    <div className='form-box-container'>
      {showImagesPreview && <ImagesPreview images={imgs.current.value} setShowImagesPreview={setShowImagesPreview}
        updateImages={updateImages} imgsTitle={imgsTitle.current} updateImgsTitle={updateImgsTitle} />}
        {showAddFromJson && <AddFromJson setInitialData={setInitialData} setShowAddFromJson={setShowAddFromJson} />}
      <div className='form-box'>
        <div className='close' onClick={() => setAddMovie(null)}>
          <img src={close} alt='close_icon' />
        </div>
        {!isEdit && <div className='from-json' onClick={() => setShowAddFromJson(true)}><img src={json_icon} alt='add_from_json_icon' /></div>}
        <h1>{isEdit ? "Edytuj serie filmów" : "Dodaj serie filmów"}</h1>
        <div className='form-form'>
          <label>
            <span>Tytuł</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='title' ref={title} defaultValue={initialData?.title} />
          </label>
          {errors.title && <div className='form-error'>{errors.title}</div>}
          <label>
            <span>Opis</span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='5' id='description' ref={description} defaultValue={initialData?.description} />
          </label>
          {errors.description && <div className='form-error'>{errors.description}</div>}
          <label>
            <span>Liczba filmów w serii</span>
            <input
              type='number' ref={moviesCount} id='moviesCount' defaultValue={ifMoviesString(initialData?.movies)?.length}
              onChange={(e) => { setInputMoviesCount(parseInt(e.target.value, 10) || 0); RemoveInvalid(e) }} />
          </label>
          {errors.moviesCount && <div className='form-error'>{errors.moviesCount}</div>}
          <label>
            <span>Linki do zdjęć<br />(jeden pod drugim)<br /><span className='imgs-preview-btn' onClick={() => setShowImagesPreview(true)}>(Podgląd zdjęć)</span></span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='10' id='imgs' ref={imgs} defaultValue={isObject(initialData?.imgs)?.map((item) => item.img).join("\n")} />
          </label>
          {errors.imgs && <div className='form-error'>{errors.imgs}</div>}
          {Array.from({ length: inputMoviesCount }, (_, i) => (
            <FilmSeriesSingleMovie key={i} initialTitle={`Film z serii #${i + 1}`} initialData={ifMoviesString(initialData?.movies)?.[i]}
              ref={(el) => (movieRefs.current[i] = el)} />
          ))}
          <button className='form-btn' onClick={FilmSeries}>{isEdit ? "Zapisz zmiany" : "Dodaj"}</button>
        </div>
      </div>
    </div>
  );
};

export default FilmSeriesForm;