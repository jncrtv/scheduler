import React from 'react';


import { useApplicationData } from 'hooks/useApplicationData';

import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay } from 'helpers/selectors';
import { getInterview } from 'helpers/selectors';
import { getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
   
  //Returns an array of appt objects for a given day
  const apptListForDay = getAppointmentsForDay(state, state.day);

  //Returns an array of interviewers objects for a given day
  const interListForDay = getInterviewersForDay(state, state.day);
  
  // console.log('INTERVIEWER LIST ', interListForDay);
  // console.log('apptListForDay -->', apptListForDay)
  // console.log('STATE -->', state)
  
  //Returns schedule for the day comprised of the individual appoinments
  const schedule = apptListForDay.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);

    return ( <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interListForDay}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />);
  });

  console.log('STATE from Application.js-->', state)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
