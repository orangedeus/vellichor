import router from "next/router";
import React, { useState } from "react";
import Head from "next/head";

import Header from "/src/components/Header";
import { data } from "/src/data";

const Books = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    return(
        <>
            <Head>
                <title>Browse books at Vellichor</title>
            </Head>
            <div className="books">
                <Header />
                <div className="books-content">
                    <div className="books-search">
                        <input type="text"  onChange={handleSearch} className="search-box" />
                    </div>
                    <div className="books-show">
                        {data.books.map((book, i) => {
                            if (book.title.match(new RegExp(search, "gi"))) {
                                return(
                                    <div key={`book-card-${i}`} onClick={() => {router.push(`/books/${i}`)}} className="book-card">
                                        <div className="book-card-title">{book.title}</div>
                                        <div className="book-card-author">{book.author}</div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Books;