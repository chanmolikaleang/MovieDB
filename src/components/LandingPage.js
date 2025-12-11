import React, { useState, useEffect } from "react";
import "../styles/LandingPage.css";
import MovieCard from "./MovieCard";

export default function LandingPage() {
    const slides = [
        "https://www.themoviedb.org/t/p/original/bjUWGw0Ao0qVWxagN3VCwBJHVo6.jpg",
        "https://www.themoviedb.org/t/p/original/6ELCZlTA5lGUops70hKdB83WJxH.jpg",
        "https://www.themoviedb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Fetch Trending Movies 
    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/trending/movie/week?api_key=5ae507e6a9c7f350a24caea5487fd327"
        )
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results); // results = array of movies
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    return (
        <section className="landing-section">

            {/* Background Slideshow */}
            <div className="slideshow-background">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? "active" : ""}`}
                        style={{ backgroundImage: `url(${slide})` }}
                    ></div>
                ))}
            </div>

            {/* Trending Movies Section */}
            <div className="trending-wrapper">
                <h2 className="section-title">🔥 Trending Movies</h2>

                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

        </section>
    );
}
