const getAverageColor = (imgRef, setShadowColor) => {
  const imgElement = imgRef.current;

  // Sprawdzenie, czy imgElement jest dostępny i załadowany
  if (!imgElement || imgElement.width === 0 || imgElement.height === 0) {
    console.warn("Obraz nie jest jeszcze załadowany lub ma szerokość/wysokość równą 0.");
    return;
  }

  // Tworzymy element canvas do analizy obrazu
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;

  // Rysujemy obraz na canvasie
  context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

  try {
    // Pobieramy piksele z obrazu
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let r = 0, g = 0, b = 0, totalPixels = 0;

    // Iterujemy po pikselach (4 wartości na piksel: r, g, b, a)
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i]; // Red
      const green = pixels[i + 1]; // Green
      const blue = pixels[i + 2]; // Blue
      // Obliczamy jasność pikselu na podstawie wartości RGB
      const brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      // Ignorujemy bardzo ciemne lub jasne piksele
      if (brightness > 30 && brightness < 225) {
        r += red; // Red
        g += green; // Green
        b += blue; // Blue
        totalPixels++;
      }
    }

    // Jeśli mamy jakieś odpowiednie piksele, obliczamy średni kolor
    if (totalPixels > 0) {
      r = Math.floor(r / totalPixels);
      g = Math.floor(g / totalPixels);
      b = Math.floor(b / totalPixels);
      // Ustawiamy kolor cienia
      setShadowColor(`rgba(${r}, ${g}, ${b}, var(--shadow-visibility))`);
    }
  } catch (error) {
    console.error("Błąd podczas pobierania danych obrazu:", error);
  }
};

export default getAverageColor;