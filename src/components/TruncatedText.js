import React from "react";

const TruncatedText = ({ text, maxLines }) => {
  const styles = {
    display: "-webkit-box", // Tworzy box wieloliniowy
    WebkitBoxOrient: "vertical", // Ustawia orientację pionową
    WebkitLineClamp: maxLines, // Ogranicza liczbę widocznych linii
    overflow: "hidden", // Ukrywa tekst poza widocznym obszarem
    textOverflow: "ellipsis", // Dodaje "..." na końcu (jeśli wspierane)
    lineHeight: "1em", // Wysokość pojedynczej linii
    wordBreak: "break-word", // Dzieli długie słowa
    maxHeight: `${1.5 * maxLines}em`, // Oblicza maksymalną wysokość na podstawie liczby linii
  };

  return <div style={styles}>{text}</div>;
};

export default TruncatedText;
