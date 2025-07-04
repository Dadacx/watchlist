import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";

const Bar = ({setMovies, data, setAddMovie, isFavoriteList}) => {
    const [filterMenuVisible, setFilterMenuVisible] = useState(false)
    const [filters, setFilters] = useState({
        categories: [], // ['movies', 'series', 'film-series']
        genres: [], // ['akcja', 'komedia', 'fantasy', 'horror', 'sci-fi', 'thriller', itd.]
        sort: null, // 'a-z', 'z-a'
    });
    const filterRefs = useRef({})

    useEffect(() => {
        const handleFiltersClose = (e) => {
            if (!e.target.closest('.filter-box') && !e.target.closest('.filter-label')) {
                setFilterMenuVisible(false);
            }
        };
        window.addEventListener("click", handleFiltersClose);
        return () => {
            window.removeEventListener("click", handleFiltersClose);
        };
    }, []);

    const searchMovies = (e) => {
        const search = e.target.value.toLowerCase();
        const searchResult = applyFiltersAndSort().filter(movie => movie.title.toLowerCase().includes(search));
        setMovies(searchResult);
    };

    const applyFiltersAndSort = () => {
        let filteredMovies = [...data.data];
        if (filters.categories.length > 0) {
            filteredMovies = filteredMovies.filter(movie => filters.categories.includes(movie.type));
        }
        if (filters.genres.length > 0) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.genre && movie.genre.split(', ').some(genre => filters.genres.includes(genre))
            );
        }
        if (filters.sort === 'a-z') {
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (filters.sort === 'z-a') {
            filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
        }
        setMovies(filteredMovies);
        return filteredMovies;
    };

    useEffect(() => {
        if (data) {
            applyFiltersAndSort();
        }
    }, [filters]);

    const toggleCategoryFilter = (category, hide) => {
        const el = filterRefs.current[category];

        if (hide) {
            if (el) el.style.display = "none";
        } else {
            if (el) el.style.display = "block";
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            categories: prevFilters.categories.includes(category)
                ? prevFilters.categories.filter(cat => cat !== category)
                : [...prevFilters.categories, category],
        }));
    };

    const toggleGenreFilter = (genre, hide) => {
        const el = filterRefs.current[genre];

        if (hide) {
            if (el) el.style.display = "none";
        } else {
            if (el) el.style.display = "block";
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            genres: prevFilters.genres.includes(genre)
                ? prevFilters.genres.filter(gen => gen !== genre)
                : [...prevFilters.genres, genre],
        }));
    };

    const toggleSortFilter = (sortOption, hide) => {
        const el = filterRefs.current[sortOption];

        if (hide) {
            if (el) el.style.display = "none";
            filterRefs.current[sortOption.split("").reverse().join("")].style.display = 'block'
        } else {
            if (el) el.style.display = "block";
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            sort: prevFilters.sort === sortOption ? null : sortOption,
        }));
    };
    const resetFilters = () => {
        Object.values(filterRefs.current).forEach((el) => {
            if (el) el.style.display = "block";
        });

        setFilters({
            categories: [],
            genres: [],
            sort: null,
        });
    };

    return (<div className='bar'>
        <div className='search-container'>
            <div className='bar-box search-box' onClick={() => window.document.querySelector('.search-text').focus()}>
                <input className="search-text" type="text" onChange={(e) => searchMovies(e)} placeholder="Wyszukaj film" />
                <span className="search-btn"></span>
            </div>
        </div>
        <div className='bar-box' title='Dodaj film' onClick={() => setAddMovie('movie')}>
            <div className="add-movie-icon"></div>
        </div>
        <div className='bar-box' title='Dodaj serie filmów' onClick={() => setAddMovie('film-series')}>
            <div className="add-film-series-icon"></div>
        </div>
        <div className='bar-box' title='Dodaj serial' onClick={() => setAddMovie('series')}>
            <div className="add-series-icon"></div>
        </div>
        <div className='filter-container'>
            <div className='bar-box filter-box' title='Filtruj' >
                <div className="filter-icon" onClick={() => setFilterMenuVisible(!filterMenuVisible)}></div>
                <div className='filter-wrapper'>
                    <div className="filter-text">
                        {filters.categories.map(category => (<span key={category} className="filter-label" onClick={() => toggleCategoryFilter(category)}>
                            {category.replace('movie', 'Filmy').replace('film-series', 'Serie filmów').replace('series', 'Seriale')}{' '}
                        </span>))}
                        {filters.genres.map(genre => (<span key={genre} className="filter-label" onClick={() => toggleGenreFilter(genre)}>
                            {genre}{' '}
                        </span>))}
                        {filters.sort && (<span className="filter-label" onClick={() => toggleSortFilter(filters.sort)}>{filters.sort.toUpperCase()}{' '}</span>)}
                    </div>
                    {filterMenuVisible && (
                        <div className='filter-menu'>
                            <div className='filter-option' onClick={resetFilters}>Wyczyść filtry</div>
                            <div className='filter-option-title'>- Sortowanie -</div>
                            <div className='filter-option' onClick={() => toggleSortFilter('a-z', true)} ref={(el) => {
                                if (el) filterRefs.current['a-z'] = el;
                            }}>Od A-Z</div>
                            <div className='filter-option' onClick={() => toggleSortFilter('z-a', true)} ref={(el) => {
                                if (el) filterRefs.current['z-a'] = el;
                            }}>Od Z-A</div>
                            <div className='filter-option-title'>- Kategoria -</div>
                            <div className='filter-option' onClick={() => toggleCategoryFilter('movie', true)} ref={(el) => {
                                if (el) filterRefs.current['movie'] = el;
                            }}>Filmy</div>
                            <div className='filter-option' onClick={() => toggleCategoryFilter('film-series', true)} ref={(el) => {
                                if (el) filterRefs.current['film-series'] = el;
                            }}>Serie filmów</div>
                            <div className='filter-option' onClick={() => toggleCategoryFilter('series', true)} ref={(el) => {
                                if (el) filterRefs.current['series'] = el;
                            }}>Seriale</div>
                            <div className='filter-option-title'>- Gatunek -</div>
                            {data && Array.from(new Set(data.data.flatMap(item => item.genre ? item.genre.split(', ') : [])))
                                .map((genre, index) => (
                                    <div key={index} className='filter-option' onClick={(e) => toggleGenreFilter(genre, true)} ref={(el) => {
                                        if (el) filterRefs.current[genre] = el;
                                    }}>
                                        {genre}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className='bar-box' title={isFavoriteList ? 'Zamknij ulubione' : 'Ulubione'}>
            <Link to={isFavoriteList ? '/' : '/favorite'} className={isFavoriteList ? "favorite-fill-icon" : "favorite-icon"}></Link>
        </div>
    </div>)
}

export default Bar