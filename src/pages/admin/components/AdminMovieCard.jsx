import { useNavigate } from "react-router-dom";

const AdminMoviesCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movies/${movie._id}`);
    }

    return (
        <div onClick={handleClick} className="curosor-pointer p-6 text-black h-90" >
            <img
                src={movie.thumbnailsUrl}
                alt={movie.title}
                className="w-full h-60 object-cover cursor-pointer rounded-lg border border-gray-400"
            />
            <div className="p-3">
                <h3 className="text-black">{movie.title}</h3>
            </div>
        </div>
    );
};

export default AdminMoviesCard;