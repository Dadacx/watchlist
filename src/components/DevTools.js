import { useEffect } from 'react';

const DevTools = ({ data, setData, favoriteData, setFavoriteData, error, setError }) => {
    useEffect(() => {
        let devtools = { data: data, setData: setData, favoriteData: favoriteData, setFavoriteData: setFavoriteData,
            error: error, setError: setError };
        window.devtools = devtools;
        return () => {
            delete window.devtools;
        };
    }, [data,favoriteData]);
}

export default DevTools;