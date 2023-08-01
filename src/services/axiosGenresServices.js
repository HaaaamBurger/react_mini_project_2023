import {apiServices} from "./apiServices";
import {links} from '../constants/baseURL';

const axiosGenresServices = {
    getAll: () => apiServices.get(links.genres)
}

export {axiosGenresServices};