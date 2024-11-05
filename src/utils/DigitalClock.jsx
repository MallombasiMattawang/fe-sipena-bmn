// src/components/DigitalClock.js
import React, { useState, useEffect } from "react";

//import service api
import Api from "../services/Api";

//import js cookie
import Cookies from "js-cookie";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState(0);

  //token from cookies
  const token = Cookies.get("token");

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    //fetch api
    Api.get("/api/admin/config-day", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setStatus(response.data.data.status);
    });
    return () => clearInterval(timerId);
  }, []);

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "January",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const day = time.getDate();
  const year = time.getFullYear();

  return (
    <div>
      <h5>
      <span className="badge bg-white text-black">HARI {status} | {dayName}, {day} {monthName}, {year} | {time.toLocaleTimeString()} </span>
      </h5>
    </div>
  );
};

export default DigitalClock;
