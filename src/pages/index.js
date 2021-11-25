import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Carousel from "../components/Carousel";

const Index = (props) => {


    return(
        <>
            <Head>
                <title>Vellichor</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Jua&family=Public+Sans&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="index-page">
                <Header />
                <div className="landing-banner">
                    <div className="landing-section">
                        <div className="landing-header">
                            Featured.
                        </div>
                        <Carousel>
                            <div className="book-feature">
                                <div className="book-cover">
                                    test
                                </div>
                                <div className="book-details">
                                    rwar
                                </div>
                            </div>
                            <div className="book-feature">
                                <div className="book-cover">
                                    test
                                </div>
                                <div className="book-details">
                                    rwar
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className="landing-banner">
                    
                </div>
            </div>
        </>
    );
}

export default Index;