import '../../styles/Add.css'
import { useEffect, useRef, useState } from 'react';
import close from '../../images/close.svg'
import { AddMovieFetch } from '../Fetch';

const AddMovie = ({ setAddMovie }) => {
  const [errors, setErrors] = useState({});
  const title = useRef(null);
  const original_title = useRef(null);
  const year = useRef(null);
  const description = useRef(null);
  const duration = useRef(null);
  const link = useRef(null);
  const imgs = useRef(null);

  
  function addMovie() {
    if (validateForm()) {
      console.log('Formularz poprawny');
      const movie = {
        type: 'movie',
        title: title.current.value,
        original_title: original_title.current.value,
        year: year.current.value,
        description: description.current.value,
        duration: duration.current.value,
        link: link.current.value,
        imgs: imgs.current.value,
        password: window.prompt("Podaj hasło")
      }
      console.log(movie)
      // AddMovieFetch(movie).then((response) => {
      //   window.alert(response.message);
      //   if (response.status === 'success') {
      //     setAddMovie(null);
      //   }
      // });
    }
  }
  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
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

  return (
    <div className='add-box-container'>
      <div className='add-box'>
        <div className='close' onClick={() => setAddMovie(null)}><img src={close} alt='close_icon' /></div>
        <h1>Dodaj film</h1>
        <div className='add-form'>
          <label><span>Tytuł</span>
            <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='title' ref={title} />
          </label>
          {errors.title && <div className='form-error'>{errors.title}</div>}
          <label><span>Oryginalny tytuł</span>
            <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='original_title' ref={original_title} />
          </label>
          {errors.original_title && <div className='form-error'>{errors.original_title}</div>}
          <label><span>Rok premiery</span>
            <input onChange={(e) => {RemoveInvalid(e)}} type='number' id='year' ref={year} />
          </label>
          {errors.year && <div className='form-error'>{errors.year}</div>}
          <label><span>Opis</span>
            <textarea onChange={(e) => {RemoveInvalid(e)}} rows='5' id='description' ref={description} />
          </label>
          {errors.description && <div className='form-error'>{errors.description}</div>}
          <label><span>Czas trwania</span>
            <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='duration' ref={duration} />
          </label>
          {errors.duration && <div className='form-error'>{errors.duration}</div>}
          <label><span>Link</span>
            <input onChange={(e) => {RemoveInvalid(e)}} type='url' id='link' ref={link} />
          </label>
          {errors.link && <div className='form-error'>{errors.link}</div>}
          <label><span>Linki do zdjęć<br/>(jeden pod drugim)</span>
            <textarea onChange={(e) => {RemoveInvalid(e)}} rows='10' id='imgs' ref={imgs} />
          </label>
          {errors.imgs && <div className='form-error'>{errors.imgs}</div>}
          <button className='add-btn' onClick={addMovie}>Dodaj</button>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;