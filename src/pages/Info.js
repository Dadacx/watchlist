import '../styles/Info.css'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import InfoMovie from '../components/InfoMovie';
import InfoFilmSeries from '../components/InfoFilmSeries';
import InfoSeries from '../components/InfoSeries';

const Info = ({ data, error }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { movie } = useParams();

    const openModal = (img) => {
        setSelectedImage(img);
        document.body.classList.add("no-scroll"); // Blokowanie scrollowania
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.classList.remove("no-scroll"); // Przywrócenie scrollowania
    };

    useEffect(() => {
        return () => document.body.classList.remove("no-scroll"); // Czyszczenie klasy przy odmontowaniu
    }, []);
    const movieData = data?.data.find((item) => item.title.toLowerCase().replaceAll(' ', '_').replaceAll('?', '') === movie)
    return (
        <div className='info'>
            {movieData && movieData.type === 'movie' ? <InfoMovie movieData={movieData} /> :
             movieData && movieData.type === 'film-series' ? <InfoFilmSeries movieData={movieData} /> :
             movieData && movieData.type === 'series' ? <InfoSeries movieData={movieData} /> : null}
            <div className='gallery-section'>
                <h1>Galeria</h1>
                <div className="gallery">
                    {movieData?.imgs.split('\n').map((item, i) => i > 0 && (<img key={`image-${i}`} src={item} alt={`image-${i}`}
                        onClick={() => openModal({ src: item, alt: `image-${i}` })} />))}
                </div>
                {selectedImage && (
                    <div className="modal" onClick={closeModal}>
                        <img src={selectedImage.src} alt={selectedImage.alt} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Info;