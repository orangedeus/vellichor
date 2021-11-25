import { useEffect, useState } from "react";
import DropdownButton from "./DropdownButton";


export default function Header() {

    const [navBarClass, setNavBarClass] = useState("nav-bar")

    useEffect(() => {

        function handleScroll(_event) {
            let navBar = document.getElementsByClassName('nav-bar')[0];

            if (window.scrollY > navBar.offsetTop) {
                setNavBarClass("nav-bar sticky")
            } else {
                setNavBarClass("nav-bar")
            }

        }

        window.addEventListener('scroll', handleScroll);

        return(() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    return(
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
                    <DropdownButton label="Browse">
                        Test
                    </DropdownButton>
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
    )
}