// src/Countdown.js
import React, { useState, useEffect } from 'react';
import "./counter.css";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-08-09T14:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        detik: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="countdown-container">
      {/* <div className="">
        <a href="#">
          <img
            src="/images/logo-login.png"
            width="110"
            className="img-responsive"
          />
        </a>
        <br /><br /><br />
      </div> */}
      {/* <h1 className="countdown-title text-warning">Registrasi ditutup dalam: <br /></h1> */}
      <div className="timer text-warning">
        {timerComponents.length ? timerComponents : <span>Registrasi Ditutup!</span>}
      </div>
    </div>
  );
};

export default Countdown;
