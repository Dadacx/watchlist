import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const DevToolsContext = createContext();

export const DevToolsProvider = ({ children }) => {
    const [devTools, setDevTools] = useState({});
    
    const formImgs = [
    "https://fwcdn.pl/fpo/02/61/850261/7985244_2.10.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051095_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051096_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051098_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051099_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051100_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051101_1.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051104_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051108_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051109_2.13.webp",
    "https://fwcdn.pl/fph/02/61/850261/1051115_2.13.webp"
].map((img, i) => {
        return { title: i === 0 ? 'miniaturka' : `zdj ${i}`, img: img }
    })
    const movieFormTestData = {
        title: `Testowy tytuł (${new Date().toLocaleString().replace(', ',' ')})`,
        genre: 'Akcja, Sci-Fi, Komedia, Przygodowy, Thriller, Horror',
        original_title: `Test title`,
        year: '2025',
        description: `Testowy opis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
        duration: `1h 30m`,
        link: "https://www.filmweb.pl/film/Spider+Man%3A+Bez+drogi+do+domu-2021-850261",
        imgs: formImgs
    }
    const filmSeriesFormTestData = {
        title: `Testowy tytuł ${new Date().toLocaleString().replace(', ',' ')}`,
        description: `Testowy opis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
        imgs: formImgs,
        movies: Array.from({ length: 5 }, (_, i) => ({
            title: `Tytuł ${i+1}`,
            genre: 'Akcja, Sci-Fi, Komedia, Przygodowy, Thriller, Horror',
            year: 2000 + i,
            duration: `1h 30m`,
            link: "https://www.filmweb.pl/film/Powr%C3%B3t+do+przysz%C5%82o%C5%9Bci-1985-8823",
        }))
    }
    const seriesFormTestData = {
        title: `Testowy tytuł ${new Date().toLocaleString().replace(', ',' ')}`,
        genre: 'Akcja, Sci-Fi, Komedia, Przygodowy, Thriller, Horror',
        original_title: `Test title`,
        year: '2025',
        link: "https://www.filmweb.pl/film/Spider+Man%3A+Bez+drogi+do+domu-2021-850261",
        imgs: formImgs,
        episodes: Array.from({ length: 5 }, (_, i) => (["Odcinek 1","Odcinek 2","Odcinek 3","Odcinek 4","Odcinek 5","Odcinek 6",
            "Odcinek 7","Odcinek 8"]))
    }

    window.devtools = devTools

    return (
        <DevToolsContext.Provider value={{ setDevTools, movieFormTestData, filmSeriesFormTestData, seriesFormTestData }}>
            {children}
        </DevToolsContext.Provider>
    );
};

export const useDevTools = () => {
    return useContext(DevToolsContext);
};