import React, { useState } from "react";
import styles from "../styles/carousel.module.scss";


const CarouselNavigation = ({  }) => {

}

export default function Carousel({ children, className }) {

    const size = children.length;

    const [index, setIndex] = useState(0);

    const [showNav, setShowNav] = useState(false);

    const renderChildren = children.map((child) => {
        return (
            React.cloneElement(child, {
                className: `${child.props.className} ${styles["carousel-child"]}`
            })
        )
    })

    const handleHover = () => {
        setShowNav(curr => (!curr))
    }

    const handleMove = (i) => {
        if (i < 0 || i >= children.length) {
            return;
        }
        setIndex(i)
    }

    return(
        <div className={`${styles.carousel} ${className ? className : " "}`} onMouseEnter={handleHover} onMouseLeave={handleHover} >
            <div className={styles["carousel-nav-container"]} onClick={() => { handleMove(index-1) }} style={showNav ? {left: 5, opacity: 1, transition: "0.2s ease-in-out"} : {left: 5, opacity: 0, transition: "0.2s ease-in-out"}}>
                <div className={`${styles["carousel-nav-arrow"]} ${styles.left}`} />
            </div>
            {children[index]}
            <div className={styles["carousel-nav-container"]} onClick={() => { handleMove(index+1) }} style={showNav ? {right: 5, opacity: 1, transition: "0.2s ease-in-out"} : {right: 5, opacity: 0, transition: "0.2s ease-in-out"}}>
                <div className={`${styles["carousel-nav-arrow"]} ${styles.right}`} />
            </div>
        </div>
    )
}