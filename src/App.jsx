import './App.css'
import {createBrowserRouter} from "react-router";
import {ROUTES} from "./routes/ROUTES.jsx";
import {RouterProvider} from "react-router-dom";
import Cookies from 'js-cookie'
import {HelmetProvider} from "react-helmet-async";

function App() {

    const routes = createBrowserRouter(ROUTES);

    const token = Cookies.get("colorStormToken");

    if (!token) {
        Cookies.set("colorStormToken", "null");
    }

    const role = Cookies.get("colorStormRole");

    if (!role) {
        Cookies.set("colorStormRole", "null");
    }

    return (
        <HelmetProvider>
            <RouterProvider router={routes}/>
        </HelmetProvider>
    )
}

export default App