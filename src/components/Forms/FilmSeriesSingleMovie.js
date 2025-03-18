import '../../styles/Forms.css'
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';

const FilmSeriesSingleMovie = forwardRef(({ initialTitle, initialData }, ref) => {
  const [inputTitle, setInputTitle] = useState(initialTitle);
  const [errors, setErrors] = useState({});
  const title = useRef(null);
  const genre = useRef(null);
  const year = useRef(null);
  const duration = useRef(null);
  const link = useRef(null);
  
  useEffect(() => {
    if(initialData) setInputTitle(initialData.title)
  }, [initialData]);
  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
    genre.current.classList.remove('invalid');
    year.current.classList.remove('invalid');
    duration.current.classList.remove('invalid');
    link.current.classList.remove('invalid');

    if (!title.current.value.trim()) {
      title.current.classList.add('invalid');
      newErrors.title = 'Tytuł jest wymagany';
    }
    if (!genre.current.value.trim()) {
      genre.current.classList.add('invalid');
      newErrors.genre = 'Gatunek jest wymagany';
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
    genre: genre.current.value.trim(),
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
    <details className='form-film-series-single-movie' open>
      <input type="checkbox" name={initialTitle.toLowerCase().replaceAll(" ","_")} className='details-input' id={initialTitle.toLowerCase().replaceAll(" ","_")} />
      <summary><label htmlFor={initialTitle.toLowerCase().replaceAll(" ","_")}>{inputTitle || initialTitle}</label></summary>
      <div className='form-form'>
        <label className='single-movie'>
          <span>Tytuł</span>
          <input onChange={(e) => {setInputTitle(e.target.value);RemoveInvalid(e)}} type='text' id='title' ref={title} defaultValue={initialData?.title} />
        </label>
        {errors.title && <div className='form-error'>{errors.title}</div>}
        <label className='single-movie'>
          <span>Gatunek</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='genre' ref={genre} defaultValue={initialData?.genre} />
        </label>
        {errors.genre && <div className='form-error'>{errors.genre}</div>}
        <label className='single-movie'>
          <span>Rok premiery</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='number' id='year' ref={year} defaultValue={initialData?.year} />
        </label>
        {errors.year && <div className='form-error'>{errors.year}</div>}
        <label className='single-movie'>
          <span>Czas trwania</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='duration' ref={duration} defaultValue={initialData?.duration} />
        </label>
        {errors.duration && <div className='form-error'>{errors.duration}</div>}
        <label className='single-movie'>
          <span>Link</span>
          <input onChange={(e) => {RemoveInvalid(e)}} type='text' id='link' ref={link} defaultValue={initialData?.link} />
        </label>
        {errors.link && <div className='form-error'>{errors.link}</div>}
      </div>
    </details>
  );
});

export default FilmSeriesSingleMovie;