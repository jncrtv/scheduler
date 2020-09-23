import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'), 
      axios.get('/api/interviewers')
    ])
      .then(
        ([{data: days}, {data: appointments}, {data: interviewers}]) => {
        setState((prev) => ({ 
          ...prev,
          days,
          appointments,
          interviewers
        }));

      })
      .catch((error) => {
      })
    }, [])


  //books/edits interview and updates spots displayed
  function bookInterview(id, interview, isUpdate) {

    const getDay = (appointment_id) => {
      return state.days.filter( day => day.appointments.includes(appointment_id))[0]
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = getDay(id)
    
    const new_day = {...day, spots: (isUpdate) ? day.spots : day.spots - 1 }


    let new_days = state.days

    for (let i = 0; i < state.days.length; i ++){
      if (state.days[i].id === new_day.id){
        new_days.splice(i, 1, new_day )
      }
    }
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {
      setState({
        ...state,
        appointments,
        days: new_days 
      });
      return true;
      })
  }

  //cancels interview and updates spots displayed
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  

    const getDay = (appointment_id) => {
      return state.days.filter( day => day.appointments.includes(appointment_id))[0]
    }

    const day = getDay(id)
    console.log(`day: ${JSON.stringify(day)}`)
    const new_day = {
      ...day,
      spots: day.spots + 1
    }

    let new_days = state.days

    for (let i = 0; i < state.days.length; i ++){
      if (state.days[i].id === new_day.id){
        new_days.splice(i, 1, new_day )
      }
    }

    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      setState({
        ...state,
        appointments
      });
      return true;
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
 }  

 export { useApplicationData };