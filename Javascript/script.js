const dobInput = document.getElementById('dob-input');
const dobButton = document.getElementById('dob-button');
const dobContainer = document.getElementById('dob-container');
const ageContainer = document.getElementById('age-container');
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const now = new Date();

  const years = now.getFullYear() - dobDate.getFullYear();
  const months = now.getMonth() - dobDate.getMonth() + (years * 12);
  const days = Math.floor((now - dobDate) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((now - dobDate) / (1000 * 60 * 60));
  const minutes = Math.floor((now - dobDate) / (1000 * 60));
  const seconds = Math.floor((now - dobDate) / 1000);

  return {
    years: Math.floor(months / 12),
    months: months % 12,
    days: days % 30,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

function updateAgeDisplay(age) {
  yearsSpan.textContent = age.years;
  monthsSpan.textContent = age.months;
  daysSpan.textContent = age.days;
  hoursSpan.textContent = age.hours;
  minutesSpan.textContent = age.minutes;
  secondsSpan.textContent = age.seconds;
}

function startAgeCalculation(dob) {
  setInterval(() => {
    const age = calculateAge(dob);
    updateAgeDisplay(age);
  }, 1000);
}

dobButton.addEventListener('click', () => {
  const dob = dobInput.value;
  if (dob) {
    localStorage.setItem('dob', dob);
    dobContainer.classList.add('hidden');
    ageContainer.classList.remove('hidden');
    startAgeCalculation(dob);
  }
});

const savedDob = localStorage.getItem('dob');
if (savedDob) {
  dobContainer.classList.add('hidden');
  ageContainer.classList.remove('hidden');
  startAgeCalculation(savedDob);
}
