import '../styles/Add.css'
import { useRef, useState } from 'react';
import close from '../images/close.svg'
import { AddSeriesFetch } from './Fetch';

const AddSeries = ({ setAddMovie }) => {
  const [errors, setErrors] = useState({});
  const [inputSeasonsCount, setInputSeasonsCount] = useState(0);
  const title = useRef(null);
  const original_title = useRef(null);
  const year = useRef(null);
  const link = useRef(null);
  const imgs = useRef(null);
  const seasonsCount = useRef(null);

  function addSeries() {
    if (validateForm()) {
      console.log('Formularz poprawny');
      var episodes = [];
      for (let i = 0; i < inputSeasonsCount; i++) {
        const textarea = document.getElementById(`season-${i}`);
        episodes.push(textarea.value.trim().split('\n'));
      }
      const series = {
        type: 'series',
        title: title.current.value,
        original_title: original_title.current.value,
        year: year.current.value,
        link: link.current.value,
        imgs: imgs.current.value,
        seasonsCount: seasonsCount.current.value,
        episodes: JSON.stringify(episodes),
        password: window.prompt("Podaj hasło")
      }
      console.log(series)
      AddSeriesFetch(series).then((response) => {
        window.alert(response.message);
        if (response.status === 'success') {
          setAddMovie(null);
        }
      });
    }
  }
  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
    original_title.current.classList.remove('invalid');
    year.current.classList.remove('invalid');
    link.current.classList.remove('invalid');
    imgs.current.classList.remove('invalid');
    seasonsCount.current.classList.remove('invalid');

    if (!title.current.value.trim()) {
      title.current.classList.add('invalid');
      newErrors.title = 'Tytuł jest wymagany';
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
    const seasonsCountValue = parseInt(seasonsCount.current.value, 10);
    if (!seasonsCount.current.value.trim() || isNaN(seasonsCountValue)) {
      seasonsCount.current.classList.add('invalid');
      newErrors.seasonsCount = 'Liczba sezonów jest wymagana';
    }
    for (let i = 0; i < inputSeasonsCount; i++) {
      const textarea = document.getElementById(`season-${i}`);
      if (!textarea.value.trim()) {
        textarea.classList.add('invalid');
        newErrors[`season-${i}`] = `Lista odcinków dla sezonu ${i + 1} jest wymagana`;
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
        <div className='close' onClick={() => setAddMovie(null)}><img src={close} alt='close_icon' /></div>
        <h1>Dodaj serial</h1>
        <div className='add-form'>
          <label><span>Tytuł</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='title' ref={title} />
          </label>
          {errors.title && <div className='form-error'>{errors.title}</div>}
          <label><span>Oryginalny tytuł</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='original_title' ref={original_title} />
          </label>
          {errors.original_title && <div className='form-error'>{errors.original_title}</div>}
          <label><span>Rok premiery</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='number' id='year' ref={year} />
          </label>
          {errors.year && <div className='form-error'>{errors.year}</div>}
          <label><span>Link</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='url' id='link' ref={link} />
          </label>
          {errors.link && <div className='form-error'>{errors.link}</div>}
          <label><span>Linki do zdjęć<br />(jeden pod drugim)</span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='10' id='imgs' ref={imgs} />
          </label>
          {errors.imgs && <div className='form-error'>{errors.imgs}</div>}
          <label>
            <span>Liczba sezonów</span>
            <input onChange={(e) => {
              setInputSeasonsCount(parseInt(e.target.value, 10) || 0); setErrors(() => Object.fromEntries(
                Object.entries(errors).filter(([key, value]) => {
                  // Jeśli klucz nie zaczyna się od "season", zachowaj go
                  if (!key.includes("season")) return true;
                  // Jeśli klucz zaczyna się od "season", sprawdź jego obecność w DOM
                  const element = document.getElementById(key);
                  return element !== null; // Zachowaj tylko, jeśli element istnieje w DOM
                })
              )); RemoveInvalid(e)
            }}
              type='number' id='seasonsCount' ref={seasonsCount} />
          </label>
          {errors.seasonsCount && <div className='form-error'>{errors.seasonsCount}</div>}
          {Array.from({ length: inputSeasonsCount }, (_, i) => (<>
            <label key={`season-${i}`}>
              <span>Lista odcinków {i + 1} sezonu<br />(jeden pod drugim)</span>
              <textarea
                onChange={(e) => { RemoveInvalid(e); }}
                rows='10'
                id={`season-${i}`}
              />
            </label>
            {errors[`season-${i}`] && <div className='form-error'>{errors[`season-${i}`]}</div>}</>
          ))}
          <button className='add-btn' onClick={addSeries}>Dodaj</button>
        </div>
      </div>
    </div>
  );
}

export default AddSeries;