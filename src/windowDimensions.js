import React, { useState, useEffect } from "react";

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({ width: null, height: null });

    useEffect(() => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => {
            setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        }

        window.addEventListener('resize', handleResize);

        return (() => {
            window.removeEventListener('resize', handleResize);
        });
    }, [])

    return windowDimensions;
}

export default useWindowDimensions;