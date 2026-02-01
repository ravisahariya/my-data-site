// LOGIN
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "Admin" && p === "778892") {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong Login ❌");
  }
}

// LOGOUT
function logout() {
  window.location.href = "index.html";
}

// ===== DUTY SYSTEM =====

function calcHours(i, o) {
  return (new Date("1970-01-01T" + o) - new Date("1970-01-01T" + i)) / 3600000;
}

function saveData() {
  const data = JSON.parse(localStorage.getItem("duty") || "[]");

  const hours = calcHours(in.value, out.value);

  data.push({
    date: date.value,
    shift: shift.value,
    hours: hours,
    double: double.checked
  });

  localStorage.setItem("duty", JSON.stringify(data));

  loadData();
}

function loadData() {
  const list = document.getElementById("list");
  if (!list) return;

  const data = JSON.parse(localStorage.getItem("duty") || "[]");

  list.innerHTML = "";

  let total = 0;

  data.forEach((d, i) => {
    total += d.hours;

    const div = document.createElement("div");

    div.style.background = d.double ? "#ffb3b3" : "white";
    div.style.margin = "6px";
    div.style.padding = "8px";
    div.style.borderRadius = "10px";

    div.innerHTML =
      `${d.date} | ${d.shift} | ${d.hours} hrs 
       <button onclick="del(${i})">❌</button>`;

    list.appendChild(div);
  });

  document.getElementById("total").innerText = total;
}

function del(i) {
  const data = JSON.parse(localStorage.getItem("duty") || "[]");
  data.splice(i, 1);
  localStorage.setItem("duty", JSON.stringify(data));
  loadData();
}

loadData();
