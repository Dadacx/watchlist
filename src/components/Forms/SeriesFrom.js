import '../../styles/Forms.css'
import { useRef, useState, useEffect } from 'react';
import { useDevTools } from '../DevToolsContext';
import { showPasswordPrompt } from '../PasswordPrompt/PasswordPrompt';
import ImagesPreview from './ImagesPreview';
import AddFromJson from './AddFromJson';
import close from '../../images/close.svg'
import json_icon from '../../images/json.svg'

const isObject = (object) => {
  if (typeof object === 'string' && object.startsWith("http")) return object.split("\n").map((item) => { return { title: '', img: item } })
  if (typeof object === 'string') return JSON.parse(object)
  return object
}
const SeriesFrom = ({ setAddMovie, initialData: startData, isEdit }) => {
  const [errors, setErrors] = useState({});
  const [inputSeasonsCount, setInputSeasonsCount] = useState(0);
  const [showImagesPreview, setShowImagesPreview] = useState(false)
  const [showAddFromJson, setShowAddFromJson] = useState(false)
  const [initialData, setInitialData] = useState(startData)
  const title = useRef(null);
  const genre = useRef(null);
  const original_title = useRef(null);
  const year = useRef(null);
  const link = useRef(null);
  const imgs = useRef(null);
  const imgsTitle = useRef(isObject(initialData?.imgs)?.map((item) => item.title) || []);
  const seasonsCount = useRef(null);

  useEffect(() => {
    setInitialData(startData)
  }, [startData])
  useEffect(() => {
    imgsTitle.current = isObject(initialData?.imgs)?.map((item) => item.title)
    if (initialData) setInputSeasonsCount(ifEpisodesString(initialData?.episodes).length)
  }, [initialData]);
      // DevTools
    const { setDevTools, seriesFormTestData } = useDevTools();
    useEffect(() => {
      imgsTitle.current = isObject(initialData?.imgs)?.map((item) => item.title)
      setDevTools((prev) => {
        return {
          ...prev,
          fillSeriesForm: () => setInitialData(seriesFormTestData)
        };
      })
    }, [initialData]);

  async function Series() {
    if (validateForm()) {
      console.log('Formularz poprawny');
      var episodes = [];
      for (let i = 0; i < inputSeasonsCount; i++) {
        const textarea = document.getElementById(`season-${i}`);
        episodes.push(textarea.value.trim().split('\n'));
      }
      const series = {
        type: 'series',
        title: title.current.value.trim(),
        genre: genre.current.value.trim(),
        original_title: original_title.current.value.trim(),
        year: year.current.value.trim(),
        link: link.current.value.trim(),
        imgs: JSON.stringify(imgs.current.value.trim().split('\n').map((img, i) => { return { title: imgsTitle.current[i] || '', img: img } })),
        seasonsCount: seasonsCount.current.value.trim(),
        episodes: JSON.stringify(episodes),
        password: await showPasswordPrompt("Podaj hasło")
      }
      console.log(typeof series.episodes)
      console.log(series)
      setAddMovie(series);
    }
  }
  const validateForm = () => {
    const newErrors = {};
    title.current.classList.remove('invalid');
    genre.current.classList.remove('invalid');
    original_title.current.classList.remove('invalid');
    year.current.classList.remove('invalid');
    link.current.classList.remove('invalid');
    imgs.current.classList.remove('invalid');
    seasonsCount.current.classList.remove('invalid');

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
  const ifEpisodesString = (episodes) => {
    if (typeof episodes === 'string') return JSON.parse(episodes)
    return episodes
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
        <div className='close' onClick={() => setAddMovie(null)}><img src={close} alt='close_icon' /></div>
        {!isEdit && <div className='from-json' onClick={() => setShowAddFromJson(true)}><img src={json_icon} alt='add_from_json_icon' /></div>}
        <h1>{isEdit ? "Edytuj serial" : "Dodaj serial"}</h1>
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
          <label><span>Link</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='url' id='link' ref={link} defaultValue={initialData?.link} />
          </label>
          {errors.link && <div className='form-error'>{errors.link}</div>}
          <label><span>Linki do zdjęć<br />(jeden pod drugim)<br /><span className='imgs-preview-btn' onClick={() => setShowImagesPreview(true)}>(Podgląd zdjęć)</span></span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='10' id='imgs' ref={imgs} defaultValue={isObject(initialData?.imgs)?.map((item) => item.img).join("\n")} />
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
              type='number' id='seasonsCount' ref={seasonsCount} defaultValue={ifEpisodesString(initialData?.episodes)?.length} />
          </label>
          {errors.seasonsCount && <div className='form-error'>{errors.seasonsCount}</div>}
          {Array.from({ length: inputSeasonsCount }, (_, i) => (<>
            <label key={`season-${i}`}>
              <span>Lista odcinków {i + 1} sezonu<br />(jeden pod drugim)</span>
              <textarea
                onChange={(e) => { RemoveInvalid(e); }}
                rows='10'
                id={`season-${i}`}
                defaultValue={ifEpisodesString(initialData?.episodes) ? ifEpisodesString(initialData?.episodes)[i]?.join('\n') : ''}
              />
            </label>
            {errors[`season-${i}`] && <div className='form-error'>{errors[`season-${i}`]}</div>}</>
          ))}
          <button className='form-btn' onClick={Series}>{isEdit ? "Zapisz zmiany" : "Dodaj"}</button>
        </div>
      </div>
    </div>
  );
}

export default SeriesFrom;