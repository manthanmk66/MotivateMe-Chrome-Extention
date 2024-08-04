import React, { useState, useEffect } from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

const AgeCalculator = () => {
  const [dob, setDob] = useState(localStorage.getItem("dob") || "");
  const [inputDob, setInputDob] = useState(localStorage.getItem("dob") || "");
  const [age, setAge] = useState({});

  const calculateAge = () => {
    if (dob) {
      const dobDate = new Date(dob);
      const now = new Date();
      setAge({
        years: differenceInYears(now, dobDate),
        months: differenceInMonths(now, dobDate) % 12,
        days: differenceInDays(now, dobDate) % 30,
        hours: differenceInHours(now, dobDate) % 24,
        minutes: differenceInMinutes(now, dobDate) % 60,
        seconds: differenceInSeconds(now, dobDate) % 60,
      });
    }
  };

  useEffect(() => {
    calculateAge();
    const interval = setInterval(calculateAge, 1000);
    return () => clearInterval(interval);
  }, [dob]);

  const handleDobChange = () => {
    setDob(inputDob);
    localStorage.setItem("dob", inputDob);
  };

  return (
    <div className="p-10">
      {!dob ? (
        <div>
          <input
            type="date"
            value={inputDob}
            onChange={(e) => setInputDob(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={handleDobChange}
            className="ml-2 p-2 bg-blue-500 text-white"
          >
            Set DOB
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max font-abc font-bold">
              <h1 className="text-xl sfont-bold mb-4">Your Age</h1>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-8xl">
                  <span>{age.years}</span>
                </span>
                years
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-8xl">
                  <span>{age.months}</span>
                </span>
                months
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-8xl">
                  <span>{age.days}</span>
                </span>
                days
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-8xl">
                  <span>{age.hours}</span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-8xl">
                  <span>{age.minutes}</span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-8xl">
                  <span>{age.seconds}</span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
