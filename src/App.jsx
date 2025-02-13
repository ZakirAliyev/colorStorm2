import './App.css';
import {createBrowserRouter} from "react-router";
import {ROUTES} from "./routes/ROUTES.jsx";
import {RouterProvider} from "react-router-dom";
import Cookies from 'js-cookie';
import {HelmetProvider} from "react-helmet-async";
import i18n from "i18next";

function App() {
    const routes = createBrowserRouter(ROUTES);

    const setDefaultCookie = (cookieName, defaultValue) => {
        if (!Cookies.get(cookieName)) {
            Cookies.set(cookieName, defaultValue, {expires: 365});
        }
    };

    setDefaultCookie("colorStormToken", "null");
    setDefaultCookie("colorStormRole", "null");

    const lang = Cookies.get("colorStormLang") || "en";
    i18n.changeLanguage(lang);
    setDefaultCookie("colorStormLang", lang);

    return (
        <HelmetProvider>
            <RouterProvider router={routes}/>
        </HelmetProvider>
    );
}

export default App;
