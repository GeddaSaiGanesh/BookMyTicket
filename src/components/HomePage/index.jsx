import React, { useState } from "react";
import "./index.css";
import MovieList from "../MoviesList";
import BookingTickets from "../BookingTickets";
import Footer from "../Footer/index";
import Header from "../Header/index";



const HomePage = () => {
  const [bookingPage, setBookingPage] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const toogleButtonHandler = () => {
    setBookingPage((old) => !old);
  };
  const updateBooking = (movie) => {
    setBookingPage((old) => !old);
    setMovieDetails(movie);
  };
  return (
    <div>
      {bookingPage ? (
        <BookingTickets
          movieDetails={movieDetails}
          toogleButtonHandler={toogleButtonHandler}
        />
      ) : (
        <>
        <Header/>
        <MovieList updateBooking={updateBooking} />
        <Footer/>
        </>
      )}
    </div>
  );
};

export default HomePage;
