import '../../styles/Add.css'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const AddFilmSeriesSingleMovie = forwardRef(({ initialTitle }, ref) => {
  const [inputTitle, setInputTitle] = useState(initialTitle);
  const [errors, setErrors] = useState({});
  const title = useRef(null);
  const year = useRef(null);
  const duration = useRef(null);
  const link = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
    year.current.classList.remove('invalid');
    duration.current.classList.remove('invalid');
    link.current.classList.remove('invalid');

    if (!title.current.value.trim()) {
      title.current.classList.add('invalid');
      newErrors.title = 'Tytuł jest wymagany';
    }
    const yearValue = parseInt(year.current.value, 10);
    if (!year.current.value.trim() || isNaN(yearValue)) {
      year.current.classList.add('invalid');
      newErrors.year = 'Rok jest wymagany';
    }
    if (!duration.current.value.trim()) {
      duration.current.classList.add('invalid');
      newErrors.duration = 'Czas trwania jest wymagany';
    }
    if (!link.current.value.trim() || !/^https?:\/\//.test(link.current.value)) {
      link.current.classList.add('invalid');
      newErrors.link = 'Podaj poprawny link';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const getMovieData = () => ({
    title: title.current.value.trim(),
    year: year.current.value.trim(),
    duration: duration.current.value.trim(),
    link: link.current.value.trim(),
  });
  // Udostępnienie funkcji validateForm i getMovieData przez ref
  useImperativeHandle(ref, () => ({
    validateForm,
    getMovieData,
  }));
  const RemoveInvalid = (e) => {
    e.target.classList.remove('invalid'); setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[e.target.id];
      return newErrors;
    })
  }

  return (
    <details className='add-film-series-single-movie'>
      <summary>{inputTitle || initialTitle}</summary>
      <div className='add-form'>
        <label className='single-movie'>
          <span>Tytuł</span>
          <input onChange={(e) => {setInputTitle(e.target.value);RemoveInvalid(e)}} type='text' id='title' ref={title} />
        </label>
        {errors.title && <div className='form-error'>{errors.title}</div>}
        <label className='single-movie'>
          <span>Rok premiery</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='number' id='year' ref={year} />
        </label>
        {errors.year && <div className='form-error'>{errors.year}</div>}
        <label className='single-movie'>
          <span>Czas trwania</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='duration' ref={duration} />
        </label>
        {errors.duration && <div className='form-error'>{errors.duration}</div>}
        <label className='single-movie'>
          <span>Link</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='link' ref={link} />
        </label>
        {errors.link && <div className='form-error'>{errors.link}</div>}
      </div>
    </details>
  );
});

export default AddFilmSeriesSingleMovie;