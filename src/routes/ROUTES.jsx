import MainPage from "../pages/MainPage.jsx";
import Home from "../pages/Home/index.jsx";
import Portfolio from "../pages/Portfolio/index.jsx";
import ServiceDetails from "../pages/ServiceDetails/index.jsx";
import AdminPanel from "../pages/AdminPanel/index.jsx";
import AdminLogin from "../pages/AdminLogin/index.jsx";
import PortfolioDetails from "../pages/PortfolioDetails/index.jsx";
import ProductsPage from "../pages/Products/index.jsx";
import About from "../pages/About/index.jsx";
import Contact from "../pages/Contact/index.jsx";
import ErrorPage from "../pages/ErrorPage/index.jsx";
import {ProtectedRoute} from "../auth/ProtectedRoute/index.jsx";

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
                path: '/products',
                element: <ProductsPage/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/contact',
                element: <Contact/>
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
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '/cp/dashboard/services',
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '/cp/dashboard/brands',
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '/cp/dashboard/categories',
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '/cp/dashboard/banners',
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '/cp/dashboard/orders',
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '/cp/dashboard/portfolios',
                element: <ProtectedRoute><AdminPanel/></ProtectedRoute>
            },
            {
                path: '*',
                element: <ErrorPage/>
            },
        ]
    }
];