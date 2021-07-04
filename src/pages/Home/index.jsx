import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from '../../config'
import CardMovie from '../../components/CardMovie';
import Modal from '../../components/Modal';

export default function Index() {

    const [popularMovie, setPopularMovie] = useState({
        data : [],
        page : 1
    })
    const [upcomingMovie, setUpcomingMovie] = useState([])

    const [modal, setModal] = useState(false)

    const [urlTrailer, setUrlTrailer] = useState()

    const getMovie = async(page)=>{
        axios.get(`${config.BASE_URL}/now_playing?api_key=${config.API_KEY}&page=${page}`)
        .then(res => {
            setPopularMovie({
                page : res.data.page,
                data : popularMovie.data.concat(res.data.results.filter((e)=>e.poster_path !== null))
            })
        }) 
    }

    const getMovieTR = async()=>{
        axios.get(`${config.BASE_URL}/popular?api_key=${config.API_KEY}&page=${Math.floor(Math.random() * (400 - 1 + 1) + 1)}`)
        .then(res => {
            setUpcomingMovie(res.data.results.filter((e)=>e.backdrop_path !== null))
        }) 
    }

    const showTrailer = async(id)=>{
        axios.get(`${config.BASE_URL}/${id}/videos?api_key=${config.API_KEY}`)
        .then(res => {
            if (res.data.results.length > 0) {
                setUrlTrailer(res.data.results[0].key)
                setModal(true)
            }
        })
    }

    useEffect(() => {
        (async function() {
            await getMovie()
            await getMovieTR()
        })();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    var slider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,

    };

    return (
        <div className="overflow-x-hidden">
            <Slider {...slider}>
                {
                    upcomingMovie.map((e,i)=>{
                        return(
                            <div className="h-screen relative ">
                                <div className="w-full h-full relative">
                                    <div style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${e.backdrop_path}")`}} className="w-full h-full bg-cover bg-center" />
                                    <div className="absolute inset-0 w-full h-full bg-main opacity-40"></div>
                                </div>
                                <div className="flex flex-col justify-center absolute inset-0 z-10 container mx-auto px-10 lg:px-4">
                                    <h1 className="text-5xl lg:text-7xl font-bold text-white">{e.title}</h1>
                                <div className="flex items-center space-x-5 py-2 ">
                                    <div className="flex items-center space-x-2 py-1">
                                        <h1 className="text-gray-200 mt-1 font-semibold">{e.vote_average}</h1>
                                        <StarRatings
                                            starDimension="20px"
                                            rating={(e.vote_average * 5)/10}
                                            starRatedColor="orange"
                                            numberOfStars={5}
                                            starSpacing="2px"
                                            name='rating'
                                        />
                                    </div>
                                </div>
                                    <p className="text-gray-200 text-lg lg:text-xl lg:max-w-4xl">{e.overview}</p>
                                    <div>
                                        <button onClick={()=>{showTrailer(e.id)}} className="focus:outline-none px-4 py-2 mt-6 bg-indigo-800 hover:bg-opacity-80 rounded-lg text-white flex items-center justify-center space-x-2 w-32 shadow-lg">
                                            <FaPlay/>
                                            <h1>Trailer</h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
            
            <Modal show={modal} close={()=>{setModal(false)}} url={urlTrailer} />
            
            <div className="min-h-screen bg-main -mt-2">
                <div className="container mx-auto py-24 px-8 lg:px-4">
                    <h1 className="text-3xl text-gray-300 font-semibold">Now Playing</h1>
                    <InfiniteScroll pageStart={1} loadMore={(e)=>getMovie(e)} hasMore={true} loader={<div className="loader" key={1}>Loading ...</div>} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-x-5 gap-y-10">

                        {
                            popularMovie.data.map((e,i)=>{
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
