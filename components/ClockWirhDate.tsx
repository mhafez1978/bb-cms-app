"use client";

import React, { useEffect, useState } from "react";

const ClockWithDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  const formatDate = (date) => {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(); // or customize to 24hr/12hr
  };

  return (
    <div className="pl-5 py-4 flex flex-col gap-4 text-sm text-white font-mono">
      <p className="text-lg">📅 {formatDate(currentTime)}</p>
      <p className="text-lg">⏰ {formatTime(currentTime)}</p>
    </div>
  );
};

export default ClockWithDate;
