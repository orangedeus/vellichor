import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "/src/components/Header";

import { data } from "/src/data";

const BookPage =  ({ book }) => {

    const router = useRouter();

    return(
        <>
            <Head>
                <title>{book.title}</title>
            </Head>
            <div className="book-page">
                <Header />
                <div className="book-page-content">
                    <div className="book-cover" style={{
                        transform: "scale(200%)"
                    }}>
                        <b>{book.title}</b> <br /> {book.author}
                    </div>
                    <div className="book-feature" style={{
                        transform: "scale(160%)",
                        textAlign: "left",
                        width: "20%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <span style={{ fontSize: "18px", fontFamily: "'Public Sans', sans-serif", fontWeight: "bold" }}>{book.title}</span> <br /> <span style={{fontFamily: "'Public Sans', sans-serif"}}>{book.synopsis}</span>
                        <div className="buttons-container" style={{ width: "300px" }}>
                            <div className="button1" onClick={() => {
                                router.push(`/books/${router.query.book_id}/read`);
                            }} style={{ margin: "0 0.5rem 0 0.5rem", fontSize: "12px", width: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                Read
                            </div>
                            <div className="button1" style={{ margin: "0 0.5rem 0 0.5rem", fontSize: "12px", width: "120px", padding: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                + Add to Library
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

BookPage.getInitialProps = async (ctx) => {
    let book = data.books[ctx.query.book_id];
    return { book: book }
  }

export default BookPage;