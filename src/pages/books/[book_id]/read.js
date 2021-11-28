import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { data } from "/src/data";
import Reader from "/src/components/Reader";
import useWindowDimensions from "/src/windowDimensions";

const ReadBook = () => {
    const router = useRouter();

    const { width, height } = useWindowDimensions();

    const [pages, setPages] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);

    const [fontSize, setFontSize] = useState(19);

    const [keepNav, setKeepNav] = useState(width == null || width >= 768 ? false : true);

    useEffect(() => {
        if (width != null) {
            if (width <= 800) {
                if (fontSize > 17) {
                    setFontSize(12)
                }
            } else {
                if (fontSize < 19) {
                    setFontSize(19)
                }
            }
        }
    }, [width, height, fontSize])

    const getPages = (book_pages) => {
        setPages(book_pages);
    }

    const handleMenuOpen = () => {
        setMenuOpen((curr) => (!curr));
    }

    const handleFontChange = (event) => {
        setFontSize(event.target.value)
    }

    const handleKNChange = (event) => {
        setKeepNav((curr) => (!curr))
    }

    return(
        <>
            <Head>
                <title>
                    Reading{router.query.book_id ? ` ${data.books[router.query.book_id].title} ` : " "}at Vellichor
                </title>
            </Head>
            <div className="reader-header">
                <div className="reader-header-column" style={{
                    display: "flex",
                    justifyContent: "spaceBetween",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <button className="menu-button" onClick={handleMenuOpen}>
                        <img src="/assets/menu.png" width="25" height="25" alt="menu" />
                    </button>
                    <Link href="/">
                        <div style={{
                            padding: "0.5rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "solid 1px #ccc",
                            borderRadius: "1rem",
                            cursor: "pointer"
                        }}>
                            <img src="/assets/logo.png" width="40" height="40" alt="logo" />
                        </div>
                    </Link>
                </div>
                <div id="book-details" className="reader-header-column" >
                    {router.query.book_id ? data.books[router.query.book_id].title : "Loading Book"} {width == null || width >= 544 ? `- Page: ${router.query.page == 0 || router.query.page == undefined ? parseInt(1) : parseInt(router.query.page)} / ${pages + 1}` : ""}
                </div>
                <div id="book-buttons" className="reader-header-column" >
                    <div className="button1">
                        Account
                    </div>
                </div>
                {menuOpen ?
                    <div className="reader-setting">
                        <div className="setting-header">
                            Settings
                        </div>
                        <div className="menu-settings">
                            <div className="menu-settings-content">
                                <div className="menu-settings-section" style={{ flexDirection: "column" }}>
                                    <label htmlFor="font-size" style={{
                                        fontFamily: "'Public Sans', sans-serif",
                                        fontWeight: "lighter"
                                    }}>
                                        Font size
                                    </label>
                                    <input type="range" id="font-size" value={fontSize} min={width == null || width >= 768 ? 19 : 9} max={width == null || width >= 768 ? 22 : 17} onChange={handleFontChange} />
                                </div>
                                <div className="menu-settings-section">
                                    <input type="checkbox" id="keep-nav" checked={keepNav} value={keepNav} onChange={handleKNChange} />
                                    <label htmlFor="keep-nav" style={{
                                        fontFamily: "'Public Sans', sans-serif",
                                        fontWeight: "lighter"
                                    }}>
                                        Keep navigator
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="menu-blanket" onClick= {handleMenuOpen} />
                    </div>
                    :
                    null
                }
            </div>
            {router.query.book_id ? <Reader id={router.query.book_id} book={data.books[router.query.book_id]} fontSize={fontSize} keepNav={keepNav} getPages={getPages} /> : null}
        </>
    )
}

export default ReadBook;