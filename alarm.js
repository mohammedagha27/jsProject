let hourSelector = document.querySelector("select#hour-select");
let hoursOptions = ``;
let minuteSelector = document.querySelector("select#minute-select");
let minutesOptions = ``;
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let seconds = document.getElementById("seconds");
let ampm = document.getElementById("ampm");
let form = document.querySelector("form");
let audio = document.querySelector("audio");
//init the alarm selector by loop
for (let index = 1; index <= 60; index++) {
  minutesOptions += `<option value="${index}">${index}</option>`;
  if (index <= 12) {
    hoursOptions += `<option value="${index}">${index}</option>`;
  }
}
hourSelector.innerHTML = hoursOptions;
minuteSelector.innerHTML = minutesOptions;

//init renderClock Function show the current time
function renderClock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  var am = "am";
  if (h > 12) {
    h = h - 12;
    var am = "pm";
  }
  h < 10 ? (h = "0" + h) : (h = h);
  m < 10 ? (m = "0" + m) : (m = m);
  s < 10 ? (s = "0" + s) : (s = s);
  hour.innerHTML = h;
  minute.innerHTML = m;
  seconds.innerHTML = s;
  ampm.innerHTML = am;
}

//creat the check function to check the current alarms and play the sound
function check() {
  let hour = document.getElementById("hour").textContent;
  let minute = document.getElementById("minute").textContent;
  let ampm = document.getElementById("ampm").textContent;
  let currentTime = { hour: hour, minute: minute, period: ampm };
  document.querySelectorAll(".current-alarm").forEach((element) => {
    let c_h = element.querySelector(".c-hour").textContent;
    let c_m = element.querySelector(".c-minute").textContent;
    let c_p = element.querySelector(".c-ampm2").textContent;
    let newAlarmTime = { hour: c_h, minute: c_m, period: c_p };
    if (
      newAlarmTime.hour === currentTime.hour &&
      newAlarmTime.minute === currentTime.minute &&
      newAlarmTime.period === currentTime.period
    ) {
      audio.play();
      element.classList.add("active");
    }
  });
}
var interval = setInterval(renderClock, 1000);
var interval2 = setInterval(check, 1000);

//renderAlarm function to creat the new alarms tags
let Alarms = document.querySelector("body > section.alarm > div");
function renderAlarm(alarmTime) {
  let newAlarm = `
        <div class="current-alarm">
        <h2 class="c-hour">${alarmTime[0].hour}</h2>
        <h2 class="c-dot">:</h2>
        <h2 class="c-minute">${alarmTime[0].minute}</h2>
        <h2 class="c-dot">:</h2>
        <h2 class="c-ampm2">${alarmTime[0].period}</h2>
        </div>
    `;
  Alarms.innerHTML += newAlarm;
}

//add_alert function to add new alarms into alarm section
function add_alert(form) {
  let hs = form.querySelector("select#hour-select").value;
  let ms = form.querySelector("select#minute-select").value;
  let p_a = form.querySelector("select#am-pm-select").value;
  hs < 10 ? (hs = "0" + hs) : (hs = hs);
  ms < 10 ? (ms = "0" + ms) : (ms = ms);
  var new_alarm = [{ hour: hs, minute: ms, period: p_a }];
  renderAlarm(new_alarm);
  // setTimeout(() => {
  //   audio.play();
  // }, "2000");
}

//handle the submit of the form to creat a new alarm
form.addEventListener("submit", (event) => {
  event.preventDefault();
  add_alert(event.target);
});
