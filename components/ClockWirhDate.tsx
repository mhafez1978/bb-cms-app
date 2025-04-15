"use client";

import React, { useEffect, useState } from "react";

const ClockWithDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // prevent SSR mismatch

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null; // ⛔ prevents rendering on server

  const formatDate = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="w-[600px] flex flex-col gap-4 text-sm text-black font-mono dark:text-white">
      <p className="text-base">Date: 📅 {formatDate(currentTime)}</p>
      <p className="text-base">Time: ⏰ {formatTime(currentTime)}</p>
    </div>
  );
};

export default ClockWithDate;
