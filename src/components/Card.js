import { useEffect, useRef, useState } from 'react';
import '../styles/Card.css'
import getAverageColor from './AverageColor';
import TruncatedText from './TruncatedText';

const Card = ({ id, img, title, year, description, handleContextMenu }) => {
  const [shadowColor, setShadowColor] = useState('rgba(0,0,0,var(--shadow-visibility))');
  const imgRef = useRef(null); // Referencja do elementu obrazu
  useEffect(() => {
    // if (imgRef.current.complete) {
    //   getAverageColor(imgRef,setShadowColor);
    // } else {
    //   imgRef.current.onload = getAverageColor(imgRef,setShadowColor);
    // }
    imgRef.current.onload = getAverageColor(imgRef,setShadowColor);
  }, [img])
  return (
    <div className='card' onContextMenu={(e) => handleContextMenu(e, id)} style={{boxShadow:'0px 0px 24px 6px '+shadowColor}}>
      <span style={{ display: 'none' }}>{id}</span>
      <img ref={imgRef} className='card-img' alt='card-image' crossOrigin="anonymous" src={'https://corsproxy.io/?url=' + img} />
      <div className='content'>
        <span className='title'>{title}</span>
        <span className='year'>{year}</span>
        <span className='description'><TruncatedText text={description} maxLines={8} /></span>
        {/* <span className='description'>{description}</span> */}
      </div>
    </div>
  );
}

export default Card;