import {apiServices} from "./apiServices";
import {links} from "../constants/baseURL";

const axiosMovieServices = {
    getAll: (id) => apiServices.get(links.movie(id))
}

export {axiosMovieServices}