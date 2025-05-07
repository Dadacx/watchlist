import { useEffect } from 'react';

const DevTools = ({ data, setData, favoriteData, setFavoriteData, error, setError }) => {
    function getData() {
        return data;
    }
    function setDataFunc(newData) {
        console.log(newData);
        setData(newData);
        console.log("Zmieniono listę filmów na:", newData);
    }
    function getError() {
        return error;
    }
    function setErrorFunc(newError) {
        console.log(newError);
        setError(newError);
        console.log("Zmieniono listę filmów na:", newError);
    }
    function getFavoriteData() {
        return favoriteData;
    }
    function setFavoriteDataFunc(newData) {
        console.log(newData);
        setFavoriteData(newData);
        console.log("Zmieniono listę ulubionych filmów na:", newData);
    }
    useEffect(() => {
        let devtools = { getData: getData, setData: setDataFunc, getFavoriteData: getFavoriteData, setFavoriteData: setFavoriteDataFunc,
            getError: getError, setError: setErrorFunc };
        window.devtools = devtools;
        return () => {
            delete window.devtools;
        };
    }, [data,favoriteData]);
}

export default DevTools;