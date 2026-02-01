function login() {

  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

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
