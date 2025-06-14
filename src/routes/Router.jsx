import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Apps from "../pages/Apps";
import AppDetails from "../pages/AppDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import Loading from "../components/Loading";
import Reviews from "../pages/Reviews";
import Featured from "../pages/Featured";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: () => fetch('/data.json'),
                hydrateFallbackElement: <Loading />,
            },
            {
                path: "apps",
                element: <Apps />,
                loader: () => fetch('/data.json'),
                hydrateFallbackElement: <Loading />,
            },
            {
                path: "apps/:id",
                element: (
                    <PrivateRoute>
                        <AppDetails />
                    </PrivateRoute>
                ),
                loader: () => fetch('/data.json'),
                hydrateFallbackElement: <Loading />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: "reviews",
                element: <Reviews />,
            },
            {
                path: "featured",
                element: <Featured />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;