import { useEffect, useRef, useState } from "react";
import "../styles/Card.css";
import getAverageColor from "./AverageColor";
import TruncatedText from "./TruncatedText";

const Card = ({ id, img, title, year, description, handleContextMenu }) => {
  const [shadowColor, setShadowColor] = useState("rgba(0,0,0,var(--shadow-visibility))");
  const [remainingLines, setRemainingLines] = useState(8); // Domyślnie 8 linii dla opisu
  const titleRef = useRef(null);
  const yearRef = useRef(null);

  const imgRef = useRef(null); // Referencja do elementu obrazu

  useEffect(() => {
    if (titleRef.current && imgRef.current) {
      const lineHeight = 16; // Wysokość linii w px (dopasuj do CSS)
      const titleHeight = titleRef.current.offsetHeight;
      const yearHeight = yearRef.current.offsetHeight;
      const remainingSpace = 186 - titleHeight - yearHeight;
      const usedLines = parseInt(remainingSpace / lineHeight)
      setRemainingLines(Math.max(usedLines, 0)); // Odejmujemy zajęte linie
    }
  }, [title]);

  return (
    <div
      className="card"
      onContextMenu={(e) => handleContextMenu(e, id)}
      style={{
        boxShadow: "0px 0px 24px 6px " + shadowColor,
      }}
    >
      <span style={{ display: "none" }}>{id}</span>
      <img
        onLoad={(e) => getAverageColor(e, setShadowColor)}
        onError={(e) => { e.currentTarget.onError = null; setShadowColor("rgba(108,108,108,var(--shadow-visibility))") }}
        ref={imgRef}
        className="card-img"
        alt="card-image"
        crossOrigin="anonymous"
        src={"https://corsproxy.io/?url=" + img}
      />
      <div className="content">
        <span className="title" ref={titleRef}>
          {title}
        </span>
        <span className="year" ref={yearRef}>{year}</span>
        <span className="description">
          {/* {console.log(remainingLines)} */}
          <TruncatedText text={description} maxLines={remainingLines} />
        </span>
      </div>
    </div>
  );
};

export default Card;
