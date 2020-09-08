
//Returns an array of appoinmtment objects from appoinment index array passed on from each day
function getAppointmentsForDay(state, day) {
  
  const filteredDayObj = state.days.filter((d) => d.name === day);
    if (filteredDayObj.length) {
    const apptsForDay = filteredDayObj[0].appointments.map((appt) => {
      return state.appointments[appt];
    })
    return apptsForDay;
  }
  return filteredDayObj;
}

function getInterview(state, interview) {

    return ( interview && {
      ...interview, 
      interviewer : state.interviewers[interview.interviewer]
    })  
}

//Returns an array of Interviewer objects from interviewer index array passed on from each day
function getInterviewersForDay(state, day) {
  
  const filteredDayObj = state.days.filter((d) => d.name === day);
    if (filteredDayObj.length) {
    const intersForDay = filteredDayObj[0].interviewers.map((inter) => {
      return state.interviewers[inter];
    })
    return intersForDay;
  }
  return filteredDayObj;
}

export { getAppointmentsForDay };
export { getInterview };
export { getInterviewersForDay };
