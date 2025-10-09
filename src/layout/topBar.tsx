import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiOutlineSearch, HiMenu,HiOutlineX } from "react-icons/hi";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ApiServices } from "../services/apiServices";
import { useNavigate,useLocation } from "react-router";
import movie_icon from '../assets/movie_icon.png';
import { Link } from "react-router";

const TopBar = () => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [mobileMenu,setMobileMenu] = useState(true);
    const navigate = useNavigate();

    const handleClick = (movie_id: string, title: string) => {

        navigate(`/viewmovie/${movie_id}`)
        setSearch('');
        setSuggestions([]);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const fetchData = async () => {
        await ApiServices.get(`/search/movie?query=${search}&language=en-US&page=1`)
            .then((data) => setSuggestions(data.results))
            .catch((err) => { console.log("error", err) });
    }

    useEffect(() => {
        fetchData();
    }, [debouncedValue]);

    const getReleaseYear = (release_date: string): string => {
        return release_date ? release_date.slice(0, 4) : 'Not Available';
    }

    // debounce
    useEffect(() => {
        // Clear any existing timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Set new debounce timeout
        debounceRef.current = setTimeout(() => {
            setDebouncedValue(search); // Update debounced value
        }, 300); // 500ms delay

        // Cleanup timeout on unmount or input change
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search]);

    const handleMenu = ()=>{
        setMobileMenu(!mobileMenu);
    }

    
    
    return (
        <header className="containerwrapper h-[60px] bg-c5 sticky top-0 z-10">
            <div className="maincontainer flex items-center justify-between gap-4 h-full relative">
                {/* lefts */}
                <div className="inline-flex items-center gap-4">
                    <span className=''>
                        <Link to={'/'}>LOGO</Link>
                    </span>
                    <span className="inline-flex items-center gap-1 cursor-pointer"><HiMenu />Menu</span>
                </div>

                {/* center */}
                <div className={`absolute grow items-center border rounded-4xl border-bordercolor px-1.5 h-[40px] bg-white w-full z-10 md:relative md:max-w-xl md:mx-auto  focus-within:border-c3 focus:shadow-inputs hover:border-c3 ${mobileMenu ? 'inline-flex' : 'hidden'}`}>
                    <HiOutlineSearch className="w-4" />
                    <input onChange={handleChange} className="outline-none pl-1 grow" type="text" value={search} />
                    <HiOutlineX className="w-4 md:hidden" onClick={handleMenu} />
                    {
                        search.trim().length > 0 && <div className="fixed bg-c5 top-[60px] w-full md:w-xl py-2 left-[50%] -translate-x-[50%] max-h-80 overflow-y-auto z-9 md:bg-c1 md:rounded-lg md:absolute md:top-12">
                            {
                                suggestions.map((item: any, index: number) => (
                                    <div key={index} className="flex gap-2 py-1 cursor-pointer hover:bg-gray-500 hover:text-white px-4" onClick={() => handleClick(item.id, item.title)}>
                                        <div className="w-10 h-10 rounded-md relative overflow-hidden shrink-0">
                                            <img src={`${item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : movie_icon} `} alt="img" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-normal block">{item.title}</span>
                                            <span className="text-xs font-medium">{getReleaseYear(item.release_date)}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>

                {/* rights */}
                <div className="inline-flex items-center gap-4">
                    <span className="md:hidden" onClick={handleMenu}><HiOutlineSearch /></span>
                    <span className="inline-flex items-center gap-1 cursor-pointer"><MdOutlineAddToPhotos />WatchList</span>
                    <span className="whitespace-nowrap"><button>Sign In</button></span>
                </div>

            </div>
        </header>
    )
}

export default TopBar