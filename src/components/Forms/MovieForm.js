import '../../styles/Forms.css'
import { useRef, useState, useEffect } from 'react';
import { showPasswordPrompt } from '../PasswordPrompt/PasswordPrompt';
import ImagesPreview from './ImagesPreview';
import AddFromJson from './AddFromJson';
import getAverageColor from '../AverageColor'
import close from '../../images/close.svg'
import json_icon from '../../images/json.svg'
import { useDevTools } from '../DevToolsContext';

const isObject = (object) => {
  if (typeof object === 'string' && object.startsWith("http")) return object.split("\n").map((item) => { return { title: '', img: item } })
  if (typeof object === 'string') return JSON.parse(object)
  return object
}
const MovieForm = ({ setAddMovie, initialData: startData, isEdit }) => {
  const [errors, setErrors] = useState({});
  const [showImagesPreview, setShowImagesPreview] = useState(false)
  const [showAddFromJson, setShowAddFromJson] = useState(false)
  const [initialData, setInitialData] = useState(startData)
  const title = useRef(null);
  const genre = useRef(null);
  const original_title = useRef(null);
  const year = useRef(null);
  const description = useRef(null);
  const duration = useRef(null);
  const link = useRef(null);
  const imgs = useRef(null);
  const imgsTitle = useRef(isObject(initialData?.imgs)?.map((item) => item.title) || []);

  useEffect(() => {
    setInitialData(startData)
  }, [startData])
  // DevTools
  const { setDevTools, movieFormTestData } = useDevTools();
  useEffect(() => {
    imgsTitle.current = isObject(initialData?.imgs)?.map((item) => item.title)
    setDevTools((prev) => {
      return {
        ...prev,
        fillMovieForm: () => setInitialData(movieFormTestData)
      };
    })
  }, [initialData]);

  async function Movie() {
    if (validateForm()) {
      console.log('Formularz poprawny');

      let glowing_color
      try {
        glowing_color = await getAverageColor(imgs.current.value.trim().split('\n')[0])
      } catch (error) {
        console.error("Błąd podczas pobierania koloru:", error);
        if (window.confirm(`Błąd podczas pobierania koloru. Naciśnij OK, aby ustawić domyślny kolor i kontynuować ${isEdit ? "edytowanie" : "dodawanie"} filmu lub Anuluj, aby przerwać.`)) {
          glowing_color = "#6c6c6c" // Domyślny kolor w przypadku błędu
        } else {
          return;
        }
      }

      const movie = {
        type: 'movie',
        title: title.current.value.trim(),
        genre: genre.current.value.trim(),
        original_title: original_title.current.value.trim(),
        year: year.current.value.trim(),
        description: description.current.value.trim(),
        duration: duration.current.value.trim(),
        link: link.current.value.trim(),
        imgs: JSON.stringify(imgs.current.value.trim().split('\n').map((img, i) => { return { title: imgsTitle.current[i] || '', img: img } })),
        glowing_color: glowing_color,
        password: await showPasswordPrompt("Podaj hasło")
      }
      if (!movie.password) return;
      console.log(movie)
      setAddMovie(movie);
    }
  }
  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
    genre.current.classList.remove('invalid');
    original_title.current.classList.remove('invalid');
    year.current.classList.remove('invalid');
    description.current.classList.remove('invalid');
    duration.current.classList.remove('invalid');
    link.current.classList.remove('invalid');
    imgs.current.classList.remove('invalid');

    if (!title.current.value.trim()) {
      title.current.classList.add('invalid');
      newErrors.title = 'Tytuł jest wymagany';
    }
    if (!genre.current.value.trim()) {
      genre.current.classList.add('invalid');
      newErrors.genre = 'Gatunek jest wymagany';
    }
    if (!original_title.current.value.trim()) {
      original_title.current.classList.add('invalid');
      newErrors.original_title = 'Oryginalny tytuł jest wymagany';
    }
    const yearValue = parseInt(year.current.value, 10);
    if (!year.current.value.trim() || isNaN(yearValue)) {
      year.current.classList.add('invalid');
      newErrors.year = 'Rok jest wymagany';
    }
    if (!description.current.value.trim()) {
      description.current.classList.add('invalid');
      newErrors.description = 'Opis jest wymagany';
    }
    if (!duration.current.value.trim()) {
      duration.current.classList.add('invalid');
      newErrors.duration = 'Czas trwania jest wymagany';
    }
    if (!link.current.value.trim() || !/^https?:\/\//.test(link.current.value)) {
      link.current.classList.add('invalid');
      newErrors.link = 'Podaj poprawny link';
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
  const RemoveInvalid = (e, name) => {
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
        <div className='close' onClick={() => setAddMovie(null)}><img src={close} alt='close_icon' /></div>
        {!isEdit && <div className='from-json' onClick={() => setShowAddFromJson(true)}><img src={json_icon} alt='add_from_json_icon' /></div>}
        <h1>{isEdit ? "Edytuj film" : "Dodaj film"}</h1>
        <div className='form-form'>
          <label><span>Tytuł</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='title' ref={title} defaultValue={initialData?.title} />
          </label>
          {errors.title && <div className='form-error'>{errors.title}</div>}
          <label><span>Gatunek</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='genre' ref={genre} defaultValue={initialData?.genre} />
          </label>
          {errors.genre && <div className='form-error'>{errors.genre}</div>}
          <label><span>Oryginalny tytuł</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='original_title' ref={original_title} defaultValue={initialData?.original_title} />
          </label>
          {errors.original_title && <div className='form-error'>{errors.original_title}</div>}
          <label><span>Rok premiery</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='number' id='year' ref={year} defaultValue={initialData?.year} />
          </label>
          {errors.year && <div className='form-error'>{errors.year}</div>}
          <label><span>Opis</span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='5' id='description' ref={description} defaultValue={initialData?.description} />
          </label>
          {errors.description && <div className='form-error'>{errors.description}</div>}
          <label><span>Czas trwania</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='duration' ref={duration} defaultValue={initialData?.duration} placeholder='1h 12m' />
          </label>
          {errors.duration && <div className='form-error'>{errors.duration}</div>}
          <label><span>Link</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='url' id='link' ref={link} defaultValue={initialData?.link} />
          </label>
          {errors.link && <div className='form-error'>{errors.link}</div>}
          <label><span>Linki do zdjęć<br />(jeden pod drugim)<br /><span className='imgs-preview-btn' onClick={() => setShowImagesPreview(true)}>(Podgląd zdjęć)</span></span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='10' id='imgs' ref={imgs} defaultValue={isObject(initialData?.imgs)?.map((item) => item.img).join("\n")} />
          </label>
          {errors.imgs && <div className='form-error'>{errors.imgs}</div>}
          <button className='form-btn' onClick={Movie}>{isEdit ? "Zapisz zmiany" : "Dodaj"}</button>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;