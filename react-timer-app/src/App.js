import React, {useState, useEffect} from "react";
import useSound from "use-sound";



function clickEffect(e){
  console.log("click function works")
  e.target.style.backgroundColor = "#EE9322";
  setTimeout(()=>{e.target.style.backgroundColor = "#D83F31"},500)
}

function App() {
  const [timer, setTimer] = useState({
    hour:0,
    minute:0,
    second:0
  })
  const [isActive,setActive] = useState(false);

  const [endTimerSound] = useSound("./sound/endTimer.wav");
  const [resetTimerSound] = useSound("./sound/resetTimer.wav");
  const [startTimerSound]= useSound("./sound/startTimer.wav");


  function increaseTime(){
    setTimer((prev)=>{
      let {hour: newHour, minute:newMinute, second:newSecond} = prev
      newSecond += 1;
      if(newSecond > 59){
        newMinute += 1;
        newSecond = 0;
        if(newMinute > 59){
          newHour += 1;
          newHour = 0;
        }
      }
      console.log(newHour, newMinute, newSecond);
      return {hour:newHour, minute:newMinute, second:newSecond};
    })
  }

  let interval;
  useEffect(()=>{
    //console.log("useEffect set") 
    if(isActive){
      interval = setInterval(increaseTime,100)
      return ()=>{clearInterval(interval); console.log("interval deleted")}
    }else{clearInterval(interval); console.log("interval cleared")}
    return ()=>{clearInterval(interval); console.log("interval deleted")}
  },[isActive])

  return (
    <div className="app-class">
      <img src="timer.png" alt="timer image" />
      <p className="timer">{timer.hour}:{timer.minute}:{timer.second}</p>

    
      <button className="button"
      onClick={(e)=>{
        resetTimerSound();
        setTimer({hour:0, minute:0, second:0});
        setActive(false);
        if(interval){
          clearInterval(interval);
        }
      }}>Reset</button>
      <button className="button"
      onClick={(e)=>{
        setActive(prev=>!prev);
        console.log("btn clicked", isActive)
        isActive ? endTimerSound() : startTimerSound();
      }}>
        {isActive? "Stop": "Start"}
      </button>
    </div>
  );
}

export default App;
