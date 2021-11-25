import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import Link from "next/link";

import { data } from "../data";
import { GetStaticProps } from "next";

import styles from "/src/styles/reader.module.scss";

const Page = ({ book, sendPages, id }) => {

    const router = useRouter();

    const [page, setPage] = useState(router.query.page ? parseInt(router.query.page) : 0);
    const [pages, setPages] = useState(0);
    const [calculation, setCalculation] = useState(0);

    const [dragStart, setDragStart] = useState(null);
    const [dragCurrent, setDragCurrent] = useState(null);

    const pageRef = useRef()

    useEffect(() => {

        setPages(Math.floor(pageRef.current.scrollWidth / 800));
        const handleWheel = (event) => {
            event.preventDefault();

            if (event.deltaY > 0) {
                setPage(curr => {
                    console.log(curr, (Math.min(Math.floor(pageRef.current.scrollWidth / 800), curr + 1)))
                    return parseInt(Math.min(Math.floor(pageRef.current.scrollWidth / 800), curr + 1))
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
                setDragStart(event.offsetX);
            }
        }

        const handleDragMove = (event) => {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.target != event.currentTarget) {
                setDragCurrent(event.clientX - rect.left);
            } else {
                setDragCurrent(event.offsetX);
            }
        }

        const handleDragEnd = (event) => {
            setDragStart(null);
        }


        let pageContainer = document.getElementById("page-container")

        pageContainer.addEventListener('wheel', handleWheel, { passive: false });
        pageContainer.addEventListener('mousedown', handleDragStart, { passive: false });
        pageContainer.addEventListener('mousemove', handleDragMove, { passive: false });
        pageContainer.addEventListener('mouseup', handleDragEnd);

        return (() => {
            pageContainer.removeEventListener('wheel', handleWheel);
            pageContainer.removeEventListener('mousedown', handleDragStart);
            pageContainer.removeEventListener('mousemove', handleDragMove);
            pageContainer.removeEventListener('mouseup', handleDragEnd);
        });

    }, [])

    useEffect(() => {
        if (dragStart == null) {
            if (dragCurrent != null) {
                setDragCurrent(null);
                snapToPage();
            }
        }
    }, [dragStart])

    useEffect(() => {
        if (dragStart != null) {
            if (calculation >= -1 && calculation <= (pages * 800)) {
                setCalculation((page * 800) + (dragStart - dragCurrent))
            }
        }
    }, [dragCurrent])

    useEffect(() => {
        sendPages(pages)
    }, [pages])

    useEffect(() => {
        if (router.query.page != undefined) {
            if (page != router.query.page) {
                setPage(router.query.page);
            }
        }
    }, [router.query.page]);

    useEffect(() => {
        if (page != router.query.page) {
            if (page != undefined) {
                router.push(`/books/read/${id}/?page=${page}`, 0, { shallow: true })
            }
        }
        setCalculation(page * 800);
    }, [page])

    const snapToPage = () => {
        console.log("on release: ", calculation)
        let prevPage = Math.abs((800 * (page - 1)) - (calculation));
        let nextPage = Math.abs((800 * (page + 1)) - (calculation));
        let currPage = Math.abs((800 * (page)) - (calculation));

        console.log(prevPage, nextPage, currPage);
        let snapPage;
        if (currPage == Math.min(prevPage, nextPage, currPage)) {
            snapPage = page;
            setCalculation(snapPage * 800);
            return;
        }
        if (prevPage == Math.min(prevPage, nextPage, currPage)) {
            snapPage = page - 1;
        }
        if (nextPage == Math.min(prevPage, nextPage, currPage)) {
            snapPage = page + 1;
        }
        console.log("snapping to ", snapPage,  (snapPage * 800))
        if ((snapPage >= 0) && (snapPage < (pages + 1))) {
            setPage(parseInt(snapPage));
        }
    }

    return(
        <div className={styles["reader-page"]} ref={pageRef} style={{
            left: `-${calculation}px`,
            transition: dragStart != null ? "none" : "0.3s ease-in-out"
        }}>
            {book.content.split("\n").map((paragraph, i) => {
                return(
                    <p draggable={true} className={styles["reader-paragraph"]} key={`reader-paragraph-${i}`}>
                        {paragraph}
                    </p>
                )
            })}
        </div>
    )
}

const PageContainer = ({ book, sendPages, id }) => {
    return (
        <div draggable={true} id="page-container" className={styles["reader-page-container"]}>
            <Page book={book} id={id} sendPages={sendPages} />
        </div>
    )
}

export default function Reader({ book, id }) {
    const router = useRouter();
    const [pages, setPages] = useState(0)

    const sendPages = (pages) => {
        setPages(pages)
    }

    return(
        <div className={styles.reader}>
            <div className={styles["reader-header"]}>
                <Link href="/">
                    <div style={{
                        padding: "0.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "solid 1px #ccc",
                        borderRadius: "50%",
                        cursor: "pointer"
                    }}>
                        <img src="/assets/logo.png" width="40" height="40" alt="logo" />
                    </div>
                </Link>
                <div className={styles["reader-header-column"]} >
                    {book.title} - Page: {router.query.page == 0 || router.query.page == undefined ? 0 : router.query.page} / {pages}
                </div>
                <div className={styles["reader-header-column"]} >
                </div>
                <div className={styles["reader-header-column"]} >
                    <div className="button1">
                        Account
                    </div>
                </div>
            </div>
            <div className={styles["reader-content"]}>
                <div className={styles["reader-container"]}>
                    <PageContainer book={book} id={id} sendPages={sendPages} />
                </div>
            </div>
        </div>
    )
}