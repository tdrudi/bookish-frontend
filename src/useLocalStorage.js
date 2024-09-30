import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
    const initialVal = localStorage.getItem(key) || firstValue;
    const [item, setItem] = useState(initialVal);

    useEffect(
        function setKey() {
            if (item === null)
                localStorage.removeItem(key);
            else {
                localStorage.setItem(key, item);
            }
        }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;