import router from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import DropdownButton from "./DropdownButton";


export default function Header() {

    const [navBarClass, setNavBarClass] = useState("nav-bar")

    useEffect(() => {

        function handleScroll(_event) {
            let navBar = document.getElementsByClassName('nav-bar')[0];

            if (window.scrollY > navBar.offsetTop) {
                setNavBarClass("nav-bar sticky");
            } else {
                setNavBarClass("nav-bar");
            }

        }

        window.addEventListener('scroll', handleScroll);

        return(() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    return(
        <>
            <Head>
                <title>Browse books at Vellichor</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Jua&family=Public+Sans&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="header">
                <div className={navBarClass}>
                    <div className="nav-bar-column" >
                        <a href="/" className="logo">
                            <img className="logo-img" src="/assets/logo.png" alt="logo" />
                            <span className="logo-text">
                                ellichor
                            </span>
                        </a>
                    </div>
                    <div className="nav-bar-column">
                        <button onClick={() => { router.push("/books") }} className="nav-button">
                            Browse
                        </button>
                        <DropdownButton label="Discuss">
                            Test
                        </DropdownButton>
                    </div>
                    <div className="nav-bar-column">
                        <div className="button1-container">
                            <div className="button1">
                                Account
                            </div>
                        </div>
                    </div>
                </div>
                <div className=".nav-dummy" style={navBarClass == "nav-bar sticky" ? { height: "82px" } : null} />
            </div>
        </>
    )
}