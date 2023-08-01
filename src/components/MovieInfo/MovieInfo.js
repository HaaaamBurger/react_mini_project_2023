import React, {useEffect, useState} from 'react';

import styles from './movieInfo.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {axiosMovieServices} from "../../services";
import {Rating} from "react-simple-star-rating";

const MovieInfo = () => {
    const pageId = JSON.parse(localStorage.getItem('pageId'));
    const navigation = useNavigate();
    const {id:movieId} = useParams();

    const [movie,setMovie] = useState(null);
    const [rating, setRating] = useState('Your rate');
    const [pageTrigger,setPageTrigger] = useState(null);

    useEffect(() => {
        axiosMovieServices.getAll(movieId).then(({data}) => {
            setMovie({...data,pageId: pageId})
        });
    },[pageTrigger])


    let localRate = JSON.parse(localStorage.getItem('rate')) || [];
    const findRatedFilm = localRate.find(rate => rate.id === movieId);

    useEffect(() => {
        if (findRatedFilm) {
            switch (findRatedFilm.rate) {
                case 1: {
                    setRating('Terrible');
                    return;
                }
                case 2: {
                    setRating('Bad');
                    return;
                }
                case 3: {
                    setRating('Good');
                    return;
                }
                case 4: {
                    setRating('Great');
                    return;
                }
                case 5: {
                    setRating('Awesome');
                    return;
                }
            }
        }
    },[])

    const handleRating = (rate) => {
        if (findRatedFilm) {
            localRate.find(rateObject => rateObject.id === movieId ? rateObject.rate = rate : null);
            localStorage.setItem('rate',JSON.stringify(localRate));
        } else {
            localRate.push({rate: rate,id: movieId});
            localStorage.setItem('rate',JSON.stringify(localRate));
        }

        switch (rate) {
            case 1: {
                setRating('Terrible');
                return;
            }
            case 2: {
                setRating('Bad');
                return;
            }
            case 3: {
                setRating('Good');
                return;
            }
            case 4: {
                setRating('Great');
                return;
            }
            case 5: {
                setRating('Awesome');
                return;
            }
        }
    }

    const getFavouriteMovie = JSON.parse(localStorage.getItem('favourites')) || [];
    const currentMovie = getFavouriteMovie.find(favMovie => favMovie.id === +movieId);

    const addToFavourites = () => {
        let getFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const getMovie = getFavourites.find(favMovie => favMovie.id === +movieId) || null;
        if (!getMovie) {
            getFavourites.push(movie);
            localStorage.setItem('favourites',JSON.stringify(getFavourites));
        }
    }

    const deleteFromFavourites = () => {
        const newFavourites = getFavouriteMovie.filter(favMovie => favMovie.id !== +movieId);
        localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }

    return (
        <div>
            {movie &&
                <div className={styles.infoWrapper}>
                    <div className={styles.moviePosterWrapper}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt=""/>
                    </div>
                    <div className={styles.movieInfoWrapper}>
                        <div>
                            <h1>{movie.title}</h1>
                        </div>

                        <hr/>

                        <div className={styles.detailInfo}>
                            <h3>⭐{movie.vote_average} | {movie.vote_count}</h3>
                            <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m ・ {movie.genres.map(genre => genre.name + ', ')} ・{movie.release_date.split('-')[0]} ・ {movie.status}</p>
                        </div>
                        <hr/>

                        <div>
                            <h3>{movie.tagline}</h3>
                        </div>
                        <div className={styles.overView}>
                            <p>{movie.overview}</p>
                        </div>

                        <div className={styles.starsRating}>
                            <Rating  onClick={handleRating} initialValue={findRatedFilm?.rate}/>
                            <div><h3>{rating}</h3></div>
                        </div>

                        <div className={styles}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" className={styles.backdropWrapper}/>
                        </div>

                        <div className={styles.favWrapper}>
                            { !currentMovie ? <h3 onClick={() => {
                                addToFavourites();
                                setPageTrigger(prevState => !prevState);
                            }}>Add to Favourites</h3> : <h3 onClick={() => {
                                deleteFromFavourites();
                                setPageTrigger(prevState => !prevState);
                            }}>Delete from Favourites</h3>}

                        </div>

                    </div>

                        <div className={styles.backButton} onClick={() => {
                            navigation(`/page/${pageId}`);
                            localStorage.removeItem('pageId');
                        }}>Back</div>
                </div>}
        </div>
    );
};

export {
    MovieInfo,
};