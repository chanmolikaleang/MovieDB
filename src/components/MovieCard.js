import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <h4>{movie.title}</h4>
            <p>⭐ {movie.vote_average}</p>
            <p>{movie.release_date}</p>
        </div>
    );
}
