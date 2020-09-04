import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const dayList = props.days.map((item, index) => {
    return <DayListItem 
      key={index}
      name={item.name} 
      spots={item.spots} 
      selected={item.name === props.day}
      setDay={props.setDay}  
    />
  });



  return (
    <ul>
      {dayList}
    </ul>
)};
