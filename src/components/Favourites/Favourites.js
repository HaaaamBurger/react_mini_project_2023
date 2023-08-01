import React, {useEffect, useState} from 'react';

import styles from './favourites.module.css'
import {NoFavourites} from "./NoFavourites";
import {FavMovie} from "./FavMovie/FavMovie";

const Favourites = () => {

    const [favMovies,setFavMovies] = useState([]);
    let getFavMovies = null;

    useEffect(() => {
        getFavMovies = JSON.parse(localStorage.getItem('favourites'));
        if (getFavMovies) {
            setFavMovies(getFavMovies);
        }
    },[getFavMovies]);

    return (
        <div>
            {
                favMovies.length ?
                    <div className={styles.favouritesWrapper}>
                        {favMovies && favMovies.map((movie,index) => <FavMovie movie={movie} key={index}/>)}
                        <button className={styles.clearButton} onClick={() => {
                            localStorage.removeItem('favourites');
                            setFavMovies([]);
                        }}>Clear</button>
                    </div> :
                        <NoFavourites/>
            }
        </div>
    );
};

export {
    Favourites,
};