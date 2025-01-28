const MoviesListFetch = async () => {
    try {
      const res = await fetch(`http://localhost/watchlist/get_movies.php`);
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/get_movies.php`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const DeleteFetch = async (password,id,title) => {
    try {
      const res = await fetch(`http://localhost/watchlist/delete.php?password=${password}&id=${id}&title=${title}`);
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/delete.php`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const AddFetch = async (movie) => {
    try {
      const res = await fetch(`http://localhost/watchlist/add.php`, {
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/add.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(movie) // konwersja danych do formatu JSON
          });
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const EditFetch = async (movie) => {
    try {
      const res = await fetch(`http://localhost/watchlist/edit.php`, {
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/edit.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(movie) // konwersja danych do formatu JSON
          });
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };

  const FavoriteMoviesListFetch = async () => {
    try {
      const res = await fetch(`http://localhost/watchlist/get_favorite_movies.php`);
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/get_favorite_movies.php`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const DeleteFavoriteFetch = async (password,id,title) => {
    try {
      const res = await fetch(`http://localhost/watchlist/delete_favorite.php?password=${password}&id=${id}&title=${title}`);
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/delete_favorite.php`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const AddFavoriteFetch = async (movie) => {
    try {
      const res = await fetch(`http://localhost/watchlist/add_favorite.php`, {
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/add_favorite.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(movie) // konwersja danych do formatu JSON
          });
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const EditFavoriteFetch = async (movie) => {
    try {
      const res = await fetch(`http://localhost/watchlist/edit_favorite.php`, {
        // const res = await fetch(`https://frog02-20766.wykr.es/watchlist/edit_favorite.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(movie) // konwersja danych do formatu JSON
          });
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  
  export { MoviesListFetch, DeleteFetch, AddFetch, EditFetch, FavoriteMoviesListFetch, DeleteFavoriteFetch, AddFavoriteFetch, EditFavoriteFetch };