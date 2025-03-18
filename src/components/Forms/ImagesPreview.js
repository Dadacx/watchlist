import '../../styles/ImagesPreview.css'
import close from '../../images/close.svg'
import delete_icon from '../../images/delete.svg'
import { useState } from 'react'

const ImagesPreview = ({ images, setShowImagesPreview, updateImages }) => {
    const [imgs, setImgs] = useState(images.split('\n'))
    const thumbnail = imgs[0]
    function deleteImage(image) {
        setImgs(prevImgs => {
            const index = prevImgs.indexOf(image);
            updateImages([...prevImgs.slice(0, index), ...prevImgs.slice(index + 1)].join('\n'))
            if (index === -1) return prevImgs;
      
            return [...prevImgs.slice(0, index), ...prevImgs.slice(index + 1)];
          })
    } 
    return (
        <div className='imgs-preview-box'>
            <div className='imgs-preview-close' onClick={() => setShowImagesPreview(false)}><img src={close} alt='close_icon' /></div>
            <h1>Podgląd zdjęć</h1>
            <h2 className='thumbnail-title'>Miniaturka</h2>
            {thumbnail ? <img className='thumbnail' alt='thumbnail' src={thumbnail} /> : <p className='error'>Brak miniaturki do wyświetlenia</p>}
            <h2 className='photos-title'>Zdjęcia z filmu</h2>
            <div className='photos-preview'>
                {imgs.length > 0 ? imgs.map((img, i) => {
                    if(i===0) return null
                    return (<div className='images-preview-img-container'>
                        <img className='delete-icon' alt='delete-icon' src={delete_icon} onClick={() => deleteImage(img)} />
                        <img key={i} className='photos' alt={`photo-${i}`} src={img} />
                    </div>)
                }) : <p className='error'>Brak zdjęć do wyświetlenia</p>}
            </div>
        </div>
    )
}

export default ImagesPreview