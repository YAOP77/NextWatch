import { Bookmark } from 'lucide-react';
import { House } from 'lucide-react';
import { Film } from 'lucide-react';
import { ClockFading } from 'lucide-react';
import { useLocation, Link } from "react-router-dom";
// import { FolderHeart } from 'lucide-react';

const UserSidebare = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="hidden md:block z-20
         bg-black fixed top-0 left-0 w-48 text-white h-screen">
            <ul className="flex flex-col items-start gap-6 px-4 text-center p-2">
                <div className="mb-9 mt-3">
                    <h1 className="font-extralight text-red-800 text-2xl flex">Next <span className='bg-red-800 text-white font-bold mask-linear-from-red-800'>Watch</span></h1>
                </div>
                {/* Accueil */}
                <li className="flex gap-2 items-center cursor-pointer hover:opacity-60 duration-60">
                    <Link to="/movies">
                    <House
                        size={25}
                        color={isActive("/movies") ? "#ffff" : "#7777"}
                        strokeWidth={1.75}
                    />
                    </Link>
                    {/* <p className="text-sm">Home</p> */}
                </li>
                {/* Les films plus aimés */}
                <li className="flex gap-2 items-center cursor-pointer hover:opacity-60 duration-60">
                    <Link to="/movies/premium">
                        <Film
                            size={25}
                            color={isActive("/movies/premium") ? "#ffff" : "#7777"}
                            strokeWidth={1.75}
                        />
                        </Link>
                    {/* <p className="text-sm">Likes</p> */}
                </li>
                {/* À regarder plus-tard */}
                <li className="flex gap-2 items-center cursor-pointer hover:opacity-60 duration-60">
                    <Link to="/watch-later">
                        <ClockFading
                            size={25}
                            color={isActive("/watch-later") ? "#ffff" : "#7777"}
                            strokeWidth={1.75}
                        />
                    </Link>
                    {/* <p className="text-sm">Plus-tard</p> */}
                </li>
                {/* Favoris */}
                <li className="flex gap-2 items-center cursor-pointer hover:opacity-60 duration-60">
                    <Link to="/favoris">
                        <Bookmark
                            size={25}
                            color={isActive("/favoris") ? "#ffff" : "#7777"}
                            strokeWidth={1.75}
                        />
                    </Link>
                    {/* <p className="text-sm">Favoris</p> */}
                </li>
            </ul>
        </aside>
    )
}

export default UserSidebare;