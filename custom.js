let year = 2026;
let month = 4; // 0 = Jan, 1 = Feb...

// 🌼 Define events by YYYY-MM-DD
const events = {
  "2026-05-03": "Community compost day – 2pm",
  "2026-05-06": "Weeding party – 9am",
  "2026-05-10": "Children's planting workshop – 11am",
  "2026-05-21": "Spring seed swap – 1pm",
  "2026-05-28": "Harvest & potluck – 5pm"
};

const calendar = document.getElementById("calendar");
const title = document.getElementById("calendar-title");

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function renderCalendar() {
  calendar.innerHTML = "";
  title.textContent = `${monthNames[month]} ${year}`;

  // Day names
  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
    const el = document.createElement("div");
    el.className = "day-name";
    el.textContent = d;
    calendar.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const el = document.createElement("div");
    el.className = "day";
    el.textContent = day;

    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    if (events[key]) {
      el.classList.add("event");
      el.setAttribute("data-event", events[key]);
    }

    calendar.appendChild(el);
  }
}

document.getElementById("prev").onclick = () => {
  month--;
  if (month < 0) { month = 11; year--; }
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  month++;
  if (month > 11) { month = 0; year++; }
  renderCalendar();
};

renderCalendar();
