import React from 'react'
import { FiInfo } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function CardMovie({data}) {
    return (
        <div>
            <div>
                <div className="relative rounded-lg overflow-hidden">
                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="" className="w-full h-full object-cover rounded-lg overflow-hidden" />
                    <div className="absolute top-8 right-0 bg-yellow-400 rounded-l-full w-10 text-right pr-1 text-yellow-600 font-bold">
                        <h1>{data.vote_average}</h1>
                    </div>
                    <div className="absolute inset-0 w-full h-full bg-main opacity-0 hover:opacity-100 transform transition bg-opacity-50 overflow-hidden flex flex-col items-center justify-center group">
                        <Link to={`/detail/${data.id}`} className="rounded-full w-1/2 py-2 bg-indigo-500 font-semibold text-indigo-900 transform transition  opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-1" >
                            <FiInfo className="mt-1"/>
                            <span>Detail</span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-white font-semibold text-xl mt-3">{data.title}</h1>
                    <p className="text-gray-400">{data.release_date.slice(0,4)}</p>
                </div>
                <p className="text-gray-500 line-clamp-3">{data.overview}</p>
            </div>
        </div>
    )
}
