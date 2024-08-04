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
    <div className="p-10 flex flex-col items-center justify-center min-h-screen">
      {!dob ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              type="date"
              value={inputDob}
              onChange={(e) => setInputDob(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
          <button
            onClick={handleDobChange}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Set DOB
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max font-abc font-bold">
              <h1 className="text-xl font-mono font-bold mb-4">Your Age</h1>
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
