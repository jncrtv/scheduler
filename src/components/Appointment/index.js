import React, { Fragment } from 'react';
import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'

import "components/Appointment/styles.scss"

export default function Appoinment(props) {
    
  const apptContent = props.interview ? <Show student={props.interview.student}></Show> : <Empty></Empty>;
  return (
    <article className="appointment">
      <Header time={props.time} interviewer={props.interview}></Header>
      {apptContent}
    </article>
  );
} 