import {apiServices} from "./apiServices";
import {links} from "../constants/baseURL";

const axiosMoviesServices = {
    getAll: (page) => apiServices.get(links.movies(page))
}

export {axiosMoviesServices}