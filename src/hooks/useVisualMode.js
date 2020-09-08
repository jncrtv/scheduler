import { useState } from 'react';


function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  function transition(newMode, replace = false) {
  
    if (replace) {
      history[history.length - 1] = newMode;
    } else {
      history.push(newMode);
    }
    setMode(newMode);
  }
  
  function back(){
    if (history.length > 1) {
    
      history.pop(); 
      setMode(history[history.length - 1]);
   
    }
  }
  
  return { mode, transition, back } ;
};



export { useVisualMode };
