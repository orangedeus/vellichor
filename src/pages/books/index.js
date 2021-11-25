import React from "react";
import Header from "/src/components/Header";
import Reader from "/src/components/Reader";
import { data } from "/src/data";

const Books = () => {
    return(
        <>
            <Reader book={data.books[0]} />
        </>
    )
}

export default Books;