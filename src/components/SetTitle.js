import { useEffect } from "react";

const SetTitle = (title) => {
    useEffect(() => {
        document.title = `${title ? title + " | " : ""}Filmy do obejrzenia`;
    },[])
}

export default SetTitle