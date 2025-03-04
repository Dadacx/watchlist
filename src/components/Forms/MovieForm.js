import '../../styles/Forms.css'
import { useRef, useState } from 'react';
import close from '../../images/close.svg'

const MovieForm = ({ setAddMovie, initialData, isEdit }) => {
  const [errors, setErrors] = useState({});
  const title = useRef(null);
  const original_title = useRef(null);
  const year = useRef(null);
  const description = useRef(null);
  const duration = useRef(null);
  const link = useRef(null);
  const imgs = useRef(null);

  function Movie() {
    if (validateForm()) {
      console.log('Formularz poprawny');
      const movie = {
        type: 'movie',
        title: title.current.value.trim(),
        original_title: original_title.current.value.trim(),
        year: year.current.value.trim(),
        description: description.current.value.trim(),
        duration: duration.current.value.trim(),
        link: link.current.value.trim(),
        imgs: imgs.current.value.trim(),
        password: window.prompt("Podaj hasło")
      }
      console.log(movie)
      setAddMovie(movie);
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
    <div className='form-box-container'>
      <div className='form-box'>
        <div className='close' onClick={() => setAddMovie(null)}><img src={close} alt='close_icon' /></div>
        <h1>{isEdit ? "Edytuj film" : "Dodaj film"}</h1>
        <div className='form-form'>
          <label><span>Tytuł</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='title' ref={title} defaultValue={initialData?.title} />
          </label>
          {errors.title && <div className='form-error'>{errors.title}</div>}
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
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='duration' ref={duration} defaultValue={initialData?.duration} />
          </label>
          {errors.duration && <div className='form-error'>{errors.duration}</div>}
          <label><span>Link</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='url' id='link' ref={link} defaultValue={initialData?.link} />
          </label>
          {errors.link && <div className='form-error'>{errors.link}</div>}
          <label><span>Linki do zdjęć<br />(jeden pod drugim)</span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='10' id='imgs' ref={imgs} defaultValue={initialData?.imgs} />
          </label>
          {errors.imgs && <div className='form-error'>{errors.imgs}</div>}
          <button className='form-btn' onClick={Movie}>{isEdit ? "Zapisz zmiany" : "Dodaj"}</button>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;