import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/MovieDetail.css';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5ae507e6a9c7f350a24caea5487fd327`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Error fetching movie details:", err));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="movie-details">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="details">
                <h1>{movie.title}</h1>
                <p>⭐ {movie.vote_average}</p>
                <p>{movie.overview}</p>
                <p>
                    Genres: {movie.genres.map((g) => g.name).join(", ")}
                </p>
            </div>
        </div>
    );
}
