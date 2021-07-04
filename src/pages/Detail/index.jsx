import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import config from '../../config';
import StarRatings from 'react-star-ratings';
import { FaPlay } from "react-icons/fa";
import CardMovie from '../../components/CardMovie';
import InfiniteScroll from 'react-infinite-scroller'; 
import Modal from '../../components/Modal';

export default function Index() {
    
    let { id } = useParams();

    const [movie, setMovie] = useState([])
    const [movieSimilar, setMovieSimilar] = useState({
        data : [],
        page : 1
    })

    const [modal, setModal] = useState(false)
    const [urlTrailer, setUrlTrailer] = useState()
    const showTrailer = async(id)=>{
        axios.get(`${config.BASE_URL}/${id}/videos?api_key=${config.API_KEY}`)
        .then(res => {
            if (res.data.results.length > 0) {
                setUrlTrailer(res.data.results[0].key)
                setModal(true)
            }
        })
    }

    const getMovie = async()=>{
        axios.get(`${config.BASE_URL}/${id}?api_key=${config.API_KEY}`)
        .then(res => {
            setMovie(res.data)
        }) 
    }
    const getMovieSimilar = async(page)=>{
        axios.get(`${config.BASE_URL}/${id}/similar?api_key=${config.API_KEY}&page=${page}`)
        .then(res => {
            if (page === 1 ) {
                setMovieSimilar({
                    page : res.data.page,
                    data : res.data.results.filter((e)=>e.poster_path !== null)
                })
                window.scrollTo(0, 0)
            }else{
                setMovieSimilar({
                    page : res.data.page,
                    data : movieSimilar.data.concat(res.data.results.filter((e)=>e.poster_path !== null))
                })
            }
        }) 
    }

    useEffect(() => {
        (async function() {
            await getMovie()
            await getMovieSimilar(1)
        })();
    },[id]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="overflow-x-hidden">
            <div className="h-screen relative">
                <div className="w-full h-full relative">
                    <div style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`}} className="w-full h-full bg-cover bg-center" />
                    <div className="absolute inset-0 w-full h-full bg-main opacity-40"></div>
                </div>
                <div className="flex flex-col justify-center absolute inset-0 z-10 container mx-auto px-8 lg:px-4">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white">{movie.title}</h1>
                <div className="flex items-center space-x-5 py-2">
                    <div className="flex items-center space-x-2 py-1">
                        <h1 className="text-gray-300 mt-1 font-semibold">{movie.vote_average}</h1>
                        <StarRatings
                            starDimension="20px"
                            rating={((movie.vote_average ? movie.vote_average : 0) * 5)/10}
                            starRatedColor="orange"
                            numberOfStars={5}
                            starSpacing="2px"
                            name='rating'
                        />
                    </div>
                </div>
                    <p className="text-gray-200 text-lg lg:text-xl lg:max-w-4xl">{movie.overview}</p>
                    <div>
                        <button onClick={()=>{showTrailer(movie.id)}} className="focus:outline-none px-4 py-2 mt-6 bg-indigo-800 hover:bg-opacity-80 rounded-lg text-white flex items-center justify-center space-x-2 w-32 shadow-lg">
                            <FaPlay/>
                            <h1>Trailer</h1>
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={modal} close={()=>{setModal(false)}} url={urlTrailer} />

            <div className="min-h-screen bg-main -mt-2">
                <div className="container mx-auto py-24 px-8 lg:px-4">
                    <h1 className="text-3xl text-gray-300 font-semibold">Similar Movies</h1>
                        <InfiniteScroll pageStart={1} loadMore={(e)=>getMovieSimilar(e)} hasMore={true} loader={<div className="text-white" key={1}>Loading ...</div>} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-x-5 gap-y-10">

                            {
                                movieSimilar.data.map((e,i)=>{
                                    return(
                                        <CardMovie data={e} key={i} />
                                    )
                                })
                            }
                        </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}
