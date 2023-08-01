import React from 'react';

import styles from './favMovie.module.css';
import {useNavigate} from "react-router-dom";
const FavMovie = ({movie}) => {
    const navigation = useNavigate();
    return (
        <div className={styles.movieWrapper}>
            <div className={styles.imgWrapper} onClick={() => {
                navigation(`/page/${movie.pageId}/movie/${movie.id}`)
            }}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
            </div>
        </div>
    );
};

export {FavMovie};