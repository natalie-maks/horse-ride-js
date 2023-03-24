const daysTag = document.querySelector(".days");
const currentDate = document.getElementById("current-date");
const prevNextIcon = document.querySelectorAll("#calendar header span");
const calendar = document.getElementById("calendar");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

let activeDay = date;

const calendarOutput = document.getElementById("calendar-output");

calendarOutput.addEventListener("click", () => {
  if (calendar.classList.contains("hidden")) {
    calendar.classList.remove("hidden");
    window.addEventListener("click", (e) => {
      if (!checkPath(e.composedPath())) {
        calendar.classList.add("hidden");
      }
    });
  } else {
    calendar.classList.add("hidden");
  }
});

function checkPath(path) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains("calendar-wrapper")) {
      return true;
    }
  }

  return false;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendarOutput() {
  calendarOutput.innerText = `${activeDay.getDate()} ${
    months[activeDay.getMonth()]
  } ${activeDay.getFullYear()}`;
}

renderCalendarOutput();

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isActive =
      i === activeDay.getDate() &&
      currMonth === activeDay.getMonth() &&
      currYear === activeDay.getFullYear()
        ? "active"
        : "";

    let isInactive = new Date(currYear, currMonth, i + 1) < new Date() ? "inactive" : "";
    liTag += `<li class="${isActive} ${isInactive}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  daysTag.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      activeDay = new Date(currYear, currMonth, li.innerText);
      renderCalendar();
      renderCalendarOutput();
    });
  });
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

const rides = document.getElementById("rides");
const rideType = document.getElementById("rides-type");

rides.addEventListener("change", (e) => {
  let ridesOptions = rides.querySelectorAll("option");
  const rideTypeOptions = rideType.querySelectorAll("option");

  let selectedRidesOption = Array.from(ridesOptions).find(
    (option) => option.innerText == rides.value
  );
  let selectedRideTypeOption = Array.from(rideTypeOptions).find(
    (option) => option.innerText == rideType.value
  );

  if (
    selectedRideTypeOption.dataset &&
    selectedRideTypeOption.dataset.type !== selectedRidesOption.dataset.type
  ) {
    rideType.value = "Choose option";
  }

  if (selectedRidesOption.dataset.type == "lesson") {
    Array.from(rideTypeOptions).forEach((option) => {
      option.removeAttribute("disabled");

      if (option.dataset.type == "ride") {
        option.setAttribute("disabled", "");
      }
    });
  } else {
    Array.from(rideTypeOptions).forEach((option) => {
      option.removeAttribute("disabled");

      if (option.dataset.type == "lesson") {
        option.setAttribute("disabled", "");
      }
    });
  }
});

const form = document.querySelector("form");
const successWindow = document.getElementById("success-window");
const rideErrorWindow = document.getElementById("ride-error-window");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (rides.value == "Choose option" || rideType.value == "Choose option") {
    rideErrorWindow.classList.remove("hidden");
    window.addEventListener("click", () => {
      rideErrorWindow.classList.add("hidden");
    });
  }

  if (rides.value !== "Choose option" && rideType.value !== "Choose option") {
    successWindow.classList.remove("hidden");
    window.addEventListener("click", () => {
      successWindow.classList.add("hidden");
    });
    form.reset();
  }
});

const cardNumber = document.getElementById("card-number");
const expirationDate = document.getElementById("expire-date");
const cvv = document.getElementById("cvv");
const phone = document.getElementById("phone");

var cardnumber_mask = new IMask(cardNumber, {
  mask: "0000{ }0000{ }0000{ }0000",
});

var phone_mask = new IMask(phone, {
  mask: "{+}Number",
  blocks: {
    Number: {
      mask: Number,
    },
  },
});

var securitycode_mask = new IMask(cvv, {
  mask: "000",
});

var expirationdate_mask = new IMask(expirationDate, {
  mask: "MM{ / }YY",
  blocks: {
    YY: {
      mask: "00",
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
});
