import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const DevToolsContext = createContext();

export const DevToolsProvider = ({ children }) => {
    const [devTools, setDevTools] = useState({});
    // useEffect(() => {
    //     let devtools = { data: data, setData: setData, favoriteData: favoriteData, setFavoriteData: setFavoriteDataFunc,
    //         error: error, setError: setErrorFunc };
    //     window.devtools = devtools;
    //     return () => {
    //         delete window.devtools;
    //     };
    // }, [devTools]);
    window.devtools = devTools

    return (
        <DevToolsContext.Provider value={{ setDevTools }}>
            {children}
        </DevToolsContext.Provider>
    );
};

export const useDevTools = () => {
    return useContext(DevToolsContext);
};