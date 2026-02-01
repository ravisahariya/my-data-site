let tapCount = 0;

const db = firebase.firestore();

const user = document.getElementById("user");
const pass = document.getElementById("pass");
const voice = document.getElementById("voice");

// secret icon
document.getElementById("secretIcon")?.addEventListener("click", () => {
  tapCount++;
  if (tapCount === 5) {
    alert("User: Admin\nPass: 778892");
  }
});

// LOGIN
function login() {
  if (user.value === "Admin" && pass.value === "778892") {
    voice.play();
    setTimeout(() => {
      window.location = "dashboard.html";
    }, 500);
  } else {
    alert("Wrong Login");
  }
}

// LOGOUT
function logout() {
  window.location = "index.html";
}

// HOURS CALC
function calcHours(i, o) {
  return (new Date("1970-01-01T" + o) - new Date("1970-01-01T" + i)) / 3600000;
}

// SAVE ENTRY
function saveData() {
  const hours = calcHours(in.value, out.value);

  db.collection("duty").add({
    date: date.value,
    in: in.value,
    out: out.value,
    shift: shift.value,
    post: post.value,
    double: double.checked,
    hours: hours
  }).then(loadData);
}

// LOAD DATA
function loadData() {
  const list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  db.collection("duty").get().then(snap => {
    snap.forEach(doc => {
      const d = doc.data();
      total += d.hours;

      const div = document.createElement("div");
      div.style.background = d.double ? "#ffb3b3" : "white";
      div.style.margin = "6px";
      div.style.padding = "8px";
      div.style.borderRadius = "10px";

      div.innerHTML = `
      ${d.date} | ${d.shift} | ${d.hours} hrs
      <button onclick="del('${doc.id}')">❌</button>
      `;

      list.appendChild(div);
    });

    document.getElementById("total").innerText = total;
  });
}

// DELETE
function del(id) {
  if (confirm("Delete entry?")) {
    db.collection("duty").doc(id).delete().then(loadData);
  }
}

loadData();
