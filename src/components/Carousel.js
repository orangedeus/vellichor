import React, { useEffect, useState } from "react";
import styles from "../styles/carousel.module.scss";


const useInterval = (fn, t) => {
    useEffect(() => {

        const interval = setInterval(fn, t);

        return (() => {
            clearInterval(interval);
        });

    }, [t])
}

export default function Carousel({ children, duration, className }) {

    const size = children.length;

    const [index, setIndex] = useState(0);

    const [showNav, setShowNav] = useState(false);

    const interval = useInterval(() => {
        setIndex((curr) => ((curr + 1) % size))
    }, duration * 1000);

    console.log(interval)

    const handleHover = () => {
        setShowNav(curr => (!curr))
    }

    const carouselMove = () => {
        setIndex((curr) => ((curr + 1) % size))
    }

    const handleMove = (i) => {
        setIndex(i % size);
    }

    return(
        <div className={`${styles.carousel} ${className ? className : " "}`} onMouseEnter={handleHover} onMouseLeave={handleHover} >
            <div className={styles["carousel-nav-container"]} onClick={() => { console.log("clicking left"); handleMove(index-1) }} style={showNav ? {left: 5, opacity: 1, transition: "0.2s ease-in-out"} : {left: 5, opacity: 0, transition: "0.2s ease-in-out"}}>
                <div className={`${styles["carousel-nav-arrow"]} ${styles.left}`} />
            </div>
            <div className={styles["carousel-container"]} style={{
                transform: `translate(-${index * 100}%, -50%)`
            }}>
                {children}
            </div>
            <div className={styles["carousel-nav-container"]} onClick={() => { handleMove(index+1) }} style={showNav ? {right: 5, opacity: 1, transition: "0.2s ease-in-out"} : {right: 5, opacity: 0, transition: "0.2s ease-in-out"}}>
                <div className={`${styles["carousel-nav-arrow"]} ${styles.right}`} />
            </div>
        </div>
    )
}