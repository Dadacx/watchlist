import React from "react";

const TruncatedText = ({ text, maxLines = 8 }) => {
  const styles = {
    display: "-webkit-box", // Tworzy box wieloliniowy
    WebkitBoxOrient: "vertical", // Ustawia orientację pionową
    WebkitLineClamp: maxLines, // Ogranicza liczbę widocznych linii
    overflow: "hidden", // Ukrywa tekst poza widocznym obszarem
    textOverflow: "ellipsis", // Dodaje "..." na końcu
    lineHeight: "1em", // Wysokość pojedynczej linii
    wordBreak: "break-word", // Łamie długie słowa
    whiteSpace: "pre-wrap", // Zapobiega wyjściu tekstu poza box
  };

  return <div style={styles}>{text}</div>;
};

export default TruncatedText;
