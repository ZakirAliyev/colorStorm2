import MainPage from "../pages/MainPage.jsx";
import Home from "../pages/Home/index.jsx";
import Portfolio from "../pages/Portfolio/index.jsx";
import ServiceDetails from "../pages/ServiceDetails/index.jsx";
import AdminPanel from "../pages/AdminPanel/index.jsx";
import AdminLogin from "../pages/AdminLogin/index.jsx";
import PortfolioDetails from "../pages/PortfolioDetails/index.jsx";

export const ROUTES = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/portfolio',
                element: <Portfolio/>
            },
            {
                path: '/services/:id',
                element: <ServiceDetails/>
            },
            {
                path: '/portfolio/:id',
                element: <PortfolioDetails/>
            },
            {
                path: '/cp',
                element: <AdminLogin/>
            },
            {
                path: '/cp/dashboard/products',
                element: <AdminPanel/>
            },
            {
                path: '/cp/dashboard/services',
                element: <AdminPanel/>
            },
            {
                path: '/cp/dashboard/brands',
                element: <AdminPanel/>
            },
            {
                path: '/cp/dashboard/categories',
                element: <AdminPanel/>
            },
            {
                path: '/cp/dashboard/banners',
                element: <AdminPanel/>
            },
            {
                path: '/cp/dashboard/orders',
                element: <AdminPanel/>
            }, {
                path: '/cp/dashboard/portfolios',
                element: <AdminPanel/>
            },
        ]
    }
];