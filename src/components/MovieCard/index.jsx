import React from "react";
import './index.css'

const MovieCard = (props) => {
  const { movie,updateBooking} = props;
  const {posterurl,title,genres}=movie
  const bookingHandler=()=>{
    updateBooking(movie)
  }
  return (
    <li>
      <button type='button' className="movie-card" onClick={bookingHandler}>
        <div>
          <img src={posterurl} className="poster-img" alt={title}/>
        </div>
        <div>
        <p className="title">{title}</p>
        <p className="gener">{genres[0]}</p>
        </div>
      </button>
    </li>
  );
};

export default MovieCard;
