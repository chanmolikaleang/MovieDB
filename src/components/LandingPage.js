import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
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
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

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
            .then((data) => setMovies(data.results))
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    // Filter movies by search term
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                {/* Landing Page Text & Search */}
                <div className="landing-content">
                    <div className="title">
                        <h2>Welcome.</h2>
                        <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                    </div>

                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Trending / Search Results */}
            <div className="trending-wrapper">
                <h2 className="section-title">
                    {searchTerm ? `Search Results for "${searchTerm}"` : "🔥 Trending Movies"}
                </h2>

                <div className="movie-grid">
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
