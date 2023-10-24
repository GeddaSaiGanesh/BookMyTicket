import React from "react";
import './index.css'
import movielist from './movies.json'
import MovieCard from '../MovieCard'

const MovieList = (props) => {
    const {updateBooking}=props
  return (
    <div className="home-container">
      <h2 className="heading-text">Recommended Movies</h2>
      <div>
        <ul className="movie-cards-container">
          {movielist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} updateBooking={updateBooking} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
