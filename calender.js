const monthEl = document.querySelector(".month-container");
const yearEl = document.getElementById("year-container");

const dayInput = document.getElementById("dayInput");
const enterbtn = document.getElementById("enterbtn");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const noOfMonths = 12;

let calendarObject = document.getElementById("calendar");

let currentMonth = new Date().getMonth();

let currentYear = new Date().getFullYear();
console.log(currentMonth);
console.log(currentYear);

let selectedMonth = currentMonth;
let selectedYear = currentYear;

console.log(selectedYear);

function createMonthOption() {
  const selectEl = document.createElement("select");
  selectEl.id = "month";
  for (let i = 0; i < 12; i++) {
    let optionEl = document.createElement("option");
    optionEl.value = i;
    optionEl.innerText = months[i];
    if (i === selectedMonth) {
      optionEl.setAttribute("selected", "selected");
    }
    selectEl.appendChild(optionEl);
  }

  selectEl.addEventListener("change", () => {
    selectedMonth = selectEl.value;
    clearCalendar();
    loadCalendar(selectedMonth, selectedYear);
    console.log(selectedMonth);
  });

  monthEl.appendChild(selectEl);
}

createMonthOption();

function createYear() {
  const selectEl = document.createElement("select");
  selectEl.id = "year";

  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    const optionEl = document.createElement("option");
    optionEl.value = i;
    optionEl.innerText = i;
    if (i === selectedYear) {
      optionEl.setAttribute("selected", "selected");
    }
    selectEl.appendChild(optionEl);
  }

  selectEl.addEventListener("change", function () {
    selectedYear = selectEl.value;
    clearCalendar();
    loadCalendar(selectedMonth, selectedYear);
    console.log("Selected Year: " + selectedYear);
  });

  yearEl.appendChild(selectEl);
}

createYear();

function toggleBackgroundColor(element) {
  const currentColor = element.style.backgroundColor;
  if (currentColor === "green") {
    element.style.backgroundColor = "white";
  } else {
    element.style.backgroundColor = "green";
  }
}

enterbtn.addEventListener("click", function () {
  const enteredDay = parseInt(dayInput.value);

  if (!isNaN(enteredDay) && enteredDay >= 1 && enteredDay <= 31) {
    const dateBoxes = document.querySelectorAll("td");
    for (const dateBox of dateBoxes) {
      const date = parseInt(dateBox.innerText);
      if (date === enteredDay) {
        toggleBackgroundColor(dateBox);
      }
    }
  }
});

function clearCalendar() {
  calendarObject.innerHTML = "";
}

function loadCalendar(month, year) {
  let firstDay = new Date(year, month, 1).getDay();
  let numberOfDays = 32 - new Date(year, month, 32).getDate();
  console.log(numberOfDays);
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let theadrow = document.createElement("tr");
  for (let wd = 0; wd <= 6; wd++) {
    let th = document.createElement("th");
    let thtext = document.createTextNode(days[wd]);
    th.append(thtext);
    theadrow.append(th);
  }
  thead.append(theadrow);
  table.append(thead);
  let tbody = document.createElement("tbody");
  let datedate = 1;
  for (let wks = 0; wks <= 5; wks++) {
    let tr = document.createElement("tr");
    for (let wds = 0; wds <= 6; wds++) {
      let td = document.createElement("td");
      if (datedate > numberOfDays) {
        continue;
      }
      if (wks == 0 && wds < firstDay) {
      } else {
        let tdtext = document.createTextNode(datedate);
        td.append(tdtext);
        datedate = datedate + 1;
      }
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.append(tbody);
  calendarObject.append(table);
}

loadCalendar(selectedMonth, selectedYear);

// loadCalendar(currentMonth, currentYear);
