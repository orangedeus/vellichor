import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import Link from "next/link";

import { data } from "../data";
import { GetStaticProps } from "next";

import styles from "/src/styles/reader.module.scss";

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

const Page = ({ book, pageRef, calculation, dragStart, fontSize }) => {

    return(
        <div className={styles["reader-page"]} ref={pageRef} style={{
            left: `-${calculation}px`,
            transition: dragStart != null ? "none" : "0.3s ease-in-out",
            textOverflow: "ellipsis",
            fontSize: `${fontSize}px`
        }}>
            {book.content.split("\n").map((paragraph, i) => {
                return(
                    <p className={styles["reader-paragraph"]} key={`reader-paragraph-${i}`}>
                        {paragraph}
                    </p>
                )
            })}
        </div>
    )
}

const PageContainer = ({ book, width, sendPages, id, fontSize, keepNav }) => {

    const router = useRouter();

    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [calculation, setCalculation] = useState(0);

    const [dragStart, setDragStart] = useState(null);
    const [dragCurrent, setDragCurrent] = useState(null);

    const [showNavigator, setShowNav] = useState(false);

    const pageRef = useRef()
    const pageContainerRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            setPages(Math.floor(pageRef.current.scrollWidth / width));
        }, 500)
        snapToPage();
    }, [fontSize]);

    useEffect(() => {
        snapToPage();
    }, [width])

    useEffect(() => {
        setPages(Math.floor(pageRef.current.scrollWidth / width));
        keepWithinBounds();

        let containerRef = pageContainerRef.current;

        containerRef.addEventListener('wheel', handleWheel, {passive: false});

        return(() => {
            containerRef.removeEventListener('wheel', handleWheel)
        })
    });

    useEffect(() => {
        setPages(Math.floor(pageRef.current.scrollWidth / width));
        setPage(router.query.page ? parseInt(router.query.page) : page)
    }, []);

    useEffect(() => {
        if (dragStart == null) {
            if (dragCurrent != null) {
                setDragCurrent(null);
                snapToPage();
            }
        }
    }, [dragStart])


    useEffect(() => {
        sendPages(pages);
    }, [pages])

    const keepWithinBounds = () => {

        if (pages == 0) {
            console.log("Pages equal to zero ", pages)
            return;
        }

        if ((page <= pages) && (page >= 0)) {
            return;
        }
        if (page > pages) {
            console.log("Setting to pages ", pages);
            setPage(pages);
        }

        if (page < 0) {
            console.log("Setting this to zero")
            setPage(0);
        }
    }

    useEffect(() => {
        if (dragStart != null) {
            if (calculation >= -1 && calculation <= (pages * width)) {
                setCalculation((page * width) + (dragStart - dragCurrent))
            }
        }
    }, [dragCurrent])

    useEffect(() => {
        if (pages != 0) {
            if (page != router.query.page) {
                router.push(`/books/read/${id}/?page=${page}`, 0, { shallow: true })
            }
        }
        setCalculation(page * width);
        keepWithinBounds();
    }, [page])

    const snapToPage = () => {

        if (pages == 0) {
            return;
        }

        let prevPage = Math.abs((width * (page - 1)) - (calculation));
        let nextPage = Math.abs((width * (page + 1)) - (calculation));
        let currPage = Math.abs((width * (page)) - (calculation));

        let snapPage;
        if (currPage == Math.min(prevPage, nextPage, currPage)) {
            snapPage = page;
            setCalculation(snapPage * width);
            return;
        }
        if (prevPage == Math.min(prevPage, nextPage, currPage)) {
            snapPage = page - 1;
        }
        if (nextPage == Math.min(prevPage, nextPage, currPage)) {
            snapPage = page + 1;
        }
        if ((snapPage >= 0) && (snapPage < (pages + 1))) {
            setPage(parseInt(snapPage));
        }
    }

    const handleWheel = (event) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            setPage(curr => {
                return parseInt(Math.min(Math.floor(pageRef.current.scrollWidth / width), curr + 1))
            })
        } else {
            setPage(curr => (parseInt(Math.max(0, curr - 1))))
        }
    }

    const handleDragStart = (event) => {
        event.preventDefault();
        let rect = event.currentTarget.getBoundingClientRect();
        if (event.target != event.currentTarget) {
            setDragStart(event.clientX - rect.left);
        } else {
            setDragStart(event.clientX - rect.left);
        }
    }

    const handleDragMove = (event) => {
        let rect = event.currentTarget.getBoundingClientRect();
        if (dragStart != null) {
            setDragCurrent(event.clientX - rect.left);
        }
    }

    const handleDragEnd = (event) => {
        setDragStart(null);
    }

    const handleHover = () => {
        setShowNav((curr) => (!curr))
    }

    const handleScrollChange = (event) => {
        setPage(event.target.value);
    }

    const handlePageMove = (newValue) => {
        if ((newValue < 0) || (newValue > pages)) {
            return;
        }
        setPage(newValue)
    }

    return (
        <>
            <div draggable={true} ref={pageContainerRef} style={{
                width: `${width}px`,
            }} onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd} id="page-container" className={styles["reader-page-container"]}>
                <Page fontSize={fontSize} book={book} id={id} pageRef={pageRef} dragStart={dragStart} calculation={calculation} />
            </div>
            <div className={styles["reader-navigator"]} onMouseEnter={handleHover} onMouseLeave={handleHover} style={{ opacity: (keepNav ? true : showNavigator) ? 1 : 0 }}>
                <div className={`${styles["reader-nav-arrow"]} ${styles["left"]}`} onClick={() => { handlePageMove(page - 1) }} />
                <input id="scroll-nav" onChange={handleScrollChange} className={styles["reader-scroll"]} type="range" value={page} min={0} max={pages} />
                <div className={`${styles["reader-nav-arrow"]} ${styles["right"]}`} onClick={() => { handlePageMove(page + 1) }} />
            </div>
        </>
    )
}

export default function Reader({ book, id, getPages, fontSize, keepNav }) {
    const router = useRouter();

    const { width, height } = useWindowDimensions()

    return(
        <div className={styles.reader}>
            <div className={styles["reader-content"]}>
                <div className={styles["reader-container"]}>
                    <PageContainer fontSize={fontSize} keepNav={keepNav} width={width == null || width > 800 ? 700 : width - 50} book={book} id={id} sendPages={getPages} />
                </div>
            </div>
        </div>
    )
}