function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "Admin" && p === "778892") {
    alert("Login Success ✅");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong Login ❌");
  }
}

function logout() {
  window.location.href = "index.html";
}
