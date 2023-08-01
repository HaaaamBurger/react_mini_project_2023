import React from 'react';
import {useEffect, useState} from 'react';

import styles from './movies.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Movie} from './Movie/Movie';
import {axiosGenresServices, axiosMoviesServices} from "../../services";

const Movies = () => {
    const pageId = useParams();

    const navigation = useNavigate();

    const [movies,setMovies] = useState();
    const [page,setPage] = useState(+pageId.page);
    const [genres,setGenres] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
       navigation(`/page/${page}`);
    },[page]);

    useEffect(() => {
        axiosGenresServices.getAll().then(({data}) => setGenres(data.genres))
    },[]);

    useEffect(() => {
        axiosMoviesServices.getAll(page).then(({data}) => {
            setMovies(data.results);
            setAllMovies(data.results);
        });
    }, [page]);

    const pageHandleUp = () => {
        setPage(prevState => prevState !== 500 ? prevState + 1 : 500);
    }

    const pageHandleDown = () => {
        setPage(prevState => prevState !== 1 ? prevState - 1 : 1);
    }

    const {handleSubmit,
        register,
        reset,
        formState: {errors,isValid}
    } = useForm({
        mode: 'all'
    })

    const save = (value) => {
        setPage(+value.page);
        navigation(`/page/${value.page}`);
        reset();
    }

    const handleGenre = (event) => {
        const selectedGenreId = +event.target.value;
        if (selectedGenreId === 0) {
            setMovies(allMovies);
        } else {
            const moviesWithGenre = allMovies.filter((movie) => movie.genre_ids.includes(selectedGenreId));
            if (moviesWithGenre.length === 0) {
                alert('No movies with that genre!');
                event.target.value = 0;
                setMovies(allMovies);
            } else {
                setMovies(moviesWithGenre);
            }
        }
    };

    return (
            <div style={{paddingBottom: '50px',minWidth: '605px'}}>
                <div className={styles.pageSearchWrapper}>
                    <div className={styles.selectGenreInput}>
                        <select onChange={handleGenre}>
                            <option value={0}>None</option>
                            {genres.map((genre,index) => <option value={genre.id} key={index} {...register(`${genre.name}`)}>{genre.name}</option>)}
                        </select>
                    </div>
                    <form onSubmit={handleSubmit(save)} className={styles.searchForm}>
                        <div className={styles.pageSearchInput}>
                            <div>
                                <input type="number" placeholder={'type page '} {...register('page', {
                                    max:{
                                        value: 500,
                                        message:'Maximum 500 pages!'
                                    },
                                    min:{
                                        value: 1,
                                        message: 'Paging starts from first page!'
                                    },
                                    required: true
                                })}/>
                                <button disabled={!isValid}>Find</button>
                            </div>
                            <div className={styles.errorReport}>
                                {errors.page && <h4>{errors.page.message}</h4>}
                            </div>
                        </div>

                    </form>
                </div>

                <div  className={styles.moviesWrapper}>
                    {movies && movies.map((movie,index) => <Movie movie={movie} key={index} pageId={page}/>)}
                </div>

                <div className={styles.paginationWrapper}>
                    <button onClick={() => {
                        pageHandleDown();
                        navigation(`/page/${page}`);
                    }}>Back</button>
                    <div className={styles.pageCounter}>{page} of 500</div>
                    <button onClick={() => {
                        pageHandleUp();
                        navigation(`/page/${page}`);
                    }}>Next</button>
                </div>
            </div>
    )
};

export {
    Movies,
};