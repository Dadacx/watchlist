import { useEffect } from "react";

const SetTitle = (title,dependecy) => {
    useEffect(() => {
        document.title = title;
    },[dependecy])
}

export default SetTitle