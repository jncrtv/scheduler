import React, { Fragment } from 'react';
import { useVisualMode } from 'hooks/useVisualMode'

import Header from 'components/Appointment/Header'
import Empty from 'components/Appointment/Empty'
import Show from 'components/Appointment/Show'
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appoinment(props) {
  
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //SAVE FUNCTION ---
  // saves interview object to pass to bookInterview function and on resolved promise transitions to show mode
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() =>  transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }
  
  //DESTROY FUNCTION ---
  // changes interview object to null and passes to cancelInterview function. Transitions mode back to empty
  function destroy() {
    const interview = null;

    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment">
      <Header time={props.time} interviewer={props.interview}></Header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
        )}
     
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}  
          onCancel={back} 
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}  
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back} 
          onSave={save}
        />
      )}
      
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
     
      {mode === CONFIRM && (
      <Confirm 
      message="Are you sure you want to delete?" 
      onCancel={back} 
      onConfirm={destroy} />
      )}

      {mode === ERROR_SAVE && (
        <Error 
        onClose={back}
        message="There was an error while saving" />
      )}

      {mode === ERROR_DELETE && (
        <Error 
        onClose={back}
        message="There was an error while deleting" />
      )}
     
    </article>
  );
} 
