import React, { useState } from "react";
import "./index.css";

const Seat = (props) => {
  const { seat, updateSeatList, updateListData, noOfTicket, list,ticketType } = props;
  const [isSelect, isSelected] = useState(false);

  const buttonHandler = () => {
    updateSeatList(seat.id);
    updateListData(seat.id);
    isSelected((old) => !old);
  };
  const ListHandler = () => {
    if (list.includes(seat.id)) {
      updateListData(seat.id);
      isSelected((old) => !old);
    }
  };

  return (
    <li>
      <div>
        <button
          className={isSelect ? "seat-selected" : "custom-btn"}
          type="button"
          onClick={
            seat.status !== "sold" &&seat.category===ticketType && list.length < noOfTicket
              ? buttonHandler
              : ListHandler
          }
        >
          <div
            className={seat.status === "sold" ? "seat-sold" : "seat-available"}
          >
            <p className="seat-number">{seat.row}</p>
          </div>
        </button>
      </div>
    </li>
  );
};

export default Seat;
