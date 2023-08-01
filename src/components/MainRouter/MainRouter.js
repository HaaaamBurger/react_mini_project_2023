import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "../../layouts";
import {MovieInfo} from "../MovieInfo";
import {Main} from "../Main";
import {Movies} from "../Movies";
import {Favourites} from "../Favourites/Favourites";
import {NoFavourites} from "../Favourites/NoFavourites";

const router = createBrowserRouter([
    {
        path:'',
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <Main/>
            },
            {
                path: 'page/:page',
                element: <Movies/>
            },
            {
                path: 'page/:page/movie/:id',
                element: <MovieInfo/>
            },
            {
                path: 'favourites',
                element: <Favourites/>
            }
        ]
    }
])

export {router}