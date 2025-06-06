import React from 'react';
import {Outlet} from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/index.jsx";

function MainPage() {
    return (
        <>
            <ScrollToTop/>
            <Outlet/>
        </>
    );
}

export default MainPage;