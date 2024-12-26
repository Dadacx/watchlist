const MoviesListFetch = async () => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/watchlist/get_movies.php`);
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const AddMovieFetch = async (movie) => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/watchlist/add_movie.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(movie) // konwersja danych do formatu JSON
          });
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const AddFilmSeriesFetch = async (film_series) => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/watchlist/add_film_series.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(film_series) // konwersja danych do formatu JSON
          });
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const AddSeriesFetch = async (series) => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/watchlist/add_series.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(series) // konwersja danych do formatu JSON
          });
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  
  export { MoviesListFetch, AddMovieFetch, AddFilmSeriesFetch, AddSeriesFetch };