import React from "react";
import { Card } from "../card/card.component";
import "./card-list.styles.css";

export const CardList = props => {
  const { users } = props;
  return (
    <div className="card-list">
      {users.map(user => (
        <Card key={users.indexOf(user)} user={user}></Card>
      ))}
    </div>
  );
};
