import '../../styles/ImagesPreview.css'
import close from '../../images/close.svg'
import edit_title_icon from '../../images/title.svg'
import delete_icon from '../../images/delete.svg'
import { useState } from 'react'

const ImagesPreview = ({ images, setShowImagesPreview, updateImages, imgsTitle, updateImgsTitle }) => {
    const [imgs, setImgs] = useState(images.split('\n'))
    const thumbnail = imgs[0]

    if (imgsTitle.length < imgs.length) {
        for (let i = imgsTitle.length; i < imgs.length; i++) {
            imgsTitle.push('')
        }
    } else if (imgsTitle.length > imgs.length) {
        for (let i = imgsTitle.length; i > imgs.length; i--) {
            imgsTitle.pop()
        }
    }

    function updateTitle(image) {
        const index = imgs.indexOf(image);
        console.log(index)
        const newTitle = window.prompt("Podaj tytuł zdjęcia", imgsTitle[index])
        imgsTitle[index] = newTitle
        updateImgsTitle(imgsTitle)
    }
    console.log(imgsTitle)
    function deleteImage(image) {
        setImgs(prevImgs => {
            const index = prevImgs.indexOf(image);
            updateImages([...prevImgs.slice(0, index), ...prevImgs.slice(index + 1)].join('\n'))
            updateImgsTitle([...imgsTitle.slice(0, index), ...imgsTitle.slice(index + 1)])
            if (index === -1) return prevImgs;

            return [...prevImgs.slice(0, index), ...prevImgs.slice(index + 1)];
        })
    }
    return (
        <div className='imgs-preview-box'>
            <div className='imgs-preview-close' onClick={() => setShowImagesPreview(false)}><img src={close} alt='close_icon' /></div>
            <h1>Podgląd zdjęć</h1>
            <h2 className='thumbnail-title'>Miniaturka</h2>
            {thumbnail ? <div className='thumbnail-preview-container'>
                <div className='preview-img-icons'>
                    <img className='edit-title-icon' alt='edit-title-icon' src={edit_title_icon} onClick={() => updateTitle(thumbnail)}
                        title='Edytuj tytuł' />
                </div>
                <img className='thumbnail' alt='thumbnail' src={thumbnail} />
            </div> : <p className='error'>Brak miniaturki do wyświetlenia</p>}
            <h2 className='photos-title'>Zdjęcia z filmu</h2>
            <div className='photos-preview'>
                {imgs.length > 0 ? imgs.map((img, i) => {
                    if (i === 0) return null
                    return (<div className='images-preview-img-container'>
                        <div className='preview-img-icons'>
                            <img className='edit-title-icon' alt='edit-title-icon' src={edit_title_icon}
                                onClick={() => updateTitle(img)} title='Edytuj tytuł' />
                            <img className='delete-icon' alt='delete-icon' src={delete_icon} onClick={() => deleteImage(img)}
                            title='Usuń' />
                        </div>
                        <img key={i} className='photos' alt={`photo-${i}`} src={img} />
                    </div>)
                }) : <p className='error'>Brak zdjęć do wyświetlenia</p>}
            </div>
        </div>
    )
}

export default ImagesPreview