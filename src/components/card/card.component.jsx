import React from "react";
import "./card.styles.css";

export const Card = props => {
  const { user } = props;
  // console.log("TCL: user", user);
  return (
    <div className="card-container">
      <img
        alt="user"
        src={`https://via.placeholder.com/180?text=${user.username}`}
      />
      <h1>{user.name}</h1>
    </div>
  );
};
