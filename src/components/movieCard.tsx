import React from 'react';
import { HiOutlineStar, HiStar } from "react-icons/hi";
import Tooltip from './toolTip';
import { useNavigate } from 'react-router';


interface movieCardProps {
    poster_path: string,
    original_title: string,
    vote_average: number,
    movie_id: string
}

const MovieCard: React.FC<movieCardProps> = ({ poster_path, original_title, vote_average, movie_id }) => {
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, movie_id: string) => {
        navigate(`/viewmovie/${movie_id}`);
        window.scrollTo({top:0,left:0,behavior:'smooth'});
    }
    return (
        <div className='w-full bg-white rounded-xl overflow-hidden group hover:bg-c1'>
            <div className='aspect-[2/3] relative overflow-hidden'>
                <img className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`${original_title}`} />
            </div>
            <div className='p-2 flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <span className='flex items-center gap-1 '>
                        <HiStar color='green' />{vote_average.toFixed(1)}
                    </span>
                    <span className='cursor-pointer'>
                        <Tooltip content='Add to Favorites'>
                            <HiOutlineStar />
                        </Tooltip>
                    </span>
                </div>
                <div className='h-10'>
                    <p className='text-base/[20px] font-medium line-clamp-2'>{original_title}</p>
                </div>

                {/* <p className='text-sm'>{item.overview}</p> */}
                <button onClick={(e) => handleClick(e, movie_id)} className='cursor-pointer hover:text-blue-600'>View More</button>
            </div>
        </div>
    )
}

export default MovieCard;