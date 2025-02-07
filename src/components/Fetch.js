// const url = 'http://localhost'
const url = 'https://frog02-20766.wykr.es'
const MoviesListFetch = async () => {
    try {
      const res = await fetch(`${url}/watchlist/get_movies.php`);
        // const res = await fetch(`${url}/watchlist/get_movies.php`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  const DeleteFetch = async (password,id,title) => {
    try {
      const res = await fetch(`${url}/watchlist/delete.php?password=${password}&id=${id}&title=${title}`);
        // const res = await fetch(`${url}/watchlist/delete.php?password=${password}&id=${id}&title=${title}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  const AddFetch = async (movie) => {
    try {
      const res = await fetch(`${url}/watchlist/add.php`, {
        // const res = await fetch(`${url}/watchlist/add.php`, {
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
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  const EditFetch = async (movie) => {
    try {
      const res = await fetch(`${url}/watchlist/edit.php`, {
        // const res = await fetch(`${url}/watchlist/edit.php`, {
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
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };

  const FavoriteMoviesListFetch = async () => {
    try {
      const res = await fetch(`${url}/watchlist/get_favorite_movies.php`);
        // const res = await fetch(`${url}/watchlist/get_favorite_movies.php`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  const DeleteFavoriteFetch = async (password,id,title) => {
    try {
      const res = await fetch(`${url}/watchlist/delete_favorite.php?password=${password}&id=${id}&title=${title}`);
        // const res = await fetch(`${url}/watchlist/delete_favorite.php?password=${password}&id=${id}&title=${title}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  const AddFavoriteFetch = async (movie) => {
    try {
      const res = await fetch(`${url}/watchlist/add_favorite.php`, {
        // const res = await fetch(`${url}/watchlist/add_favorite.php`, {
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
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  const EditFavoriteFetch = async (movie) => {
    try {
      const res = await fetch(`${url}/watchlist/edit_favorite.php`, {
        // const res = await fetch(`${url}/watchlist/edit_favorite.php`, {
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
        return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
    }
  };
  
  export { MoviesListFetch, DeleteFetch, AddFetch, EditFetch, FavoriteMoviesListFetch, DeleteFavoriteFetch, AddFavoriteFetch, EditFavoriteFetch };