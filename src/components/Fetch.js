// const url = 'http://192.168.100.9'
const url = 'http://localhost'
// const url = 'https://frog02-20766.wykr.es'
const MoviesListFetch = async () => {
  try {
    const res = await fetch(`${url}/watchlist/get_movies.php`);
    var data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
  }
};
const DeleteFetch = async (password, id, title) => {
  try {
    const res = await fetch(`${url}/watchlist/delete.php?password=${password}&id=${id}&title=${title}`);
    var data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
  }
};
const MultipleDeleteFetch = async (password, ids) => {
  console.log(ids.join(","))
  try {
    const res = await fetch(`${url}/watchlist/multiple_delete.php?password=${password}&ids=${ids.join(",")}`);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json" // ustawienie nagłówka na JSON
      },
      body: JSON.stringify(movie) // konwersja danych do formatu JSON
    });
    var data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
  }
};
const EditFetch = async (movie) => {
  try {
    const res = await fetch(`${url}/watchlist/edit.php`, {
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
    var data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
  }
};
const DeleteFavoriteFetch = async (password, id, title) => {
  try {
    const res = await fetch(`${url}/watchlist/delete_favorite.php?password=${password}&id=${id}&title=${title}`);
    var data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { "status": "error", "message": `[ERROR: ${error.message}] Błąd podczas łączenia z serwerem.` };
  }
};
const MultipleDeleteFavoriteFetch = async (password, ids) => {
  try {
    const res = await fetch(`${url}/watchlist/multiple_delete_favorite.php?password=${password}&ids=${ids.join(",")}`);
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

export {
  MoviesListFetch, DeleteFetch, MultipleDeleteFetch, AddFetch, EditFetch, FavoriteMoviesListFetch,
  DeleteFavoriteFetch, MultipleDeleteFavoriteFetch, AddFavoriteFetch, EditFavoriteFetch
};