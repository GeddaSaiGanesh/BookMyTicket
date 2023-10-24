import React, { useState, useEffect } from "react";
import "./index.css";
import Seat from "../Seat";
import Button from "@mui/material/Button";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const BookingTickets = (props) => {
  const { movieDetails, toogleButtonHandler } = props;
  const { title } = movieDetails;
  const [seats, setSeats] = useState([]);
  const [list, setList] = useState([]);
  const [ticketType, setTicketType] = useState("Standard");
  const [noOfTicket, setNoOfTicket] = useState(1);
  const [loading, setLoading] = useState(true);

  const updateListData = (id) => {
    if (list.length < noOfTicket) {
      if (list.includes(id)) {
        const filterList = list.filter((num) => id !== num);
        setList(filterList);
      } else {
        setList((old) => [...old, id]);
      }
    } else {
      if (list.includes(id)) {
        const filterList = list.filter((num) => id !== num);
        setList(filterList);
      }
    }
  };

  const handleChangeTicket = (event) => {
    setTicketType(event.target.value);
  };

  const handleNoOfTickets = (event) => {
    const inputNumber = event.target.value;
    if (/^[+]?\d+([.]\d+)?$/.test(inputNumber)) {
      setNoOfTicket(inputNumber);
    }
  };

  const updateSeatList = (seatId) => {
    setSeats((prevSeats) => {
      return prevSeats.map((seat) =>
        seat.id === seatId
          ? {
              ...seat,
              status: seat.status === "available" ? "booked" : "available",
            }
          : seat
      );
    });
  };

  const menuButtonHandler = () => {
    toogleButtonHandler();
  };

  useEffect(() => {
    const fetchData=async()=>{
      try{
        const response = await axios.get("https://bookmyticket-production.up.railway.app/seats");
        setSeats(response.data);
        setLoading(false)
      }
      catch(error){
        console.error("Error fetching seat data:", error);
        setLoading(false)
      }
    };
    fetchData()
  }, []);

  const proceedHandler = () => {
    if (list.length === parseInt(noOfTicket)) {
      for (let seatId of list) {
        axios
          .put(
            `https://bookmyticket-production.up.railway.app/seats/${seatId}`,
            { status: "sold" }
          )
          .then((response) => {
            console.log(response.data.message);
            alert("booked Sucessfully..")
          })
          .catch((error) => {
            console.error("Error updating seat status:", error);
          });
      }
      
    } else {
      alert("please selct the desired seats");
    }
  };

  return (
    <div className="booking-container">
      <div className="movie-details">
        <div>
          <h4 className="movie-name">
            <span>Movie Name</span> : {title}
          </h4>
          <p className="hall-name">Asian Cine World, Visakhapatnam</p>
        </div>
        <div className="flex-container-row bg-white">
          <div>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Ticket Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ticketType}
                  label="Age"
                  onChange={handleChangeTicket}
                >
                  <MenuItem selected value={"Standard"}>
                    Standard
                  </MenuItem>
                  <MenuItem value={"Premium"}>Premium</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <Box sx={{ m: 1, maxWidth: 80 }}>
              <TextField
                id="outlined-basic"
                label="Qty"
                variant="outlined"
                value={noOfTicket}
                type="number"
                onChange={handleNoOfTickets}
                min="1"
                step="1"
              />
            </Box>
          </div>
        </div>
      </div>
      <div>
        {loading? (
          <Box sx={{ display: 'flex',justifyContent:'center' }}>
          <CircularProgress color="secondary"  />
        </Box>
    
        ) : (
          <ol className="seat-arrange">
            {seats.map((seat) => (
              <Seat
                key={seat.id}
                updateSeatList={updateSeatList}
                updateListData={updateListData}
                seat={seat}
                noOfTicket={noOfTicket}
                list={list}
                ticketType={ticketType}
              />
            ))}
          </ol>
        )}
      </div>
      <div>
        <div className="screen-container"></div>
        <p className="para-text">All eyes this way please</p>
      </div>
      <div className="flex-container-row">
        <div className="flex-container-row">
          <p className="para">A to E are Premium</p>
          <p className="para">F to H are Standard</p>
        </div>
        <div className="seat-available"></div>
        <p>Available</p>
        <div className="seat-sold"></div>
        <p>Sold</p>
        <div className="seat-selected"></div>
        <p>Selected</p>
      </div>
      <div className="button-container">
        <Button variant="contained" onClick={menuButtonHandler}>
          Menu
        </Button>

        <Button variant="contained" onClick={proceedHandler}>
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default BookingTickets;
