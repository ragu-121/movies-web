'use client'

import { useEffect, useState } from 'react';
import { HiChevronRight, HiStar, HiOutlineStar } from "react-icons/hi";
import { ApiServices } from '../services/apiServices';
import Carousel from './carousel';
import MovieCard from './movieCard';

interface movieListProps{
    url:string,
    heading:string,
}


function moviesListsComp({url,heading}:movieListProps) {
    const [data, setData] = useState<any>({});
    const [error, setError] = useState('');

    const fetchDatas = async () => {
        await ApiServices.get(`${url}`).then((data) => setData(data.results)).catch((error) => {setError(error);throw new Error(`Unable fetch datas in ${heading}`)});
    }

    useEffect(() => {
        fetchDatas();
    }, [])

    const slides = data.length > 0 ? data.map((item: any, index: number) => (
        <MovieCard key={index} poster_path={item.poster_path} original_title={item.original_title} vote_average={item.vote_average} movie_id={item.id} />
    )) : []

    return <div className="width-full">
        <h4 className='group headingh4'>{heading} <HiChevronRight className='group-hover:ml-1 transition-all duration-200' /></h4>
        <div className=''>
            {
                Object.keys(data).length > 0 ? (
                    <Carousel slides={slides} />
                ) : <p className='text-center'>Fetching...</p>
            }

        </div>
    </div>
}

export default moviesListsComp;