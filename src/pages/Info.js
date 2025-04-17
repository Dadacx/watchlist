import '../styles/Info.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import SetTitle from '../components/SetTitle';
import InfoMovie from '../components/Info/InfoMovie';
import InfoFilmSeries from '../components/Info/InfoFilmSeries';
import InfoSeries from '../components/Info/InfoSeries';

const Info = ({ data, error }) => {
    const [images, setImages] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const { movie } = useParams();
    const movieData = data?.data.find((item) => item.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '') === movie)

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.code === 'ArrowLeft') {
                changeModalImage(-1);
            }
            if (e.code === 'ArrowRight') {
                changeModalImage(1);
            }
        };
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [selectedImage])

    const openModal = (img) => {
        setSelectedImage(img);
        document.body.classList.add("no-scroll"); // Blokowanie scrollowania
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.classList.remove("no-scroll"); // Przywrócenie scrollowania
    };
    const changeModalImage = (id) => {
        var newImageID = selectedImage.id + id
        if (newImageID < 0) newImageID = images.length - 1
        if (newImageID > images.length - 1) newImageID = 0
        console.log({ src: images[newImageID], alt: `image-${newImageID}`, id: newImageID })
        openModal({ src: images[newImageID], alt: `image-${newImageID}`, id: newImageID })
    }

    useEffect(() => {
        return () => document.body.classList.remove("no-scroll"); // Czyszczenie klasy przy odmontowaniu
    }, []);
    if (movieData && !images) setImages(movieData?.imgs.split('\n').slice(1))
    // movieData && SetTitle(`${movieData.title} | Info | Filmy do obejrzenia`);
    SetTitle(`${movieData ? movieData.title : ""} | Info | Filmy do obejrzenia`, movieData)
    return (
        <div className='info'>
            {movieData && movieData.type === 'movie' ? <InfoMovie movieData={movieData} /> :
                movieData && movieData.type === 'film-series' ? <InfoFilmSeries movieData={movieData} /> :
                    movieData && movieData.type === 'series' ? <InfoSeries movieData={movieData} /> : null}
            <div className='gallery-section'>
                <h1>Galeria</h1>
                <div className="gallery">
                    {images && images.map((item, i) => <img key={`image-${i}`} src={item} alt={`image-${i}`}
                        onClick={() => openModal({ src: item, alt: `image-${i}`, id: i })} />)}
                </div>
                {selectedImage && (
                    <div className="modal">
                        <img src={selectedImage.src} alt={selectedImage.alt} onClick={closeModal} />
                        <div className='prev-img img-btn' onClick={() => changeModalImage(-1)}>{'<'}</div>
                        <div className='next-img img-btn' onClick={() => changeModalImage(1)}>{'>'}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Info;