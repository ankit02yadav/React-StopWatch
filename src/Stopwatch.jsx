import React, {useState,useEffect,useRef} from 'react';
import './Stopwatch.css'

function StopWatch(){

    const [isRunning,setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        return()=>{
            clearInterval(intervalIdRef.current);
        }

    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setIsRunning(false);
        setElapsedTime(0);
    }

    function formateTime(){
        let hour = Math.floor(elapsedTime/(1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime/(1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime/(1000) % 60);
        let millisec = Math.floor((elapsedTime % 1000) / 10);

        hour = String(hour).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        millisec = String(millisec).padStart(2,"0");

        return `${minutes}:${seconds}:${millisec}`
    }

    return(
        <div className="container">
            <div className="display">{formateTime()}</div>
            <div className="controls">
                <button onClick={start} className='start-btn' >Start</button>
                <button onClick={reset} className='reset-btn' >Reset</button>
                <button onClick={stop} className='stop-btn' >Stop</button>
            </div>
        </div>
    );
}
export default StopWatch