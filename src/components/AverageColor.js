function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

const getAverageColor = async (imageUrl) => {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.src = "https://frog02-30766.wykr.es/proxy?url=" + imageUrl;

    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      context.drawImage(imgElement, 0, 0);

      try {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let r = 0, g = 0, b = 0, totalPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i];
          const green = pixels[i + 1];
          const blue = pixels[i + 2];
          const brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

          if (brightness > 30 && brightness < 225) {
            r += red;
            g += green;
            b += blue;
            totalPixels++;
          }
        }

        if (totalPixels > 0) {
          r = Math.floor(r / totalPixels);
          g = Math.floor(g / totalPixels);
          b = Math.floor(b / totalPixels);
          resolve(rgbToHex(r, g, b));
        } else {
          resolve(null);
        }
      } catch (error) {
        reject("Błąd podczas pobierania danych obrazu: " + error);
      }
    };

    imgElement.onerror = () => {
      reject("Nie udało się załadować obrazu przez proxy.");
    };
  });
};
export default getAverageColor;