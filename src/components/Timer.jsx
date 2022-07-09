import React, { useEffect, useState } from "react";

import "./timer.scss";

const Timer = () => {
  const [time, setTime] = useState({
    second: "00",
    minute: "00",
    counter: 180,
  });
  const [isActive, setIsActive] = useState(false);

  const getDetails = () => {
    let min = document.getElementById("minutes").value,
      sec = document.getElementById("seconds").value;

    if (min === "" && sec === "") {
      alert("Selected time cannot be blank");
    } else if (min >= 3 && sec >= 1) {
      alert("Maximum time is 3 mins");
    } else if (min < 3 && sec > 59) {
      alert("Inavlid time");
    } else {
      time.second = sec || "00";
      time.minute = min || "00";
      time.counter = Math.floor(parseInt(min) * 60 + parseInt(sec));
    }
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = time.counter % 60;
        const minuteCounter = Math.floor(time.counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setTime({
          second: computedSecond,
          minute: computedMinute,
          counter: time.counter - 1,
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, time.counter]);

  if (time.counter === -1) {
    stopTimer();
  }

  function stopTimer() {
    setIsActive(false);
    setTime({
      second: "00",
      minute: "00",
      counter: 180,
    });
  }

  return (
    <div className="container">
      <h1> REACT TIMER </h1>
      <div className="time">
        <span className="minute">{time.minute}</span>
        {parseInt(time.counter) % 2 === 0 ? (
          <span className="middle-w">:</span>
        ) : (
          <span className="middle-b">:</span>
        )}
        <span className="second">{time.second}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setIsActive(!isActive)} className="start">
          {isActive
            ? "Pause"
            : time.counter === 0 || time.counter !== 180
            ? "Continue"
            : "Start"}
        </button>
        <button onClick={stopTimer} className="reset">
          Reset
        </button>
      </div>
      <div className="userInput">
        <p>Please Select any time within 3 Minutes and Start</p>
        <div className="input">
          <label>Set Minutes: </label>
          <input type="number" min="0" max="3" id="minutes" />
          <label>Set Seconds: </label>
          <input type="number" min="0" max="60" id="seconds" />
        </div>
      </div>
      <button onClick={getDetails} className="confirm">
        Confirm
      </button>
    </div>
  );
};

export default Timer;
