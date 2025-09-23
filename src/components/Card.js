import { useEffect, useRef, useState } from "react";
import "../styles/Card.css";
import getAverageColor from "./AverageColor";
import TruncatedText from "./TruncatedText";
import imageNotFound from '../images/image_not_found.png'

const Card = ({ id, img, title, year, description, genre, handleContextMenu, glowingColor }) => {
  // const [shadowColor, setShadowColor] = useState("rgba(108,108,108,var(--shadow-visibility))");
  const [remainingLines, setRemainingLines] = useState(8); // Domyślnie 8 linii dla opisu
  const titleRef = useRef(null);
  const yearRef = useRef(null);

  const imgRef = useRef(null); // Referencja do elementu obrazu

  useEffect(() => {
    if (titleRef.current && imgRef.current) {
      calculateRemainingLines();
    }
    // console.log(titleRef,imgRef)
  }, [title])

  function calculateRemainingLines() {
    const lineHeight = 16; // Wysokość linii w px (dopasuj do CSS)
      const titleHeight = titleRef.current.offsetHeight;
      const yearHeight = yearRef.current.offsetHeight;
      const remainingSpace = 186 - titleHeight - yearHeight;
      const usedLines = parseInt(remainingSpace / lineHeight)
      setRemainingLines(Math.max(usedLines, 0)); // Odejmujemy zajęte linie
  }
  const genreString = genre ? genre.split(',').map(genre => genre.trim()).join(" | ") : '';
  // console.log(title, glowingColor)

  return (
    <div
      className="card"
      onContextMenu={(e) => handleContextMenu(e, id)}
      style={{
        '--shadow-color': glowingColor,
      }}
      data-id={id}
    >
      <span style={{ display: "none" }}>{id}</span>
      <img
        onLoad={(e) => { calculateRemainingLines() }}
        onError={(e) => { e.currentTarget.src = imageNotFound; }}
        // onError={(e) => { e.currentTarget.onError = null; calculateRemainingLines(); }}
        ref={imgRef}
        className="card-img"
        alt="card-image"
        // crossOrigin="anonymous"
        // src={"https://corsproxy.io/?url=" + img}
        // src={"https://frog02-30766.wykr.es/proxy?url=" + img}
        src={img}
      />
      <div className="content">
        <span className="title" ref={titleRef}>
          {title}
        </span>
        <span className={`year${genre ? ' genre' : ''}`} ref={yearRef} title={genreString}>{year}{genreString && ` • ${genreString}`}</span>
        <span className="description">
          <TruncatedText text={description} maxLines={remainingLines} />
        </span>
      </div>
    </div>
  );
};

export default Card;
